import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import Measure from 'react-measure';

import './style.scss';

function degreeToRadian(deg) {
  return deg * Math.PI / 180;
}

function distance(coord2, coord1) {
  const { x: x1, y: y1 } = coord1;
  let { x: x2, y: y2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
}

const datagramImage = require(`./datagram.svg`);

const DOCKING_SUB = gql`
  subscription SimulatorSub($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        clamps
        ramps
        airlock
      }
    }
  }
`;

class Docking extends Component {
  subscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: DOCKING_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ simulators: subscriptionData.data.simulatorsUpdate })
            .toJS();
        }
      });
    }
  }
  render() {
    if (this.props.data.loading) return null;
    return (
      <Container fluid className="docking" style={{ height: '100%' }}>
        <Row style={{ height: '100%' }}>
          <Col sm={9} style={{ height: '100%' }}>
            <Measure>
              {dimensions =>
                <div style={{ width: '100%', height: '100%' }}>
                  <Grid dimensions={dimensions} />
                </div>}
            </Measure>
          </Col>
        </Row>
      </Container>
    );
  }
}

const DOCKING_QUERY = gql`
  query Simulator($simulatorId: String) {
    simulators(id: $simulatorId) {
      id
      ship {
        clamps
        ramps
        airlock
      }
    }
  }
`;

export default graphql(DOCKING_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Docking));

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datagrams: Array(props.lines || 12).fill(0).map((_, i, array) => ({
        angle: degreeToRadian((i + 0.5) / array.length * 360),
        x: 0,
        y: 0
      }))
    };
  }
  loop = () => {
    const totalFrames = 100;
    const datagrams = this.state.datagrams.map(({ angle, x, y }) => {
      const speedX = Math.cos(angle) / totalFrames;
      const speedY = Math.sin(angle) / totalFrames;
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
    this.loop();
  }
  render() {
    const { dimensions, rings = 3, lines = 12 } = this.props;
    const { datagrams } = this.state;
    return (
      <div
        className={`grid`}
        style={{ width: dimensions.height, height: dimensions.height }}>
        {Array(rings).fill(0).map((_, i, array) =>
          <div
            key={`ring-${i}`}
            className="ring"
            style={{
              width: `${(i + 1) / array.length * 100}%`,
              height: `${(i + 1) / array.length * 100}%`
            }}
          />
        )}
        {Array(lines).fill(0).map((_, i, array) =>
          <div
            key={`line-${i}`}
            className="line"
            style={{
              transform: `rotate(${(i + 0.5) / array.length * 360}deg)`
            }}
          />
        )}
        {Array(lines).fill(0).map((_, i, array) =>
          <div
            key={`box-${i}`}
            className="box"
            style={{
              transform: `translate(${Math.cos(
                degreeToRadian((i + 0.5) / array.length * 360)
              ) *
                dimensions.height /
                2}px, ${Math.sin(
                degreeToRadian((i + 0.5) / array.length * 360)
              ) *
                dimensions.height /
                2}px)`
            }}
          />
        )}
        {datagrams.map((d, i) =>
          <img
            key={`datagram-${i}`}
            className="datagram"
            src={datagramImage}
            style={{
              transform: `translate(
              ${d.x * dimensions.height / 2}px,
              ${d.y * dimensions.height / 2}px)`
            }}
          />
        )}
      </div>
    );
  }
}
