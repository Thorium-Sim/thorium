import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag.macro";
import { Container, Row, Col, Button } from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Grid from "../Sensors/GridDom/grid";
// import SpeedAsker from "../Sensors/gridCore/speedAsker";
import { particleIcons, particleTypes } from "./particleConstants";
import "./style.scss";

function randomFromList(list) {
  if (!list) return;
  const length = list.length;
  const index = Math.floor(Math.random() * length);
  return list[index];
}

const SENSORS_OFFSET = 45;
function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

const fragment = gql`
  fragment ParticleDetectorCoreData on SensorContact {
    id
    location {
      x
      y
      z
    }
    destination {
      x
      y
      z
    }
    position {
      x
      y
      z
    }
    icon
    type
    destroyed
    startTime
    endTime
    speed
    particle
  }
`;

const QUERY = gql`
  query Particles($simulatorId: ID!) {
    sensorContacts(simulatorId: $simulatorId, type: "particle") {
      ...ParticleDetectorCoreData
    }
    sensors(simulatorId: $simulatorId, domain: "external") {
      id
    }
  }
  ${fragment}
`;
const CONTACTS_SUB = gql`
  subscription SensorContactsChanged($simulatorId: ID) {
    sensorContactUpdate(simulatorId: $simulatorId, type: "particle") {
      ...ParticleDetectorCoreData
    }
  }
  ${fragment}
`;

class ParticleIcon extends Component {
  state = { loc: { x: 0, y: 0 } };
  ref = React.createRef();
  onMouseDown = () => {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
  };
  onMouseMove = e => {
    this.setState(state => ({
      loc: { x: state.loc.x + e.movementX, y: state.loc.y + e.movementY }
    }));
  };
  onMouseUp = () => {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
    const {
      dimensions: { left, top, width, height }
    } = this.props;
    const iconDims = this.ref.current.getBoundingClientRect();
    const location = {
      x: ((iconDims.left - left - width / 2) / width) * 2,
      y: ((iconDims.top - top - height / 2) / height) * 2,
      z: 0
    };
    const mutation = gql`
      mutation CreateContact($id: ID!, $contact: SensorContactInput!) {
        createSensorContact(id: $id, contact: $contact)
      }
    `;
    const variables = {
      id: this.props.sensors.id,
      contact: {
        icon: this.props.icon,
        type: "particle",
        particle: this.props.type,
        location,
        destination: location
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      loc: { x: 0, y: 0 }
    });
  };
  render() {
    const { icon, type } = this.props;
    const {
      loc: { x, y }
    } = this.state;
    const iconSrc = require(`./icons/${icon}.svg`);
    return (
      <div
        onMouseDown={this.onMouseDown}
        ref={this.ref}
        style={{
          zIndex: 1000,
          transform: `translate(${x}px, ${y}px)`,
          width: 16,
          height: 16,
          backgroundColor: particleTypes[type],
          maskImage: `url('${iconSrc}')`,
          WebkitMaskImage: `url('${iconSrc}')`
        }}
      />
    );
  }
}

const ParticleIconData = withApollo(ParticleIcon);

