import React, {Component} from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
//import DamageOverlay from '../helpers/DamageOverlay';
import './style.scss';

const PHASERS_SUB = gql`
subscription PhasersUpdate($simulatorId: ID!){
  phasersUpdate(simulatorId: $simulatorId){
    id
    simulatorId
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    name
    beams {
      id
      state
      charge
      heat
    }
    arc
  }
}`;

class PhaserCharging extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedBank: null,
      arc: 0.5
    }
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps){
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: PHASERS_SUB,
        variables: {simulatorId: this.props.simulator.id},
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({phasers: subscriptionData.data.phasersUpdate}).toJS();
        }
      });
    }
  }
  selectPhaserBank(id){
    this.setState({
      selectedBank: id,
    })
  }
  chargePhasers(beamId){
    const phasers = this.props.data.phasers[0];
    const mutation = gql`
    mutation ChargePhaserBeam ($id: ID!, $beamId: ID!){
      chargePhaserBeam(id:$id, beamId:$beamId)
    }`;
    const variables = {
      id: phasers.id,
      beamId
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  dischargePhasers(beamId){
    const phasers = this.props.data.phasers[0];
    const mutation = gql`
    mutation DischargePhaserBeam ($id: ID!, $beamId: ID!){
      dischargePhaserBeam(id:$id, beamId:$beamId)
    }`;
    const variables = {
      id: phasers.id,
      beamId
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  chargeAll(){
    let i = 0;
    const phasers = this.props.data.phasers[0];
    phasers.beams.forEach(b => {
      if (b.charge < 1){
        setTimeout(this.chargePhasers.bind(this, b.id), i*500);
        i += 1;
      }
    })
  }
  dischargeAll(){
    const phasers = this.props.data.phasers[0];
    phasers.beams.forEach(b => {
      if (b.charge > 0){
        this.dischargePhasers(b.id);
      }
    })
  }
  render(){
    if (this.props.data.loading) return null;
    const phasers = this.props.data.phasers[0];
    const {selectedBank} = this.state;
    if (!phasers) return <p>No Phaser System</p>;
    return (
      <Container fluid className="card-phaserCharging">
      <Row>
      <Col sm="2">
      <p>Phaser Banks</p>
      </Col>
      <Col sm="10" className="phaserLevels">
      <p>0%</p>
      <p>25%</p>
      <p>50%</p>
      <p>
      <span>75%</span>
      <span>100%</span>
      </p>
      </Col>
      </Row>
      {phasers.beams.map((p, i) => <PhaserBeam 
        key={p.id} 
        {...p}
        index={i + 1}
        selectedBank={selectedBank}
        selectPhaserBank={this.selectPhaserBank.bind(this, p.id)} 
        />)}
      <Row>
      <Col sm={{size: 6, offset: 3}}>
      <Row>
      <Col sm={6}>
      <Button color="primary" disabled={!selectedBank} block onClick={this.dischargePhasers.bind(this, selectedBank)}>Discharge Phaser Bank</Button>
      </Col>
      <Col sm={6}>
      <Button color="primary" disabled={!selectedBank} block onClick={this.chargePhasers.bind(this, selectedBank)}>Charge Phaser Bank</Button>
      </Col>
      <Col sm={6}>
      <Button color="primary" onClick={this.dischargeAll.bind(this)} block>Discharge All Phaser Banks</Button>
      </Col>
      <Col sm={6}>
      <Button color="primary" onClick={this.chargeAll.bind(this)} block>Charge All Phaser Banks</Button>
      </Col>
      </Row>
      </Col>
      </Row>
      <PhaserArc client={this.props.client} phaserId={phasers.id} arc={phasers.arc}/>
      </Container>);
  }
}

export const PhaserBeam = ({chargePhasers, dischargePhasers, coolPhasers, firePhasers, heat, targeting, index, id, charge, state, selectedBank = null, selectPhaserBank = () => {}}) => {
  if (targeting) {
    return <div>
    <Row className="phaserBeam">
    <Col sm="8">
    <div className="phaserText">
    <p>Phaser Bank {index}</p>
    <p>Charge: {Math.round(charge * 100)}%</p>
    </div>
    <div className="chargeHolder">
    <div className="charge" style={{width: `${charge * 100}%`}}></div>
    </div>
    </Col>
    <Col sm={"4"} style={{marginTop:'27px'}}>
    <Button block color="danger" onMouseDown={firePhasers.bind(this, id)}>Fire Phasers</Button>
    </Col>
    </Row>
    <Row className="phaserBeam">
    <Col sm="8">
      <div className="chargeHolder">
        <div className="heat" style={{width: `${heat * 100}%`}}></div>
      </div>
    </Col>
    </Row>
    <Row>
    <Col sm="2">
    <Button block color="primary"onClick={chargePhasers.bind(this, id)}>Charge</Button>
    </Col>
    <Col sm="2">
    <Button block color="warning"onClick={dischargePhasers.bind(this, id)}>Discharge</Button>
    </Col>
    <Col sm="2">
    <Button block color="info" onMouseDown={coolPhasers.bind(this, id)}>Coolant</Button>
    </Col>
    </Row>
    </div>
  } else {
    return <Row className="phaserBeam">
    <Col sm="2">
    <Button color="warning" active={id === selectedBank} onClick={selectPhaserBank}block>Phaser Bank {index}</Button>
    </Col>
    <Col sm="10">
    <div className="chargeHolder">
    <div className="charge" style={{width: `${charge * 100}%`}}></div>
    </div>
    </Col>
    </Row>
  }
}


export class PhaserArc extends Component {
  constructor(props){
    super(props);
    this.state = {
      arc: props.arc
    }
    this.mouseUp = () => {
      document.removeEventListener('mouseup', this.mouseUp);
      this.arcTimeout = null;
    }
    this.arcTimeout = null;
  }
  setArc(){
    const {phaserId} = this.props;
    const mutation = gql`
    mutation PhaserArc($id: ID!, $arc: Float!) {
      phaserArc(id: $id, arc: $arc)
    }`;
    const variables = {
      id: phaserId,
      arc: this.state.arc
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  changeArc(direction){
    let {arc} = this.state;
    if (direction === 'up'){
      arc += 0.04;
    } else {
      arc -= 0.04;
    }
    arc = Math.min(1, Math.max(0, arc));
    this.setState({
      arc
    })
    if (this.arcTimeout){
      this.arcTimeout = setTimeout(this.changeArc.bind(this, direction), 100);
    } else {
      this.setArc();
    }
  }
  updateArc(direction) {
    document.addEventListener('mouseup', this.mouseUp);
    this.arcTimeout = setTimeout(this.changeArc.bind(this, direction), 100);
  }
  componentWillReceiveProps(newProps){
    this.setState({
      arc: newProps.arc
    })
  }
  render(){
    const {arc} = this.state;
    document.documentElement.style.setProperty('--phaserArcRotate', `${arc * 10}deg`);
    const lasers = document.querySelector('.lasers');
    if (lasers && this.arcTimeout){
      lasers.style.setProperty('display','none');
      setTimeout(() => {
        lasers.style.setProperty('display','block');
      },20);
    }
    return <Row style={{height: '200px'}} className="phaserArc">
    <Col sm={{size: 4}} style={{marginTop: '50px'}}>
    <Button onMouseDown={this.updateArc.bind(this, 'up')} block color="warning">Widen Arc</Button>
    <Button onMouseDown={this.updateArc.bind(this, 'down')} block color="warning">Tighten Arc</Button>
    <p>Beam Arc: {Math.round(arc * 90)} Degrees</p>
    </Col>
    <Col sm={{size: 8}}>
    <div className="lasers">
    <div className="laser-beam"></div>
    <div className="laser-beam red"></div>
    <div className="laser-beam purple"></div>
    <div className="laser-beam green"></div>
    </div>
    </Col>
    </Row>
  }
}
const PHASERS_QUERY = gql`
query Phasers($simulatorId: ID!){
  phasers(simulatorId: $simulatorId){
    id
    simulatorId
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    name
    beams {
      id
      state
      charge
      heat
    }
    arc
  }
}`;

export default graphql(PHASERS_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(PhaserCharging));
