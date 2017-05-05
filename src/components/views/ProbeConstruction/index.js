import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Container, Button, Row, Col, Card, CardBlock } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { TweenMax } from 'gsap';
import { findDOMNode } from 'react-dom';

import './style.scss';

const PROBES_SUB = gql`
subscription ProbesUpdate($simulatorId: ID!) {
  probesUpdate (simulatorId: $simulatorId){
    id
    simulatorId
    type
    types {
      id
      name
      size
      count
      description
      availableEquipment {
        id
        name
        size
        count
        description
      }
    }
    name
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    torpedo
  }
}`;

class ProbeConstruction extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedProbeType: null,
      launching: false
    }
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: PROBES_SUB,
        variables: {simulatorId: this.props.simulator.id},
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ probes: subscriptionData.data.probesUpdate }).toJS();
        },
      });
    }
  }
  selectProbe(id) {
    this.setState({
      selectedProbeType: this.state.selectedProbeType ? null : id
    });
  }
  render(){
    if (this.props.data.loading) return null;
    const probes = this.props.data.probes[0];
    const {selectedProbeType, launching} = this.state;
    if (!probes) return <p>No Probe Launcher</p>;
    return <Container fluid className="probe-construction">
    <ProbeSelector 
    types={probes.types} 
    selectedProbeType={selectedProbeType}
    selectProbe={this.selectProbe.bind(this)} />
    <TransitionGroup>
    {      
      [ProbeEquipment, ProbeAction].filter(Comp => {
        console.log(Comp)
        console.log(selectedProbeType)
        console.log(launching)
        if (Comp.name === 'ProbeEquipment' && selectedProbeType && !launching) return true;
        if (Comp.name === 'ProbeAction' && selectedProbeType && launching) return true;
        return false;
      }).map(Comp => {
        return <Comp 
        key={Comp.name} 
        {...this.state}
        probes={probes}
        />;
      })
    }
    </TransitionGroup>
    </Container>
  }
}

const ProbeSelector = ({types, selectedProbeType, selectProbe}) => {
  return <Row>
  <Col sm={12} className={`probe-container  ${selectedProbeType ? 'probeSelected' : ''}`}>
  <div className="placeholder"></div>
  {types.map((t, i) => {
    const probeImage = require(`./probes/${t.id}.svg`);
    return <div 
    className={`probe-type ${selectedProbeType === t.id ? 'selected' : ''}`}
    onClick={selectProbe.bind(this, t.id)}
    >
    <p>{t.name}: {t.count}</p>
    <img draggable="false" src={probeImage} role="presentation" />
    </div>
  })}
  <div className="placeholder"></div>
  </Col>
  </Row>
}

class Transitioner extends Component {
  componentWillEnter (callback) {
    const el = findDOMNode(this);
    TweenMax.fromTo(el, 0.5, {z: 100, rotationY:0, opacity: 0, transformPerspective:200}, {z: 0, rotationY:0, opacity: 1, transformPerspective:200, onComplete: callback});
  }
  componentWillLeave (callback) {
    const el = findDOMNode(this);
    TweenMax.fromTo(el, 0.5, {z: 0, rotationY:0, opacity: 1, transformPerspective:200}, {z: -100, rotationY:0, opacity: 0, transformPerspective:200, onComplete: callback});
  }
}

class ProbeEquipment extends Transitioner {
  render() {
    const {selectedProbeType, probes} = this.props;
    const type = probes.types.find(p => p.id === selectedProbeType);
    return (
      <Row className="probeEquipment">
      <Col sm="5">
      <Card>
      <CardBlock>
      <Row>
      <Col sm="6">
      <strong>Name</strong>
      </Col>
      <Col sm="3">
      <strong>Size</strong>
      </Col>
      <Col sm="3">
      <strong>Qty</strong>
      </Col>
      </Row>
      </CardBlock>
      <CardBlock className="equipmentList">
      {
        type.availableEquipment.map(e => (
          <Row className="equipmentItem">
          <Col sm="6">
          <p>{e.name}</p>
          </Col>
          <Col sm="3">
          <p>{e.size}</p>
          </Col>
          <Col sm="3">
          <p>{e.count}</p>
          </Col>
          </Row>
          ))
      }
      </CardBlock>
      </Card>
      </Col>
      <Col sm="2">
      <p>Total Space: </p>
      <p>Space Used:  </p>
      <p>Space Remaining: </p>
      <Button block color="primary">Prepare Probe</Button>
      <Button block color="danger">Cancel Probe</Button>
      </Col>
      <Col sm="5">

      </Col>
      </Row>
      );
  }
}

class ProbeAction extends Transitioner {
  render() {
    return (
      <Row>

      </Row>
      );
  }
}
const PROBES_QUERY = gql`
query Probes($simulatorId: ID!){
  probes(simulatorId: $simulatorId){
    id
    simulatorId
    type
    types {
      id
      name
      size
      count
      description
      availableEquipment {
        id
        name
        size
        count
        description
      }
    }
    name
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    torpedo
  }
}`;

export default  graphql(PROBES_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(ProbeConstruction));