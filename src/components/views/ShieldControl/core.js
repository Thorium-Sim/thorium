import React, {Component} from 'react';
import { Table, Button } from 'reactstrap';
import { InputField, OutputField } from '../../generic/core';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import gql from 'graphql-tag';

const SHIELD_SUB = gql`
subscription ShieldSub{
  shieldsUpdate {
    id
    name
    state
    position
    frequency
    integrity
    simulatorId
  }
}`;

class ShieldsCore extends Component {
  constructor(props) {
    super(props);
    this.shieldSub = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.shieldSub && !nextProps.data.loading) {
      this.shieldSub = nextProps.data.subscribeToMore({
        document: SHIELD_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({shields: subscriptionData.data.shieldsUpdate}).toJS();
        }
      });
    }
  }
  setFrequency() {

  }
    setIntegrity() {

  }
  render(){
    if (this.props.data.loading) return null;
    return (<div>
      <p>Shields</p>
      {
        (this.props.data.shields.length > 0 ? <Table responsive size="sm">
          <thead>
          <tr>
          <th>Name</th>
          <th>State</th>
          <th>Frequency</th>
          <th>Integrity</th>
          </tr>
          </thead>
          <tbody>
          {this.props.data.shields.map(s => {
            return <tr key={s.id}>
            <td>{s.name}</td> 
            <td><OutputField>{s.state ? "Raised" : "Lowered"}</OutputField></td>
            <td><InputField prompt="What is the frequency?" onClick={this.setFrequency.bind(this, s)}>{Math.round(s.frequency*10)/10}</InputField></td>
            <td>
            <InputField style={{width: '50%', float: 'left'}} prompt="What is the integrity?" onClick={this.setIntegrity.bind(this, s)}>{Math.round(s.integrity*100)}</InputField>
            <Button style={{width: '50%'}} size="sm" color="danger">Hit</Button>
            </td>
            </tr>
          })}
          </tbody>
          </Table>
          : "No shields")
      }
      </div>);
  }
}


const SHIELD_QUERY = gql`
query Shields($simulatorId: ID!){
  shields(simulatorId: $simulatorId) {
    id
    name
    state
    position
    frequency
    integrity
    simulatorId
  }
}`;

export default  graphql(SHIELD_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(ShieldsCore));