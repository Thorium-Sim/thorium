import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col } from "reactstrap";
import { InputField, OutputField } from "../../generic/core";

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
  rotationSubscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.rotationSubscription && !nextProps.data.loading) {
      this.rotationSubscription = nextProps.data.subscribeToMore({
        document: ROTATION_CHANGE_SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            thrusters: [subscriptionData.data.rotationChange]
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.rotationSubscription && this.rotationSubscription();
  }
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
              thrusters.direction.y < 0 ? Math.abs(thrusters.direction.y) : 0
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
              thrusters.direction.y > 0 ? Math.abs(thrusters.direction.y) : 0
            }
          />
          <ThrusterArrow
            name="arrow-right"
            value={
              thrusters.direction.x > 0 ? Math.abs(thrusters.direction.x) : 0
            }
          />
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
        style={{
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
