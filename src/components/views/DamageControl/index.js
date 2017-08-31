import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Container, Row, Col, Button, Card, CardBlock } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import Tour from "reactour"

import './style.scss';

const SYSTEMS_SUB = gql`
subscription SystemsUpdate($simulatorId: ID){
  systemsUpdate(simulatorId: $simulatorId) {
    id
    name
    damage {
      damaged
      report
      requested
      reactivationCode
      neededReactivationCode
    }
    simulatorId
    type
  }
}`;

class DamageControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSystem: null,
      reactivationCodeModal: false,
      codeEntry: ''
    }
    this.systemSub = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.systemSub && !nextProps.data.loading) {
      this.systemSub = nextProps.data.subscribeToMore({
        document: SYSTEMS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ systems: subscriptionData.data.systemsUpdate }).toJS();
        }
      });
    }
    if (!nextProps.data.loading) {
      const selectedSystem = nextProps.data.systems.find(s => s.id === this.state.selectedSystem);
      if (selectedSystem) {
        this.setState({
          codeEntry: selectedSystem.damage.reactivationCode || ''
        });
      }
    }
  }
  systemName(sys) {
    if (sys.type === 'Shield'){
      return `${sys.name} Shields`;
    }
    if (sys.type === 'Engine'){
      return `${sys.name} Engines`;
    }
    return sys.name;
  }
  selectSystem(id){
    const selectedSystem = this.props.data.systems.find(s => s.id === id);
    this.setState({
      selectedSystem: id,
      codeEntry: selectedSystem.damage.reactivationCode || ''
    })
  }
  requestReport(){
    const mutation = gql`
    mutation RequestReport ($systemId: ID!){
      requestDamageReport(systemId: $systemId)
    }`;
    const variables = {
      systemId: this.state.selectedSystem
    };
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  toggle = () => {
    this.setState({
      reactivationCodeModal: !this.state.reactivationCodeModal
    });
  }
  cancelReactivationCode = () => {
    this.setState({
      reactivationCodeModal: false,
      codeEntry: ''
    });
  }
  setCodeEntry = (c) => {
    if ((this.state.codeEntry + c).length <= 8) {
      this.setState({
        codeEntry: this.state.codeEntry + c
      })
    }
  }
  clearCodeEntry = () => {
    this.setState({
      codeEntry: ''
    })
  }
  reactivateCode = () => {
    this.toggle();
    const mutation = gql`
    mutation SendReactivationCode($systemId: ID!, $station: String!, $code: String!){
      systemReactivationCode(systemId: $systemId, station: $station, code: $code)
    }`;
    const variables = {
      systemId: this.state.selectedSystem,
      code: this.state.codeEntry,
      station: this.props.station.name
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render(){
    if (this.props.data.loading) return null;
    const systems = this.props.data.systems;
    const damagedSystem = systems.find(s => this.state.selectedSystem === s.id) || {damage: {}};
    return <Container fluid className="damage-control">
    <Row>
    <Col sm="3" className={`damage-list ${damagedSystem.damage.neededReactivationCode ? 'reactivation-code' : ''}`}>
    <h4>Damaged Systems</h4>
    <Card>
    <CardBlock>
    {
      this.state.reactivationCodeModal ?
      <div className="reactivation-modal">
      <ul className="flex-boxes">
      {['¥','Ω','∏','§','-','∆','£','∑','∂'].map((c, i)=> <li key={i} onClick={() => this.setCodeEntry(c)}>{c}</li>)}
      </ul>
      <Row>
      <Col sm={5}>
      <Button block color="danger" onClick={this.cancelReactivationCode}>Cancel</Button>
      </Col>
      <Col sm={{size:5, offset: 2}}>
      <Button block color="warning" onClick={this.clearCodeEntry}>Clear</Button>
      </Col>
      </Row>
      </div> :
      systems.filter(s => s.damage.damaged)
      .map(s => <p key={s.id}
        className={`${this.state.selectedSystem === s.id ?
          'selected' : ''}
          ${s.damage.requested ? 'requested' : ''}
          ${s.damage.report ? 'report' : ''}`}
          onClick={this.selectSystem.bind(this, s.id)}>
          {this.systemName(s)}
          </p>)
    }
    </CardBlock>
    </Card>
    {
      this.state.reactivationCodeModal ?
      <Button block size="lg" color="primary" onClick={this.reactivateCode}>Reactivate</Button>
      :
      <Button block
      disabled={!this.state.selectedSystem}
      onClick={this.requestReport.bind(this)}
      color="primary">Request Damage Report</Button>
    }
    {
      damagedSystem.damage.neededReactivationCode &&
      <Card className="reactivation-code-entry" onClick={this.state.reactivationCodeModal ? () => {} : this.toggle}>
      <CardBlock>
      <p className={`${this.state.codeEntry ? 'code-entry' : ''}`}>
      {
        this.state.codeEntry ?
        this.state.codeEntry : "Enter Reactivation Code..."
      }
      </p>
      </CardBlock>
      </Card>
    }
    </Col>
    <Col sm="9" className="damage-report">
    <h4>Damage Report</h4>
    <Card>
    <CardBlock>
    <p className="damageReport-text">{ this.state.selectedSystem ? systems.find(s => s.id === this.state.selectedSystem).damage.report : "No system selected."}</p>
    </CardBlock>
    </Card>
    </Col>
    </Row>
    <Tour
        steps={trainingSteps}
        isOpen={this.props.clientObj.training}
        onRequestClose={this.props.stopTraining}
    />
    </Container>
  }
}

const trainingSteps = [
  {
    selector: ".enginesBar",
    content: "The ship’s systems are intelligent enough to know when they’re damaged, and to understand (mostly) how they can be fixed. When a system is damaged, instructions to troubleshoot and repair the damaged system will appear here. Follow them exactly."
  },
];

const SYSTEMS_QUERY = gql`
query Systems($simulatorId: ID){
  systems(simulatorId: $simulatorId) {
    id
    name
    damage {
      damaged
      report
      requested
      reactivationCode
      neededReactivationCode
    }
    simulatorId
    type
  }
}`;

export default graphql(SYSTEMS_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(DamageControl));
