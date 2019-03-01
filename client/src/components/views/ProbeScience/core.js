import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag.macro";
import { Container, Row, Col, Button } from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Grid from "../Sensors/GridDom/grid";
// import SpeedAsker from "../Sensors/gridCore/speedAsker";
import "./style.scss";

const iconSrc = require("./burst.svg");
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

const fragments = {
  contactFragment: gql`
    fragment ProbeScienceCoreData on SensorContact {
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
  `,
  probesFragment: gql`
    fragment ProbeScienceCoreData on Probes {
      id
      scienceTypes {
        id
        name
        type
        description
        equipment
      }
      probes {
        id
        type
        name
        launched
        equipment {
          id
          name
          count
        }
      }
    }
  `
};

const PROBES_SUB = gql`
  subscription ProbesUpdate($simulatorId: ID!) {
    probesUpdate(simulatorId: $simulatorId) {
      ...ProbeScienceCoreData
    }
  }
  ${fragments.probesFragment}
`;

const QUERY = gql`
  query Particles($simulatorId: ID!) {
    sensorContacts(simulatorId: $simulatorId, type: "burst") {
      ...ProbeScienceCoreData
    }
    sensors(simulatorId: $simulatorId, domain: "external") {
      id
    }
    probes(simulatorId: $simulatorId) {
      ...ProbeScienceCoreData
    }
  }
  ${fragments.probesFragment}
  ${fragments.contactFragment}
`;
const CONTACTS_SUB = gql`
  subscription SensorContactsChanged($simulatorId: ID) {
    sensorContactUpdate(simulatorId: $simulatorId, type: "burst") {
      ...ProbeScienceCoreData
    }
  }
  ${fragments.contactFragment}
`;

class BurstIcon extends Component {
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
        type: "burst",
        particle: this.props.name,
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
    const {
      loc: { x, y }
    } = this.state;
    return (
      <div
        onMouseDown={this.onMouseDown}
        ref={this.ref}
        style={{
          zIndex: 1000,
          transform: `translate(${x}px, ${y}px)`,
          width: 16,
          height: 16,
          backgroundImage: `url('${iconSrc}')`,
          backgroundSize: "contain"
        }}
      />
    );
  }
}

const BurstIconData = withApollo(BurstIcon);

const BurstLine = props => {
  const { name } = props;
  return (
    <div style={{ display: "flex" }}>
      <p style={{ flex: 1 }}>{name}</p>
      <BurstIconData {...props} />
    </div>
  );
};
class ProbeScienceCore extends Component {
  state = {};
  componentDidMount() {
    setTimeout(() => {
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
        removeAllSensorContacts(id: $id, type: ["burst"])
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
    const { probes } = this.props;
    const burstTypes = probes.scienceTypes.map(t => t.name);
    const num = Math.round(Math.random() * 30) + 20;
    const contacts = Array(num)
      .fill(0)
      .map(() => {
        const location = randomOnPlane(1);
        return {
          type: "burst",
          particle: randomFromList(burstTypes),
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
    const { contacts, sensors, probes } = this.props;
    const { dimensions, draggingContacts } = this.state;
    const extraContacts = [].concat(draggingContacts).filter(Boolean);
    return (
      <Container className="scienceProbes-core">
        <Row>
          <Col sm={4}>
            <div>
              <Button block color="secondary" size="sm" onClick={this.clear}>
                Clear
              </Button>
              <Button block color="warning" size="sm" onClick={this.random}>
                Random
              </Button>
              {probes.scienceTypes
                .filter(i => i.type === "detector")
                .map(i => (
                  <BurstLine
                    key={`line-${i.id}`}
                    {...i}
                    dimensions={dimensions}
                    sensors={sensors}
                  />
                ))}
            </div>
          </Col>
          <Col sm={8}>
            <div id="threeSensors" className="array">
              <Grid
                contacts={contacts}
                particles
                core
                includeTypes={["burst", "ping"]}
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

const ProbeScienceCoreData = withApollo(props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { sensorContacts, sensors, probes } = data;
      if (loading || !sensorContacts) return null;
      if (!probes) return "No Probes System";
      if (!sensors) return "No Sensors System";
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
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: PROBES_SUB,
                variables: { simulatorId: props.simulator.id },
                updateQuery: (previousResult, { subscriptionData }) => {
                  return Object.assign({}, previousResult, {
                    probes: subscriptionData.data.probesUpdate
                  });
                }
              })
            }
          />
          <ProbeScienceCore
            {...props}
            contacts={sensorContacts}
            sensors={sensors[0]}
            probes={probes[0]}
          />
        </SubscriptionHelper>
      );
    }}
  </Query>
));

export default ProbeScienceCoreData;
