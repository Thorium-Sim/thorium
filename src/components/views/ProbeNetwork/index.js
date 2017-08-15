import React, { Component } from "react";
import { Container, Row, Col, Card, CardBlock } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Immutable from "immutable";
import Measure from "react-measure";

import "./style.scss";

function d2r(deg) {
  return deg * Math.PI / 180;
}

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
  subscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: PROBES_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ probes: subscriptionData.data.probesUpdate })
            .toJS();
        }
      });
    }
  }
  render() {
    if (this.props.data.loading) return null;
    const probes = this.props.data.probes[0];
    const { processedData, probes: network } = probes;
    return (
      <Container className="probe-network" style={{ height: "100%" }}>
        <Row style={{ height: "100%" }}>
          <Col sm={8} style={{ height: "100%" }}>
            <Measure>
              {dimensions =>
                <div>
                  <Grid dimensions={dimensions} network={network} />
                </div>}
            </Measure>
          </Col>
          <Col sm={{ size: 3, offset: 1 }}>
            <h3>Processed Data</h3>
            <Card className="processedData">
              <CardBlock>
                <pre>
                  {processedData}
                </pre>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </Container>
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

export default graphql(PROBE_NETWORK_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(ProbeNetwork));

class Grid extends Component {
  constructor(props) {
    super(props);
    this.looping = true;
    this.state = {
      datagrams: Array(props.lines || 8).fill(0).map((_, i, array) => ({
        angle: d2r(i / array.length * 360),
        x: 0,
        y: 0
      }))
    };
  }
  componentWillUnmount() {
    this.looping = false;
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
    setTimeout(this.loop, 30);
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
        {Array(lines).fill(0).map((_, i, array) =>
          <div
            key={`line-${i}`}
            className="line"
            style={{
              transform: `rotate(${(i + 0.5) / array.length * 360}deg)`
            }}
          />
        )}
        {Array(rings).fill(0).map((_, i, array) =>
          <div
            key={`ring-${i}`}
            className="ring"
            style={{
              width: `${(i + 1) / array.length * 100}%`,
              height: `${(i + 1) / array.length * 100}%`,
              backgroundColor: i < 2 ? "black" : "transparent"
            }}
          />
        )}
        {Array(lines).fill(0).map((_, i, array) =>
          <div
            key={`box-${i}`}
            className="box"
            style={{
              transform: `translate(${Math.cos(d2r(i / array.length * 360)) *
                radius /
                2}px, ${Math.sin(d2r(i / array.length * 360)) * radius / 2}px)`
            }}
          />
        )}
        {network.map(({ name, launched }) => {
          if (launched) {
            const i = parseInt(name, 10);
            if (i) {
              return (
                <div
                  key={`probe-${i}`}
                  className="probe"
                  style={{
                    transform: `translate(${Math.cos(
                      d2r((i - 3) / lines * 360)
                    ) *
                      radius /
                      2}px, ${Math.sin(d2r((i - 3) / lines * 360)) *
                      radius /
                      2}px)`
                  }}
                />
              );
            }
          }
          return null;
        })}
        {connected &&
          datagrams.map((d, i) =>
            <img
              key={`datagram-${i}`}
              className="datagram"
              src={datagramImage}
              style={{
                transform: `translate(
              ${d.x * radius / 2}px,
              ${d.y * radius / 2}px)`
              }}
            />
          )}
        <img
          src={require("./star.svg")}
          style={{ position: "absolute", width: "40px" }}
        />
      </div>
    );
  }
}
