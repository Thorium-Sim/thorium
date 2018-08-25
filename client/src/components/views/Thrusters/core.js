import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Input } from "reactstrap";
import { InputField, OutputField } from "../../generic/core";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";

import FontAwesome from "react-fontawesome";

const ROTATION_CHANGE_SUB = gql`
  subscription RotationChanged($simulatorId: ID) {
    rotationChange(simulatorId: $simulatorId) {
      id
      direction {
        x
        y
        z
      }
      rotation {
        yaw
        pitch
        roll
      }
      rotationDelta {
        yaw
        pitch
        roll
      }
      rotationRequired {
        yaw
        pitch
        roll
      }
      manualThrusters
      rotationSpeed
      movementSpeed
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
    }
  }
`;

class ThrusterCore extends Component {
  toggleManualThrusters = () => {};
  setRequiredRotation = (which, value) => {
    const mutation = gql`
      mutation SetRequiredThrusters($id: ID!, $rotation: RotationInput) {
        requiredRotationSet(id: $id, rotation: $rotation)
      }
    `;
    const thrusters = this.props.data.thrusters[0];
    const rotation = Object.assign(
      {},
      {
        yaw: thrusters.rotationRequired.yaw,
        pitch: thrusters.rotationRequired.pitch,
        roll: thrusters.rotationRequired.roll
      }
    );
    rotation[which] = value;
    const variables = {
      id: thrusters.id,
      rotation
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.thrusters) return null;
    const thrusters = this.props.data.thrusters[0];
    if (!thrusters) return <p>No Thrusters</p>;
    return (
      <Container className="thrustersCore" fluid>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: ROTATION_CHANGE_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  thrusters: [subscriptionData.data.rotationChange]
                });
              }
            })
          }
        />
        {/*<label><input type="checkbox" onClick={this.toggleManualThrusters} /> Manual Thrusters</label>*/}
        <Row>
          <Col sm={4}>Yaw</Col>
          <Col sm={4}>Pitch</Col>
          <Col sm={4}>Roll</Col>
          <Col sm={4}>
            <OutputField>{Math.round(thrusters.rotation.yaw)}</OutputField>
          </Col>
          <Col sm={4}>
            <OutputField>{Math.round(thrusters.rotation.pitch)}</OutputField>
          </Col>
          <Col sm={4}>
            <OutputField>{Math.round(thrusters.rotation.roll)}</OutputField>
          </Col>
          <Col sm={4}>
            <InputField
              alert={
                Math.round(thrusters.rotation.yaw) !==
                Math.round(thrusters.rotationRequired.yaw)
              }
              prompt="What is the required yaw?"
              onClick={value => {
                this.setRequiredRotation("yaw", value);
              }}
            >
              {Math.round(thrusters.rotationRequired.yaw)}
            </InputField>
          </Col>
          <Col sm={4}>
            <InputField
              alert={
                Math.round(thrusters.rotation.pitch) !==
                Math.round(thrusters.rotationRequired.pitch)
              }
              prompt="What is the required pitch?"
              onClick={value => {
                this.setRequiredRotation("pitch", value);
              }}
            >
              {Math.round(thrusters.rotationRequired.pitch)}
            </InputField>
          </Col>
          <Col sm={4}>
            <InputField
              alert={
                Math.round(thrusters.rotation.roll) !==
                Math.round(thrusters.rotationRequired.roll)
              }
              prompt="What is the required roll?"
              onClick={value => {
                this.setRequiredRotation("roll", value);
              }}
            >
              {Math.round(thrusters.rotationRequired.roll)}
            </InputField>
          </Col>
          <ThrusterArrow
            name="arrow-circle-down"
            value={
              thrusters.direction.z < 0 ? Math.abs(thrusters.direction.z) : 0
            }
          />
          <ThrusterArrow
            name="arrow-up"
            value={
              thrusters.direction.y > 0 ? Math.abs(thrusters.direction.y) : 0
            }
          />
          <ThrusterArrow
            name="arrow-circle-up"
            value={
              thrusters.direction.z > 0 ? Math.abs(thrusters.direction.z) : 0
            }
          />
          <ThrusterArrow
            name="arrow-left"
            value={
              thrusters.direction.x < 0 ? Math.abs(thrusters.direction.x) : 0
            }
          />
          <ThrusterArrow
            name="arrow-down"
            value={
              thrusters.direction.y < 0 ? Math.abs(thrusters.direction.y) : 0
            }
          />
          <ThrusterArrow
            name="arrow-right"
            value={
              thrusters.direction.x > 0 ? Math.abs(thrusters.direction.x) : 0
            }
          />
        </Row>
        <Row>
          <Col sm={6}>
            <label>Rotation Speed</label>
            <Mutation
              mutation={gql`
                mutation UpdateThrusterRotation($id: ID!, $speed: Float!) {
                  setThrusterRotationSpeed(id: $id, speed: $speed)
                }
              `}
            >
              {action => (
                <Input
                  type="select"
                  style={{ height: "18px" }}
                  value={thrusters.rotationSpeed}
                  onChange={e => {
                    action({
                      variables: { id: thrusters.id, speed: e.target.value }
                    });
                  }}
                >
                  <option value={0}>0</option>
                  <option value={0.2}>0.2</option>
                  <option value={0.5}>0.5</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10 - Fast</option>
                </Input>
              )}
            </Mutation>
          </Col>
          <Col sm={6}>
            <label>Movement Speed (Sensors Auto-thrusters)</label>
            <Mutation
              mutation={gql`
                mutation UpdateThrusterMovement($id: ID!, $speed: Float!) {
                  setThrusterMovementSpeed(id: $id, speed: $speed)
                }
              `}
            >
              {action => (
                <Input
                  type="select"
                  style={{ height: "18px" }}
                  value={thrusters.movementSpeed}
                  onChange={e => {
                    action({
                      variables: { id: thrusters.id, speed: e.target.value }
                    });
                  }}
                >
                  <option value={0}>0</option>
                  <option value={0.2}>0.2</option>
                  <option value={0.5}>0.5</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10 - Fast</option>
                </Input>
              )}
            </Mutation>
          </Col>
        </Row>
      </Container>
    );
  }
}

const ThrusterArrow = ({ name, value }) => {
  return (
    <Col sm={4} className="thruster-symbol">
      <FontAwesome
        name={name}
        size="lg"
        style={{
          margin: "2px",
          color: `rgb(${Math.round(value * 255)},${Math.round(
            value * 255
          )},${Math.round(value * 255)})`
        }}
      />
    </Col>
  );
};

const THRUSTER_QUERY = gql`
  query Thrusters($simulatorId: ID) {
    thrusters(simulatorId: $simulatorId) {
      id
      direction {
        x
        y
        z
      }
      rotation {
        yaw
        pitch
        roll
      }
      rotationDelta {
        yaw
        pitch
        roll
      }
      rotationRequired {
        yaw
        pitch
        roll
      }
      manualThrusters
      rotationSpeed
      movementSpeed
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
    }
  }
`;

export default graphql(THRUSTER_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(ThrusterCore));
