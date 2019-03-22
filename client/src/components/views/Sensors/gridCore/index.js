import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import { Row, Col, Container, Button, Input, ButtonGroup } from "reactstrap";
import Grid from "../GridDom";
import ExtraControls from "./extraControls";
import ContactsList from "./contactsList";
import MovementCore from "./movementCore";
import ContactSelect from "./contactSelect";
import SpeedAsker from "./speedAsker";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { subscribe } from "helpers/pubsub";

import "./gridCore.scss";

const SENSORS_OFFSET = 45;
function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

const fragment = gql`
  fragment SensorsData on Sensors {
    id
    type
    autoTarget
    autoThrusters
    interference
    movement {
      x
      y
      z
    }
    segments {
      ring
      line
      state
    }
    armyContacts {
      id
      name
      size
      icon
      picture
      color
      infrared
      cloaked
      destroyed
      locked
      disabled
      hostile
    }
  }
`;
const GRID_QUERY = gql`
  query GetSensors($simulatorId: ID) {
    sensors(simulatorId: $simulatorId, domain: "external") {
      ...SensorsData
    }
  }
  ${fragment}
`;
const SENSOR_SUB = gql`
  subscription SensorsChanged($id: ID) {
    sensorsUpdate(simulatorId: $id, domain: "external") {
      ...SensorsData
    }
  }
  ${fragment}
`;

class GridCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movingContact: {},
      contextContact: null,
      speed: 0.6,
      askForSpeed:
        localStorage.getItem("thorium-core-sensors-askforspeed") === "yes"
          ? true
          : false,
      currentControl: "contacts",
      selectedContacts: []
    };
  }
  componentDidMount() {
    if (!this.state.dimensions && ReactDOM.findDOMNode(this)) {
      const domNode = ReactDOM.findDOMNode(this).querySelector("#threeSensors");
      if (domNode) {
        const { width, height, left, top } = domNode.getBoundingClientRect();
        this.setState({
          dimensions: {
            width: width - SENSORS_OFFSET,
            height: height - SENSORS_OFFSET,
            left: left + SENSORS_OFFSET,
            top: top + SENSORS_OFFSET
          }
        });
      }
    }
    this.targetingSubscription = subscribe("setTargetingRange", range => {
      this.setState({ targetingRange: range });
    });
  }
  componentWillUnmount() {
    this.targetingSubscription && this.targetingSubscription();
  }
  componentDidUpdate() {
    if (!ReactDOM.findDOMNode(this)) return;
    const domNode = ReactDOM.findDOMNode(this).querySelector("#threeSensors");
    if (!domNode) return;
    if (
      !this.state.dimensions ||
      this.state.dimensions.width !==
        domNode.getBoundingClientRect().width - SENSORS_OFFSET
    ) {
      const { width, height, left, top } = domNode.getBoundingClientRect();
      this.setState({
        dimensions: {
          width: width - SENSORS_OFFSET,
          height: height - SENSORS_OFFSET,
          left: left + SENSORS_OFFSET,
          top: top + SENSORS_OFFSET
        }
      });
    }
  }
  dragStart = movingContact => {
    const self = this;
    this.setState({
      movingContact: { type: "contact", ...movingContact, location: null }
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
    const width = Math.min(dimWidth, dimHeight);
    const destination = {
      x:
        (evt.clientX - dimensions.left + SENSORS_OFFSET / 2 - width / 2) /
          (dimensions.width / 2) -
        0.08,
      y:
        (evt.clientY - dimensions.top + SENSORS_OFFSET / 2 - width / 2) /
          (dimensions.height / 2) -
        0.08,
      z: 0
    };
    this.setState({
      movingContact: Object.assign({}, movingContact, {
        location: destination,
        destination
      })
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
      type,
      size,
      name,
      color,
      picture,
      cloaked,
      infrared,
      locked,
      disabled,
      hostile
    } = movingContact;
    if (!location) return;
    const distance = distance3d({ x: 0, y: 0, z: 0 }, location);
    // Max Distance should be the distance + the width of the contact
    const maxDistance = type === "planet" ? 1 + size / 2 : 1.1;
    if (distance > maxDistance) {
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
        type,
        size: parseFloat(size),
        name,
        color,
        picture,
        cloaked,
        location,
        infrared,
        locked,
        disabled,
        hostile,
        destination: location
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
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
  mouseDown = (e, contact) => {
    const { selectedContacts = [] } = this.state;
    this.downMouseTime = Date.now();
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
    const width = e.target.getBoundingClientRect().width;
    const height = e.target.getBoundingClientRect().height;
    this.setState({
      draggingContacts: selectedContacts.concat(contact),
      iconWidth:
        contact.type === "planet" || contact.type === "border" ? 0 : width,
      iconHeight:
        contact.type === "planet" || contact.type === "border" ? 0 : height
    });
  };
  mouseUp = evt => {
    const { draggingContacts, askForSpeed, speed } = this.state;
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    const t = Date.now() - this.downMouseTime;
    if (this.downMouseTime && t < 200) {
      this.setState({
        selectedContacts: draggingContacts
      });
    }

    if (askForSpeed) {
      this.setState({
        speedAsking: {
          x: evt.clientX,
          y: evt.clientY
        }
      });
    } else {
      this.triggerUpdate(speed);
    }
  };
  mouseMove = e => {
    const { dimensions, draggingContacts } = this.state;
    if (!draggingContacts || draggingContacts.length === 0) return;
    const { width: dimWidth, height: dimHeight } = dimensions;
    const width = Math.min(dimWidth, dimHeight);
    const destinationDiff = {
      x: (e.movementX / width) * 2,
      y: (e.movementY / width) * 2,
      z: 0
    };
    this.setState(state => ({
      draggingContacts: state.draggingContacts.map(contact => ({
        ...contact,
        destination: {
          x: contact.destination.x + destinationDiff.x,
          y: contact.destination.y + destinationDiff.y
        }
      }))
    }));
  };
  triggerUpdate = speed => {
    speed = Number(speed);

    const sensors = this.props.data.sensors[0];
    const { client } = this.props;
    let { draggingContacts, dimensions } = this.state;

    // Delete any dragging contacts that are out of bounds
    const contacts = (draggingContacts || [])
      .map(c => {
        const contactEl = ReactDOM.findDOMNode(this).querySelector(
          `#contact-${c.id}`
        );
        if (contactEl) {
          const {
            top,
            bottom,
            left,
            right
          } = contactEl.getBoundingClientRect();
          if (
            bottom < dimensions.top - SENSORS_OFFSET ||
            top > dimensions.top + dimensions.height ||
            left > dimensions.left + dimensions.width ||
            right < dimensions.left - SENSORS_OFFSET
          ) {
            return { ...c, delete: true };
          }
        } else {
          const distance = distance3d({ x: 0, y: 0, z: 0 }, c.destination);
          const maxDistance = c.type === "planet" ? 1 + c.size / 2 : 1.1;
          return { ...c, delete: distance > maxDistance };
        }
        return c;
      })
      .filter(c => {
        if (c.delete) {
          client.mutate({
            mutation: gql`
              mutation DeleteContact($id: ID!, $contact: SensorContactInput!) {
                removeSensorContact(id: $id, contact: $contact)
              }
            `,
            variables: { id: sensors.id, contact: { id: c.id } }
          });
          return false;
        }
        return true;
      })
      // Now that the ones that need to be deleted are gone,
      // Update the rest
      .map(c => {
        const { x = 0, y = 0, z = 0 } = c.destination;
        return {
          id: c.id,
          speed,
          destination: { x, y, z }
        };
      });
    const mutation = gql`
      mutation MoveSensorContact($id: ID!, $contacts: [SensorContactInput]!) {
        updateSensorContacts(id: $id, contacts: $contacts)
      }
    `;
    const variables = {
      id: sensors.id,
      contacts
    };
    client
      .mutate({
        mutation,
        variables
      })
      .then(() => {
        this.setState({
          draggingContacts: [],
          iconWidth: null,
          iconHeight: null,
          speedAsking: null
        });
      });
  };
  _freezeContacts() {}
  _changeSpeed(e) {
    this.setState({
      speed: e.target.value
    });
  }
  render() {
    if (this.props.data.loading) return <p>Loading...</p>;
    if (!this.props.data.sensors || !this.props.data.sensors[0])
      return <p>No Sensor Grid</p>;
    const sensors = this.props.data.sensors[0];
    const {
      speed,
      movingContact,
      askForSpeed,
      speedAsking,
      currentControl,
      selectedContacts,
      draggingContacts,
      targetingRange
    } = this.state;
    const speeds = [
      { value: "1000", label: "Instant" },
      { value: "5", label: "Warp" },
      { value: "1", label: "Very Fast" },
      { value: "0.6", label: "Fast" },
      { value: "0.4", label: "Moderate" },
      { value: "0.2", label: "Slow" },
      { value: "0.05", label: "Very Slow" }
    ];
    const extraContacts = []
      .concat(movingContact && movingContact.location ? movingContact : null)
      .concat(draggingContacts)
      .filter(Boolean);
    return (
      <Container className="sensorGridCore" fluid style={{ height: "100%" }}>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SENSOR_SUB,
              variables: {
                id: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  sensors: subscriptionData.data.sensorsUpdate
                });
              }
            })
          }
        />
        <Row style={{ height: "100%" }}>
          <Col
            sm={4}
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column"
            }}
          >
            <small>Speed</small>
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
            {selectedContacts.length > 0 ? (
              <ContactSelect
                id={sensors.id}
                clearSelection={() => this.setState({ selectedContacts: [] })}
                contacts={selectedContacts}
                client={this.props.client}
              />
            ) : (
              <Fragment>
                <ButtonGroup>
                  <Button
                    active={currentControl === "contacts"}
                    size="sm"
                    color="success"
                    onClick={() =>
                      this.setState({ currentControl: "contacts" })
                    }
                  >
                    Icons
                  </Button>
                  <Button
                    active={currentControl === "extras"}
                    size="sm"
                    color="info"
                    onClick={() => this.setState({ currentControl: "extras" })}
                  >
                    Extras
                  </Button>
                  <Button
                    active={currentControl === "movement"}
                    size="sm"
                    color="primary"
                    onClick={() =>
                      this.setState({ currentControl: "movement" })
                    }
                  >
                    Move
                  </Button>
                </ButtonGroup>
                {currentControl === "extras" && (
                  <ExtraControls
                    sensors={sensors}
                    askForSpeed={askForSpeed}
                    updateAskForSpeed={e => this.setState({ askForSpeed: e })}
                    client={this.props.client}
                    speed={speed}
                    dragStart={this.dragStart}
                  />
                )}
                {currentControl === "contacts" && (
                  <ContactsList
                    sensors={sensors}
                    dragStart={this.dragStart}
                    client={this.props.client}
                  />
                )}
                {currentControl === "movement" && (
                  <MovementCore sensors={sensors} client={this.props.client} />
                )}
              </Fragment>
            )}
          </Col>
          <Col sm={8}>
            <div id="threeSensors" className="array">
              <Grid
                core
                dimensions={this.state.dimensions}
                offset={SENSORS_OFFSET}
                sensor={sensors.id}
                includeTypes={[
                  "contact",
                  "planet",
                  "border",
                  "ping",
                  "projectile"
                ]}
                movement={sensors.movement}
                speeds={speeds}
                askForSpeed={askForSpeed}
                extraContacts={extraContacts}
                segments={sensors.segments}
                selectedContacts={selectedContacts.map(c => c.id)}
                updateSelectedContacts={contacts =>
                  this.setState({ selectedContacts: contacts })
                }
                range={
                  targetingRange
                    ? {
                        size: targetingRange,
                        color: "rgba(255,0,0,0.5)"
                      }
                    : null
                }
                mouseDown={this.mouseDown}
              />
              {speedAsking && (
                <SpeedAsker
                  sensorsId={sensors.id}
                  speeds={speeds}
                  draggingContacts={draggingContacts}
                  triggerUpdate={this.triggerUpdate}
                  speedAsking={speedAsking}
                  cancelMove={() =>
                    this.setState({
                      draggingContacts: [],
                      selectedContacts: [],
                      speedAsking: null
                    })
                  }
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default graphql(GRID_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(GridCore));
