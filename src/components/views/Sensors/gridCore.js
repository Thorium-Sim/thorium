import React, { Component } from "react";
import ReactDOM from "react-dom";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import FontAwesome from "react-fontawesome";
import ContactContextMenu from "./contactContextMenu";
import { Row, Col, Container, Button, Input } from "reactstrap";
import Grid from "./GridDom";
import Nudge from "./nudge";
import { Asset } from "../../../helpers/assets";
import "./gridCore.css";

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

const ADD_ARMY_CONTACT = gql`
  mutation(
    $id: ID!
    $name: String
    $size: Float
    $icon: String
    $picture: String
    $infrared: Boolean
    $cloaked: Boolean
  ) {
    createSensorArmyContact(
      id: $id
      contact: {
        name: $name
        size: $size
        icon: $icon
        picture: $picture
        infrared: $infrared
        cloaked: $cloaked
      }
    )
  }
`;

const REMOVE_ARMY_CONTACT = gql`
  mutation($id: ID!, $contact: ID!) {
    removeSensorArmyContact(id: $id, contact: $contact)
  }
`;

const SENSOR_SUB = gql`
  subscription SensorsChanged($id: ID) {
    sensorsUpdate(simulatorId: $id, domain: "external") {
      id
      type
      armyContacts {
        id
        name
        size
        icon
        iconUrl
        picture
        pictureUrl
        color
        infrared
        cloaked
        destroyed
      }
    }
  }
`;

const PING_SUB = gql`
  subscription SensorPing($id: ID) {
    sensorsPing(sensorId: $id)
  }
`;

class GridCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movingContact: {},
      selectedContact: null,
      removeContacts: false,
      contextContact: null,
      speed: 0.6,
      askForSpeed:
        localStorage.getItem("thorium-core-sensors-askforspeed") === "yes"
          ? true
          : false
    };
    this.sensorsSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: SENSOR_SUB,
        variables: {
          id: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            sensors: subscriptionData.data.sensorsUpdate
          });
        }
      });
    }
    if (!this.pingSub && !nextProps.data.loading) {
      this.pingSub = nextProps.data.subscribeToMore({
        document: PING_SUB,
        variables: { id: nextProps.data.sensors[0].id },
        updateQuery: (previousResult, { subscriptionData }) => {
          if (
            previousResult.sensors.find(
              s => s.id === subscriptionData.data.sensorsPing
            )
          ) {
            this.ping();
          }
        }
      });
    }
    if (!nextProps.data.loading) {
      const nextSensors = nextProps.data.sensors[0];
      if (this.props.data.loading) {
        //First time load
        this.setState({
          pingTime: Date.now() - nextSensors.timeSincePing,
          ping: false
        });
      }
    }
  }
  componentWillUnmount() {
    this.sensorsSubscription && this.sensorsSubscription();
    this.pingSub && this.pingSub();
  }
  componentDidMount() {
    if (!this.state.dimensions) {
      const domNode = ReactDOM.findDOMNode(this).querySelector("#threeSensors");
      if (domNode) {
        this.setState({
          dimensions: domNode.getBoundingClientRect()
        });
      }
    }
  }
  componentDidUpdate() {
    const domNode = ReactDOM.findDOMNode(this).querySelector("#threeSensors");
    if (
      !this.state.dimensions ||
      this.state.dimensions.width !== domNode.getBoundingClientRect().width
    ) {
      this.setState({
        dimensions: domNode.getBoundingClientRect()
      });
    }
  }
  ping = () => {
    // Reset the state
    this.setState(
      {
        ping: false
      },
      () => {
        this.setState({
          ping: true,
          pingTime: Date.now()
        });
        setTimeout(() => {
          this.setState({ ping: false });
        }, 1000 * 5);
      }
    );
  };
  dragStart = movingContact => {
    const self = this;
    this.setState({
      movingContact: Object.assign({}, movingContact, {
        location: null
      })
    });
    document.addEventListener("mousemove", this.moveMouse);
    document.addEventListener("mouseup", _mouseUp);
    function _mouseUp() {
      document.removeEventListener("mousemove", self.moveMouse);
      document.removeEventListener("mouseup", _mouseUp);
      self.dragStop();
    }
  };
  moveMouse = evt => {
    const { dimensions } = this.state;
    const { movingContact = {} } = this.state;
    const { width: dimWidth, height: dimHeight } = dimensions;
    const padding = 15;
    const width = Math.min(dimWidth, dimHeight) - padding;
    const destination = {
      x:
        (evt.clientX - dimensions.left - padding / 2 - width / 2) / (width / 2),
      y: (evt.clientY - dimensions.top - padding / 2 - width / 2) / (width / 2),
      z: 0
    };
    this.setState({
      movingContact: Object.assign({}, movingContact, { location: destination })
    });
  };
  dragStop = () => {
    const { movingContact } = this.state;
    this.setState({
      movingContact: null
    });
    const {
      location,
      icon,
      size,
      name,
      color,
      picture,
      cloaked,
      infrared
    } = movingContact;
    if (!location) return;
    const distance = distance3d({ x: 0, y: 0, z: 0 }, location);
    if (distance > 1.08) {
      return;
    }
    const mutation = gql`
      mutation CreateContact($id: ID!, $contact: SensorContactInput!) {
        createSensorContact(id: $id, contact: $contact)
      }
    `;
    const variables = {
      id: this.props.data.sensors[0].id,
      contact: {
        icon,
        size,
        name,
        color,
        picture,
        cloaked,
        location,
        infrared,
        destination: location
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  _addArmyContact() {
    const { armyContacts, id } = this.props.data.sensors[0] || {
      armyContacts: []
    };
    const templateContact = armyContacts[armyContacts.length - 1] || {
      name: "Contact",
      size: 1,
      icon: "/Sensor Contacts/Icons/N",
      picture: "/Sensor Contacts/Pictures/N",
      infrared: false,
      cloaked: false
    };
    const defaultContact = {
      name: templateContact.name,
      size: templateContact.size,
      icon: templateContact.icon,
      picture: templateContact.picture,
      infrared: templateContact.infrared,
      cloaked: templateContact.cloaked
    };
    //Run the mutation to create the army contact
    this.props.client.mutate({
      mutation: ADD_ARMY_CONTACT,
      variables: Object.assign(
        {
          id: id
        },
        defaultContact
      )
    });
  }
  _updateArmyContact(contact, key, value) {
    const { id } = this.props.data.sensors[0];
    const newContact = {
      id: contact.id,
      name: contact.name,
      size: contact.size,
      icon: contact.icon,
      picture: contact.picture,
      speed: contact.speed,
      infrared: contact.infrared,
      cloaked: contact.cloaked
    };
    newContact[key] = value;
    this.props.client.mutate({
      mutation: gql`
        mutation($id: ID!, $contact: SensorContactInput!) {
          updateSensorArmyContact(id: $id, contact: $contact)
        }
      `,
      variables: {
        id,
        contact: newContact
      }
    });
  }
  _updateSensorContact(contact, key, value) {
    const { id } = this.props.data.sensors[0];
    const newContact = {
      id: contact.id,
      name: contact.name,
      size: contact.size,
      icon: contact.icon,
      picture: contact.picture,
      speed: contact.speed,
      infrared: contact.infrared,
      cloaked: contact.cloaked
    };
    newContact[key] = value;
    this.props.client.mutate({
      mutation: gql`
        mutation($id: ID!, $contact: SensorContactInput!) {
          updateSensorContact(id: $id, contact: $contact)
        }
      `,
      variables: {
        id,
        contact: newContact
      }
    });
  }
  _removeArmyContact(contact) {
    const { id } = this.props.data.sensors[0] || { armyContacts: [] };
    this.props.client.mutate({
      mutation: REMOVE_ARMY_CONTACT,
      variables: Object.assign({
        id: id,
        contact: contact.id
      })
    });
  }
  _contextMenu(contact, e) {
    e.preventDefault();
    const { top: outerTop, left: outerLeft } = document
      .getElementsByClassName("sensorGridCore")[0]
      .getBoundingClientRect();
    const { top, left } = e.target.getBoundingClientRect();
    const obj = {
      left: left - outerLeft + 20,
      top: top - outerTop,
      contact: contact
    };
    this.setState({
      contextContact: obj
    });
  }
  _closeContext() {
    this.setState({
      contextContact: null,
      selectedContact: null
    });
  }
  _clearContacts() {
    const mutation = gql`
      mutation DeleteContact($id: ID!) {
        removeAllSensorContacts(id: $id)
      }
    `;
    const { id } = this.props.data.sensors[0];
    const variables = {
      id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _stopContacts() {
    const mutation = gql`
      mutation StopContacts($id: ID!) {
        stopAllSensorContacts(id: $id)
      }
    `;
    const { id } = this.props.data.sensors[0];
    const variables = {
      id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _freezeContacts() {}
  _changeSpeed(e) {
    this.setState({
      speed: e.target.value
    });
  }
  _setSelectedContact(selectedContact) {
    this.setState({
      selectedContact
    });
  }
  render() {
    if (this.props.data.loading) return <p>Loading...</p>;
    if (!this.props.data.sensors[0]) return <p>No Sensor Grid</p>;
    const sensors = this.props.data.sensors[0];
    const {
      speed,
      selectedContact,
      movingContact,
      removeContacts,
      contextContact,
      askForSpeed
    } = this.state;
    const speeds = [
      { value: "1000", label: "Instant" },
      { value: "5", label: "Warp" },
      { value: "2", label: "Very Fast" },
      { value: "1", label: "Fast" },
      { value: "0.6", label: "Moderate" },
      { value: "0.4", label: "Slow" },
      { value: "0.1", label: "Very Slow" }
    ];
    return (
      <Container className="sensorGridCore" fluid style={{ height: "100%" }}>
        <Row style={{ height: "100%" }}>
          <Col sm={3}>
            <Input
              type="select"
              name="select"
              onChange={this._changeSpeed.bind(this)}
              defaultValue={speed}
            >
              {speeds.map(s => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
              <option disabled>─────────</option>
              <option disabled>Timed</option>
            </Input>
            <Button
              size="sm"
              color="danger"
              block
              onClick={this._clearContacts.bind(this)}
            >
              Clear
            </Button>
            <Button
              size="sm"
              color="warning"
              block
              onClick={this._stopContacts.bind(this)}
            >
              Stop
            </Button>
            <Button
              size="sm"
              color="info"
              disabled
              block
              onClick={this._freezeContacts.bind(this)}
            >
              Freeze
            </Button>
            <label>
              Ask for speed{" "}
              <input
                type="checkbox"
                checked={this.state.askForSpeed}
                onClick={evt => {
                  this.setState({ askForSpeed: evt.target.checked });
                  localStorage.setItem(
                    "thorium-core-sensors-askforspeed",
                    evt.target.checked ? "yes" : "no"
                  );
                }}
              />
            </label>
            <Nudge
              sensor={sensors.id}
              client={this.props.client}
              speed={speed}
            />
          </Col>
          <Col sm={6} style={{ height: "100%" }}>
            <div
              id="threeSensors"
              className="array"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
            >
              <Grid
                mouseover={this.props.hoverContact}
                core
                dimensions={this.state.dimensions}
                sensor={sensors.id}
                moveSpeed={speed}
                speeds={speeds}
                askForSpeed={askForSpeed}
                setSelectedContact={this._setSelectedContact.bind(this)}
                selectedContact={selectedContact}
                armyContacts={sensors.armyContacts}
                movingContact={movingContact}
              />
            </div>
          </Col>
          <Col sm={3} className="contacts-container">
            <p>Contacts:</p>
            <div className="contact-scroll">
              {sensors.armyContacts.map(contact => {
                return (
                  <Col key={contact.id} className={"flex-container"} sm={12}>
                    <Asset asset={contact.icon}>
                      {({ src }) => (
                        <img
                          alt="contact"
                          onMouseDown={() => this.dragStart(contact)}
                          onContextMenu={this._contextMenu.bind(this, contact)}
                          draggable="false"
                          role="presentation"
                          className="armyContact"
                          src={src}
                        />
                      )}
                    </Asset>
                    <label
                      onContextMenu={this._contextMenu.bind(this, contact)}
                    >
                      {contact.name}
                    </label>
                    {removeContacts && (
                      <FontAwesome
                        name="ban"
                        className="text-danger pull-right clickable"
                        onClick={this._removeArmyContact.bind(this, contact)}
                      />
                    )}
                  </Col>
                );
              })}
            </div>
            <Button
              size="sm"
              color="success"
              onClick={this._addArmyContact.bind(this)}
            >
              Add Contact
            </Button>
            <label>
              <input
                type="checkbox"
                onChange={e => {
                  this.setState({ removeContacts: e.target.checked });
                }}
              />{" "}
              Remove
            </label>
            {contextContact && (
              <ContactContextMenu
                closeMenu={this._closeContext.bind(this)}
                updateArmyContact={this._updateArmyContact.bind(this)}
                contact={contextContact.contact}
                x={contextContact.left}
                y={0}
              />
            )}
            {selectedContact && (
              <ContactContextMenu
                closeMenu={this._closeContext.bind(this)}
                updateArmyContact={this._updateSensorContact.bind(this)}
                contact={selectedContact}
                x={0}
                y={0}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const GRID_QUERY = gql`
  query GetSensors($simulatorId: ID) {
    sensors(simulatorId: $simulatorId, domain: "external") {
      id
      type
      armyContacts {
        id
        name
        size
        icon
        iconUrl
        picture
        pictureUrl
        color
        infrared
        cloaked
        destroyed
      }
    }
  }
`;

export default graphql(GRID_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(GridCore));
