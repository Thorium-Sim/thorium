import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Card } from "reactstrap";
import { Asset } from "../../../helpers/assets";

import Slider from "./slider";
import ThrusterRotor from "./thrusterRotor";
import "./style.css";

const sliderColors = [
  {
    backgroundColor: "rgba(128,0,0,0.9)",
    borderColor: "rgba(255,0,0,0.3)"
  },
  {
    backgroundColor: "rgba(0,128,0,0.9)",
    borderColor: "rgba(0,255,0,0.3)"
  },
  {
    backgroundColor: "rgba(128,0,128,0.9)",
    borderColor: "rgba(255,0,255,0.3)"
  },
  {
    backgroundColor: "rgba(0,0,128,0.9)",
    borderColor: "rgba(0,0,255,0.3)"
  }
];
const THRUSTER_SUB = gql`
  subscription ThrusterSub($simulatorId: ID) {
    rotationChange(simulatorId: $simulatorId) {
      id
      power {
        power
        powerLevels
      }
      damage {
        damaged
      }
      rotation {
        yaw
        pitch
        roll
      }
      manualThrusters
      rotationRequired {
        yaw
        pitch
        roll
      }
    }
  }
`;

class AdvancedNavigation extends Component {
  state = { velocity: 0, acceleration: 0 };
  subscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.thrusterSub = nextProps.data.subscribeToMore({
        document: THRUSTER_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            thrusters: [subscriptionData.rotationChange]
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.thrusterSub && this.thrusterSub();
  }
  changeThrusters = (which, rot) => {
    const thrusters = this.props.data.thrusters[0];
    const { yaw, pitch, roll } = thrusters.rotation;
    const mutation = gql`
      mutation SetThrusterRotation($id: ID!, $rotation: RotationInput) {
        rotationSet(id: $id, rotation: $rotation)
      }
    `;
    const variables = {
      id: thrusters.id,
      rotation: {
        yaw,
        pitch,
        roll,
        [which]: rot
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  handleSlider = (engine, value, numbers) => {
    let speed = 1250 * 2 * (value - 0.5);
    this.setState({
      acceleration: speed
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.thrusters) return null;
    const thrusters = this.props.data.thrusters[0];
    const engines = this.props.data.engines;
    if (!thrusters) return null;
    const { yaw, pitch, roll } = thrusters.rotation;
    const {
      yaw: yawr,
      pitch: pitchr,
      roll: rollr
    } = thrusters.rotationRequired;
    return (
      <Container fluid className="card-advanced-navigation">
        <Row>
          <Col sm={8}>
            <Row>
              <Col sm={4}>
                <Card className="text-danger crystal-display">1/4 Impulse</Card>
              </Col>
              <Col sm={5}>
                <Card className="text-success crystal-display">
                  {this.state.velocity.toLocaleString()} km/s
                </Card>
              </Col>
              <Col sm={3}>
                <label>Velocity</label>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <Card className="text-danger crystal-display">Off Course</Card>
              </Col>
              <Col sm={5}>
                <Card className="crystal-display">
                  <span className="text-success">{yawr}˚</span>
                  <span className="text-info">{pitchr}˚</span>
                  <span className="text-warning">{rollr}˚</span>
                </Card>
              </Col>
              <Col sm={3}>
                <label>Course Bearing</label>
              </Col>
            </Row>
            <Row>
              <Col sm={{ size: 10, offset: 1 }} className="ship-image">
                <Asset
                  asset="/Ship Views/Left"
                  simulatorId={this.props.simulator.id}
                >
                  {({ src }) => (
                    <img
                      alt="ship"
                      style={{ width: "100%" }}
                      src={src}
                      draggable="false"
                    />
                  )}
                </Asset>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <ThrusterRotor
                  label="Yaw"
                  text="success"
                  rotation={yaw}
                  onChange={rot => this.changeThrusters("yaw", rot)}
                />
              </Col>
              <Col sm={4}>
                <ThrusterRotor
                  label="Pitch"
                  text="info"
                  rotation={pitch}
                  onChange={rot => this.changeThrusters("pitch", rot)}
                />
              </Col>
              <Col sm={4}>
                <ThrusterRotor
                  label="Roll"
                  text="warning"
                  rotation={roll}
                  onChange={rot => this.changeThrusters("roll", rot)}
                />
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <Row style={{ height: "100%" }}>
              {engines.map((e, i) => (
                <Col key={e.id} style={{ height: "80%" }}>
                  <p>
                    {e.name} {e.useAcceleration ? "Acceleration" : "Velocity"}
                  </p>
                  <Slider
                    snap={e.useAcceleration}
                    numbers={
                      e.useAcceleration
                        ? Array(e.speeds.length)
                            .fill(0)
                            .map((_, index) => index + 1)
                            .reverse()
                            .concat(0)
                            .concat(
                              Array(e.speeds.length)
                                .fill(0)
                                .map((_, index) => (index + 1) * -1)
                            )
                        : e.speeds
                            .map(sp => sp.number)
                            .reverse()
                            .concat(0)
                    }
                    defaultLevel={e.useAcceleration ? 0.5 : 0}
                    sliderStyle={sliderColors[i]}
                    onChange={(value, numbers) =>
                      this.handleSlider(e, value, numbers)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const NAV_QUERY = gql`
  query AdvancedNavigation($simulatorId: ID) {
    thrusters(simulatorId: $simulatorId) {
      id
      power {
        power
        powerLevels
      }
      damage {
        damaged
      }
      rotation {
        yaw
        pitch
        roll
      }
      manualThrusters
      rotationRequired {
        yaw
        pitch
        roll
      }
    }
    engines(simulatorId: $simulatorId) {
      id
      name
      useAcceleration
      power {
        power
        powerLevels
      }
      damage {
        damaged
      }
      speeds {
        text
        number
        velocity
      }
      heat
      speed
      coolant
      on
    }
  }
`;
export default graphql(NAV_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(AdvancedNavigation));