class ParticleLine extends Component {
  state = { type: "Dilithium" };
  render() {
    const { icon } = this.props;
    const { type } = this.state;
    return (
      <div style={{ display: "flex" }}>
        <select
          value={type}
          onChange={e => this.setState({ type: e.target.value })}
        >
          {Object.keys(particleTypes).map(p => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <ParticleIconData icon={icon} type={type} {...this.props} />
      </div>
    );
  }
}
class ParticleDetectorCore extends Component {
  state = {};
  mounted = false;
  componentDidMount() {
    this.mounted = true;
    setTimeout(() => {
      if (this.mounted === false) return;
      let dimensions = false;
      while (!dimensions) {
        const el = ReactDOM.findDOMNode(this);
        if (el) {
          const el2 = el.querySelector("#threeSensors #sensorGrid");
          if (el2) {
            dimensions = el2.getBoundingClientRect();
          }
        }
      }
      this.setState({ dimensions });
    }, 500);
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  mouseDown = (e, contact) => {
    this.downMouseTime = Date.now();
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
    const width = e.target.getBoundingClientRect().width;
    const height = e.target.getBoundingClientRect().height;
    this.setState({
      draggingContacts: [contact],
      iconWidth:
        contact.type === "planet" || contact.type === "border" ? 0 : width,
      iconHeight:
        contact.type === "planet" || contact.type === "border" ? 0 : height
    });
  };
  mouseUp = evt => {
    const { draggingContacts, askForSpeed, speed = 1 } = this.state;
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
    const sensors = this.props.sensors;
    const { client } = this.props;
    const { draggingContacts, dimensions } = this.state;

    // Delete any dragging contacts that are out of bounds
    const contacts = draggingContacts
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
          draggingContacts: null,
          iconWidth: null,
          iconHeight: null,
          speedAsking: null
        });
      });
  };
  clear = () => {
    const mutation = gql`
      mutation DeleteContact($id: ID!) {
        removeAllSensorContacts(id: $id, type: ["particle"])
      }
    `;
    const { id } = this.props.sensors;
    const variables = {
      id
    };
    return this.props.client.mutate({
      mutation,
      variables
    });
  };
  random = async () => {
    function randomOnPlane(radius) {
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * Math.random() * radius;
      const y = Math.sin(angle) * Math.random() * radius;
      return { x, y, z: 0 };
    }
    await this.clear();
    const num = Math.round(Math.random() * 30) + 20;
    const contacts = Array(num)
      .fill(0)
      .map(() => {
        const location = randomOnPlane(1);
        return {
          icon: randomFromList(particleIcons),
          type: "particle",
          particle: randomFromList(Object.keys(particleTypes)),
          location,
          destination: location
        };
      });

    const mutation = gql`
      mutation CreateContacts($id: ID!, $contacts: [SensorContactInput!]!) {
        createSensorContacts(id: $id, contacts: $contacts)
      }
    `;
    const variables = {
      id: this.props.sensors.id,
      contacts
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const { contacts, sensors } = this.props;
    const { dimensions, draggingContacts } = this.state;
    const extraContacts = [].concat(draggingContacts).filter(Boolean);
    return (
      <Container className="particleDetector-core">
        <Row>
          <Col sm={4}>
            <Button block color="secondary" size="sm" onClick={this.clear}>
              Clear
            </Button>
            <Button block color="warning" size="sm" onClick={this.random}>
              Random
            </Button>
            {particleIcons.map(i => (
              <ParticleLine
                key={`line-${i}`}
                icon={i}
                dimensions={dimensions}
                sensors={sensors}
              />
            ))}
          </Col>
          <Col sm={8}>
            <div id="threeSensors" className="array">
              <Grid
                contacts={contacts}
                particles
                core
                extraContacts={extraContacts}
                mouseDown={this.mouseDown}
              />
              {/* {speedAsking && (
                <SpeedAsker
                  sensorsId={sensors.id}
                  speeds={speeds}
                  draggingContacts={draggingContacts}
                  triggerUpdate={this.triggerUpdate}
                  speedAsking={speedAsking}
                  cancelMove={() =>
                    this.setState({
                      draggingContacts: null,
                      selectedContacts: [],
                      speedAsking: null
                    })
                  }
                />
              )} */}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const ParticleDetectorData = withApollo(props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { sensorContacts, sensors } = data;
      if (loading || !sensorContacts) return null;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: CONTACTS_SUB,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  sensorContacts: subscriptionData.data.sensorContactUpdate
                });
              }
            })
          }
        >
          <ParticleDetectorCore
            {...props}
            contacts={sensorContacts}
            sensors={sensors[0]}
          />
        </SubscriptionHelper>
      );
    }}
  </Query>
));

export default ParticleDetectorData;
