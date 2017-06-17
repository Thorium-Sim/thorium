import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Container, Row, Col } from 'reactstrap';
import { InputField, OutputField } from '../../generic/core';
import FontAwesome from 'react-fontawesome';

const ROTATION_CHANGE_SUB = gql`
subscription RotationChanged{
  rotationChange{
    id
    rotation {
      yaw
      pitch
      roll
    }
    rotationRequired{
      yaw
      pitch
      roll
    }
    manualThrusters
    direction {
      x
      y
      z
    }
  }
}`;

class ThrusterCore extends Component {
  rotationSubscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.rotationSubscription && !nextProps.data.loading) {
      this.rotationSubscription = nextProps.data.subscribeToMore({
        document: ROTATION_CHANGE_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          console.log(subscriptionData.data);
          previousResult.thrusters = previousResult.thrusters.map(thruster => {
            if (thruster.id === subscriptionData.data.rotationChange.id){
              thruster.rotation = subscriptionData.data.rotationChange.rotation
            } 
            return thruster;
          })
          return previousResult;
        },
      });
    }
  }
  toggleManualThrusters = () => {

  }
  setRequiredRotation = (which) => {

  }
  render() {
    if (this.props.data.loading) return null;
    const thrusters = this.props.data.thrusters[0];
    if (!thrusters) return <p>No Thrusters</p>;
    return <Container className="thrustersCore" fluid>
    <p className="core-title">Thrusters</p>
  {/*<label><input type="checkbox" onClick={this.toggleManualThrusters} /> Manual Thrusters</label>*/}
  <Row>
  <Col sm={4}>Yaw</Col>
  <Col sm={4}>Pitch</Col>
  <Col sm={4}>Roll</Col>
  <Col sm={4}><OutputField>{Math.round(thrusters.rotation.yaw)}</OutputField></Col>
  <Col sm={4}><OutputField>{Math.round(thrusters.rotation.pitch)}</OutputField></Col>
  <Col sm={4}><OutputField>{Math.round(thrusters.rotation.roll)}</OutputField></Col>
  <Col sm={4}>
  <InputField 
  alert={Math.round(thrusters.rotation.yaw) !== Math.round(thrusters.rotationRequired.yaw)}
  prompt="What is the required yaw?" 
  onClick={() => {this.setRequiredRotation('yaw')}}>
  {Math.round(thrusters.rotationRequired.yaw)}
  </InputField>
  </Col>
  <Col sm={4}>
  <InputField 
  alert={Math.round(thrusters.rotation.pitch) !== Math.round(thrusters.rotationRequired.pitch)}
  prompt="What is the required pitch?"
  onClick={() => {this.setRequiredRotation('pitch')}}>
  {Math.round(thrusters.rotationRequired.pitch)}
  </InputField>
  </Col>
  <Col sm={4}>
  <InputField alert={Math.round(thrusters.rotation.roll) !== Math.round(thrusters.rotationRequired.roll)}
  prompt="What is the required roll?"
  onClick={() => {this.setRequiredRotation('roll')}}>
  {Math.round(thrusters.rotationRequired.roll)}
  </InputField>
  </Col>
  <ThrusterArrow name="arrow-circle-down" value={thrusters.direction.z < 0 ? Math.abs(thrusters.direction.z) : 0}/>
  <ThrusterArrow name="arrow-up" value={thrusters.direction.y < 0 ? Math.abs(thrusters.direction.y) : 0}/>
  <ThrusterArrow name="arrow-circle-up" value={thrusters.direction.z > 0 ? Math.abs(thrusters.direction.z) : 0}/>
  <ThrusterArrow name="arrow-left" value={thrusters.direction.x < 0 ? Math.abs(thrusters.direction.x) : 0}/>
  <ThrusterArrow name="arrow-down" value={thrusters.direction.y > 0 ? Math.abs(thrusters.direction.y) : 0}/>
  <ThrusterArrow name="arrow-right" value={thrusters.direction.x > 0 ? Math.abs(thrusters.direction.x) : 0}/>
  </Row>
  </Container>
}
}

const ThrusterArrow = ({name, value}) => {
  console.log(value);
  return <Col sm={4} className="thruster-symbol">
  <FontAwesome name={name} style={{color: `rgb(${Math.round(value * 255)},${Math.round(value * 255)},${Math.round(value * 255)})`}} />
  </Col>
}

const THRUSTER_QUERY = gql`
query Thrusters($simulatorId: ID){
  thrusters(simulatorId: $simulatorId){
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
}`;


export default graphql(THRUSTER_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(ThrusterCore);