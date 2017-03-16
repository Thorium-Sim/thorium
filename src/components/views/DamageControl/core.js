import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import { Table } from 'reactstrap';
import { InputField, OutputField } from '../../generic/core';


const SYSTEMS_SUB = gql`
subscription SystemsUpdate($simulatorId: ID){
  systemsUpdate(simulatorId: $simulatorId) {
    id
    name
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    simulatorId
    type
  }
}`;

class DamageControlCore extends Component {
  constructor(props) {
    super(props);
    this.systemSub = null;
    this.state = {
      deck: null,
      room: null
    }
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
  systemStyle(sys){
    const obj = {
      listStyle: 'none',
      cursor: 'pointer'
    };
    if (sys.damage.damaged) {
      obj.color = 'red';
    }
    if (!sys.name) {
      obj.color = 'purple';
    }
    return obj;
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
  setPower(system, power) {

  }
  toggleDamage(system) {
    const variables = {
      systemId: system.id
    };
    let mutation;
    if (system.damage.damaged) {
      // Fix it
      mutation = gql`mutation RepairSystem($systemId: ID!){
        repairSystem(systemId: $systemId)
      }`;
    } else {
      // Break it
      mutation = gql`mutation DamageSystem($systemId: ID!){
        damageSystem(systemId: $systemId)
      }`;
    }
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render(){
    if (this.props.data.loading) return null;
    return <Table size="sm" hover>
    <thead>
    <tr>
    <th>System</th>
    <th>Set</th>
    <th></th>
    <th>Req</th>
    </tr>
    </thead>
    <tbody>
    {this.props.data.systems
      .map(s => (
        <tr key={s.id}>
        <td onClick={this.toggleDamage.bind(this,s)} style={this.systemStyle(s)}>{this.systemName(s)}</td>
        <td><InputField prompt="What is the power?" onClick={this.setPower.bind(this, s)}>{s.power.power}</InputField></td>
        <td>/</td>
        <td><OutputField>{s.power.powerLevels[0]}</OutputField></td>
        </tr>
        ))}
      </tbody>
      </Table>
    }
  }
  const SYSTEMS_QUERY = gql`
  query Systems($simulatorId: ID){
    systems(simulatorId: $simulatorId) {
      id
      name
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      simulatorId
      type
    }
  }`;

  export default graphql(SYSTEMS_QUERY, {
    options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
  })(withApollo(DamageControlCore));