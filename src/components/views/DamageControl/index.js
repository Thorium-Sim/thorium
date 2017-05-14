import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Container, Row, Col, Button, Card, CardBlock } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';

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
    }
    simulatorId
    type
  }
}`;

class DamageControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSystem: null
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
    this.setState({
      selectedSystem: id
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
  render(){
    if (this.props.data.loading) return null;
    const systems = this.props.data.systems;
    return <Container fluid className="damage-control">
    <Row>
    <Col sm="3" className="damage-list">
    <h4>Damaged Systems</h4>
    <Card>
    <CardBlock>
    {
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
    <Button block 
    disabled={!this.state.selectedSystem} 
    onClick={this.requestReport.bind(this)} 
    color="primary">Request Damage Report</Button>
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
    </Container>
  }
}
const SYSTEMS_QUERY = gql`
query Systems($simulatorId: ID){
  systems(simulatorId: $simulatorId) {
    id
    name
    damage {
      damaged
      report
      requested
    }
    simulatorId
    type
  }
}`;

export default graphql(SYSTEMS_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(DamageControl));