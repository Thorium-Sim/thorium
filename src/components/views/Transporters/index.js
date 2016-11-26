import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Button, Row, Col, Input } from 'reactstrap';
import { graphql, compose } from 'react-apollo';
import Draggable from 'react-draggable';

import Scan from './transporterScan';
import './style.scss';

const targets = [
{
  id: "1234",
  icon: "Triangle",
  moving: false,
  coordinates: {
    x: Math.random(),
    y: Math.random(),
    z: Math.random(),
  }
}
];

const ChargeBar = (props) => {
  return (
    <div className="chargeBar" style={{height: `${props.charge * 100}%`}} />
    );
}
class Target extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTarget: null,
    }
  }
  render(){
    return (
      <div>
      <Row>
      <h2 style={{color: 'yellow', width: '100%', textAlign: 'center', opacity:this.state.selectedTarget ? 1 : 0}}>Transport Possible</h2>
      </Row>
      <Row>
      <Col className="targetBox" sm={{size: 4, offset: 1}}>
      {this.props.targets.map((target) => {
        return <img
        draggable="false"
        role="presentation"
        src={require('./crosstarget.svg')}
        style={{position: 'absolute', left: `${target.coordinates.x * 90}%`, top: `${target.coordinates.y * 90}%`}} />
      })}
      <Draggable
      bounds=".targetBox"
      onDrag={(event,obj) => {
        const {clientWidth, clientHeight} = event.target.parentElement;
        const {x, y} = obj;
        let selectedTarget = null
        this.props.targets.forEach((target) => {
          const {x: objX, y: objY} = this.props.targets[0].coordinates;
          if (Math.round((objX - x/clientWidth*1.11111) * 100) === 0 && Math.round((objY - y/clientHeight*1.11111) * 100) === 0){
            // The crosshair is on top of a target
            selectedTarget = target;
          }
        })
        this.setState({
          selectedTarget,
        })
      }}
      >
      <img draggable="false" role="presentation" src={require('./crosshairs.svg')} />
      </Draggable>

      </Col>
      <Col className="chargeBox" sm={{size: 4, offset: 2}}>
      <ChargeBar charge={0.5} />
      <ChargeBar charge={0.5} />
      <ChargeBar charge={0.5} />
      </Col>
      </Row>
      <Row>
      <Col sm={{size: 4, offset: 4}}>
      <div style={{height: '30px'}} />
      <Button block color={'warning'}>Cancel Transport</Button>
      </Col>
      </Row>
      </div>
      );
  }
}

const TargetSelect = (props) => {
  return (
    <Col sm={{size:6, offset:3}}>
    <div style={{height: '60px'}} />
    <h3>Enter Target:</h3>
    <Input placeholder="Enter Target..." size="lg" />
    <div style={{height: '60px'}} />
    <h3>Enter Destination:</h3>
    <Input placeholder="Enter Destination..." size="lg" />
    <div style={{height: '30px'}} />
    <Col sm={{size: 6, offset: 3}}>
    <Button block color={'primary'}>Begin Scan</Button>
    </Col>
    </Col>
    );
}
const Scanning = (props) => {
  return (
    <Col sm={{size: 6, offset: 3}}>
    <Scan />
    <h3 style={{textAlign: 'center', width: '100%'}}>Scanning...</h3>
    <Col sm={{size: 6, offset: 3}}>
    <Button block color={'primary'} size="lg">Cancel Scan</Button>
    </Col>
    </Col>
    );
}

class Transporters extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row>
      <Target targets={targets} />
      </Row>
      );
  }
}

const TRANSPORTERS_QUERY = gql`
query GetTransporters($simulatorId: ID){
  transporters(simulatorId: $simulatorId) {
    id
    type
    state
    charge
    simulatorId
    targets {
      id
      icon
      moving
    }
    requestedTarget
    destination
  }
}
`;
export default  graphql(TRANSPORTERS_QUERY, {
  options: (props) => ({ variables: { simulatorId: 'test' } }),
})(Transporters);