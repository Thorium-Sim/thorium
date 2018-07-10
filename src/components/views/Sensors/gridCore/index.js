import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Row, Col, Container, Button, Input, ButtonGroup } from "reactstrap";
import Grid from "../GridDom";
import ExtraControls from "./extraControls";
import ContactsList from "./contactsList";
import MovementCore from "./movementCore";
import ContactSelect from "./contactSelect";
import SubscriptionHelper from "../../../../helpers/subscriptionHelper";
import "./gridCore.scss";

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

const SENSOR_SUB = gql`
  subscription SensorsChanged($id: ID) {
    sensorsUpdate(simulatorId: $id, domain: "external") {
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
        segment
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
      }
    }
  }
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
        this.setState({
          dimensions: domNode.getBoundingClientRect()
        });
      }
    }
  }
  componentDidUpdate() {
    if (!ReactDOM.findDOMNode(this)) return;
    const domNode = ReactDOM.findDOMNode(this).querySelector("#threeSensors");
    if (!domNode) return;
    if (
      !this.state.dimensions ||
      this.state.dimensions.width !== domNode.getBoundingClientRect().width
    ) {
      this.setState({
        dimensions: domNode.getBoundingClientRect()
      });
    }
  }
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
        (evt.clientX - dimensions.left - padding / 2 - width / 2) /
          (width / 2) -
        0.08,
      y:
        (evt.clientY - dimensions.top - padding / 2 - width / 2) / (width / 2) -
        0.08,
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
      type,
      size,
      name,
      color,
      picture,
      cloaked,
      infrared,
      locked
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
        size,
        name,
        color,
        picture,
        cloaked,
        location,
        infrared,
        locked,
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
  _freezeContacts() {}
  _changeSpeed(e) {
    this.setState({
      speed: e.target.value
    });
  }
  render() {
    if (this.props.data.loading) return <p>Loading...</p>;
    if (!this.props.data.sensors[0]) return <p>No Sensor Grid</p>;
    const sensors = this.props.data.sensors[0];
    const {
      speed,
      movingContact,
      askForSpeed,
      currentControl,
      selectedContacts
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
          <Col sm={4}>
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
          <Col sm={7} style={{ height: "calc(100% - 50px)" }}>
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
                movement={sensors.movement}
                moveSpeed={speed}
                speeds={speeds}
                askForSpeed={askForSpeed}
                armyContacts={sensors.armyContacts}
                movingContact={movingContact}
                segments={sensors.segments}
                selectedContacts={selectedContacts.map(c => c.id)}
                updateSelectedContacts={contacts =>
                  this.setState({ selectedContacts: contacts })
                }
              />
            </div>
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
      autoTarget
      autoThrusters
      interference
      movement {
        x
        y
        z
      }
      segments {
        segment
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
      }
    }
  }
`;

export default graphql(GRID_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(GridCore));
