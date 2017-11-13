import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Card } from "reactstrap";
import { Asset } from "../../../helpers/assets";

import ThrusterRotor from "./thrusterRotor";
import "./style.css";

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
  render() {
    if (this.props.data.loading || !this.props.data.thrusters) return null;
    const thrusters = this.props.data.thrusters[0];
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
                  Current Velocity
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
            <Row>
              <Col sm={6}>
                Impulse Acceleration
                <input type="range" min="-4" max="4" step="1" />
              </Col>
              <Col sm={6}>
                Warp Acceleration
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  className="warp"
                />
              </Col>
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
  }
`;
export default graphql(NAV_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(AdvancedNavigation));
