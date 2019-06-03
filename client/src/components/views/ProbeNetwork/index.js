import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import gql from "graphql-tag.macro";
import { Query, withApollo } from "react-apollo";
import Measure from "react-measure";
import Tour from "helpers/tourHelper";
import SubscriptionHelper from "helpers/subscriptionHelper";

import "./style.scss";

function d2r(deg) {
  return (deg * Math.PI) / 180;
}

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "Once constructed, a probe network gives you access to a vast amount of information about what surrounds your ship. It augments the information provided by your sensor grid. Creating a probe network is done on the Probe Construction screen. Building probes with a 'Probe Network Package' prepares everything the probe needs to be added to the probe network."
  },
  {
    selector: ".network-grid",
    content:
      "This grid shows you the current status of your probe network. Each of the nodes around the edge is where a probe will be located. A circle inside of the node indicates a probe that has been launched to that location. If all of the probes in the network have been launched, you will see the datagrams sent from the probes to your ship."
  },
  {
    selector: ".processedData",
    content:
      "Your probe network will collect and summarize important information here. If you ever see new information in this box, be sure to read it to your captain."
  }
];

const datagramImage = require(`./datagram.svg`);

const PROBES_SUB = gql`
  subscription ProbesSub($simulatorId: ID!) {
    probesUpdate(simulatorId: $simulatorId) {
      id
      processedData
      probes(network: true) {
        id
        name
        launched
      }
    }
  }
`;

class ProbeNetwork extends Component {
  state = {};
  render() {
    return (
      <Query
        query={PROBE_NETWORK_QUERY}
        variables={{
          simulatorId: this.props.simulator.id
        }}
      >
        {({ loading, data, subscribeToMore }) => {
          if (loading || !data.probes) return null;
          const probes = data.probes[0];
          const { processedData, probes: network } = probes;
          return (
            <Container
              fluid
              className="probe-network"
              style={{ height: "100%" }}
            >
              <SubscriptionHelper
                subscribe={() =>
                  subscribeToMore({
                    document: PROBES_SUB,
                    variables: {
                      simulatorId: this.props.simulator.id
                    },
                    updateQuery: (previousResult, { subscriptionData }) => {
                      return Object.assign({}, previousResult, {
                        probes: subscriptionData.data.probesUpdate
                      });
                    }
                  })
                }
              />
              <Row style={{ height: "100%" }}>
                <Col
                  sm={{ size: 6, offset: 1 }}
                  style={{ height: "100%" }}
                  className="network-grid"
                >
                  <Measure
                    bounds
                    onResize={contentRect => {
                      this.setState({ dimensions: contentRect.bounds });
                    }}
                  >
                    {({ measureRef }) => (
                      <div ref={measureRef}>
                        {this.state.dimensions && (
                          <Grid
                            dimensions={this.state.dimensions}
                            network={network}
                          />
                        )}
                      </div>
                    )}
                  </Measure>
                </Col>
                <Col sm={{ size: 3, offset: 2 }}>
                  <h3>Processed Data</h3>
                  <Card className="processedData">
                    <CardBody>
                      <pre>{processedData}</pre>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Tour steps={trainingSteps} client={this.props.clientObj} />
            </Container>
          );
        }}
      </Query>
    );
  }
}

const PROBE_NETWORK_QUERY = gql`
  query Probes($simulatorId: ID!) {
    probes(simulatorId: $simulatorId) {
      id
      processedData
      probes(network: true) {
        id
        name
        launched
      }
    }
  }
`;

export default withApollo(ProbeNetwork);

class Grid extends Component {
  constructor(props) {
    super(props);
    this.looping = true;
    this.state = {
      datagrams: Array(props.lines || 8)
        .fill(0)
        .map((_, i, array) => ({
          angle: d2r((i / array.length) * 360),
          x: 0,
          y: 0
        }))
    };
  }
  componentWillUnmount() {
    this.looping = false;
    clearTimeout(this.frame);
  }
  loop = () => {
    if (!this.looping) return;
    const totalFrames = 200;
    const speedyFrames = 100;
    const datagrams = this.state.datagrams.map(({ angle, x, y }, i) => {
      const speedX =
        Math.cos(angle) / (i % 2 === 1 ? totalFrames : speedyFrames);
      const speedY =
        Math.sin(angle) / (i % 2 === 1 ? totalFrames : speedyFrames);
      let distX = x + speedX;
      let distY = y + speedY;
      if (
        Math.abs(distX) > Math.abs(Math.cos(angle)) ||
        Math.abs(distY) > Math.abs(Math.sin(angle))
      ) {
        distX = 0;
        distY = 0;
      }
      return {
        angle,
        x: distX,
        y: distY
      };
    });
    // Calculate the speed of the contact by it's angle
    this.setState({
      datagrams
    });
    this.frame = setTimeout(this.loop, 30);
  };
  componentDidMount() {
    this.looping = true;
    this.loop();
  }
  render() {
    const { dimensions, rings = 3, lines = 8, network } = this.props;
    const connected =
      network.filter((p, i, a) => a.findIndex(e => e.name === p.name) === i)
        .length >= 8;
    const { datagrams } = this.state;
    const radius = dimensions.width;
    return (
      <div className={`grid`} style={{ width: radius, height: radius }}>
        {Array(lines)
          .fill(0)
          .map((_, i, array) => (
            <div
              key={`line-${i}`}
              className="line"
              style={{
                transform: `rotate(${((i + 0.5) / array.length) * 360}deg)`
              }}
            />
          ))}
        {Array(rings)
          .fill(0)
          .map((_, i, array) => (
            <div
              key={`ring-${i}`}
              className="ring"
              style={{
                width: `${((i + 1) / array.length) * 100}%`,
                height: `${((i + 1) / array.length) * 100}%`,
                backgroundColor: i < 2 ? "black" : "transparent"
              }}
            />
          ))}
        {Array(lines)
          .fill(0)
          .map((_, i, array) => (
            <div
              key={`box-${i}`}
              className="box"
              style={{
                transform: `translate(${(Math.cos(
                  d2r((i / array.length) * 360)
                ) *
                  radius) /
                  2}px, ${(Math.sin(d2r((i / array.length) * 360)) * radius) /
                  2}px)`
              }}
            />
          ))}
        {network.map(({ name, launched }) => {
          if (launched) {
            const i = parseInt(name, 10);
            if (i) {
              return (
                <div
                  key={`probe-${i}`}
                  className="probe"
                  style={{
                    transform: `translate(${(Math.cos(
                      d2r(((i - 3) / lines) * 360)
                    ) *
                      radius) /
                      2}px, ${(Math.sin(d2r(((i - 3) / lines) * 360)) *
                      radius) /
                      2}px)`
                  }}
                />
              );
            }
          }
          return null;
        })}
        {connected &&
          datagrams.map((d, i) => (
            <img
              alt="datagram"
              key={`datagram-${i}`}
              className="datagram"
              src={datagramImage}
              style={{
                transform: `translate(
              ${(d.x * radius) / 2}px,
              ${(d.y * radius) / 2}px)`
              }}
            />
          ))}
        <img
          alt="star"
          src={require("./star.svg")}
          style={{ position: "absolute", width: "40px" }}
        />
      </div>
    );
  }
}
