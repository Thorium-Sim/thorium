import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';

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
class ShieldControl extends Component {
  constructor(props){
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
  _toggleShields(){
    let mutation;
    let variables = {id: this.props.data.shields[0].id};
    if (this.props.data.shields[0].state){
      mutation = gql`
      mutation ToggleShields($id: ID!){
        shieldLowered(id: $id)
      }`;
    } else {
      mutation = gql`
      mutation ToggleShields($id: ID!){
        shieldRaised(id: $id)
      }`;
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  render(){
    if (this.props.data.loading) return null;
    return <div className="container">
    <div>
    <span className={this.props.data.shields[0].state ? 'text-success' : 'text-danger'}>{this.props.data.shields[0].state ? "Shields On!" : "Shields Off!"}</span>
    <button className="btn btn-success" onClick={this._toggleShields.bind(this)}>Toggle Shields</button>
    </div>
    </div>
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
export default graphql(SHIELD_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(ShieldControl));
