import React, {Component} from 'react';
import { InputField, OutputField } from '../../generic/core';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

const TRANSPORTER_SUB = gql`
subscription TransportersSub{
  transporterUpdate {
    id
    type
    state
    charge
    simulatorId
    targets {
      id
      icon
      moving
      position {
        x
        y
      }
    }
    requestedTarget
    destination
  }
}`;

class TransporterCore extends Component {
    constructor(props) {
    super(props);
    this.transporterSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.transporterSubscription && !nextProps.data.loading) {
      this.transporterSubscription = nextProps.data.subscribeToMore({
        document: TRANSPORTER_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          previousResult.transporters = previousResult.transporters.map(transporter => {
            if (transporter.id === subscriptionData.data.transporterUpdate.id){
              transporter = subscriptionData.data.transporterUpdate
            } 
            return transporter;
          })
          return previousResult;
        },
      });
    }
  }
  targets(transporter, result){
    this.props.client.mutate({
      mutation: gql`
      mutation SetTransporterTargets($transporter: ID!, $targets: Int!){
        setTransporterTargets(transporter: $transporter, targets: $targets)
      }`,
      variables: {
        transporter: transporter.id,
        targets: result
      }
    })
  }
  render(){
    const transporter = this.props.data.loading ? {targets:[]} : this.props.data.transporters[0];
    return (<div>
      <p>Transporters</p>
      {this.props.data.loading ? <span>Loading...</span> : 
        <div>
        <OutputField alert={transporter.state === 'Scanning'}>{transporter.state} {transporter.state === 'Charging' && `- ${Math.round(transporter.charge * 100)}%`}</OutputField>
        <OutputField>{transporter.requestedTarget}</OutputField>
        <OutputField>{transporter.destination}</OutputField>
        <InputField prompt="How many transporter targets?" onClick={this.targets.bind(this, transporter)}>{transporter.targets.length}</InputField>
        </div>
      }
      </div>);
  }
}


const TRANSPORTERS_QUERY = gql`
query GetTransporters($simulatorId: ID){
  transporters(simulatorId: $simulatorId) {
    id
    state
    charge
    simulatorId
    targets {
      id
    }
    requestedTarget
    destination
  }
}
`;

export default  graphql(TRANSPORTERS_QUERY, {
  options: (props) => ({ variables: { simulatorId: 'test' } }),
})(withApollo(TransporterCore));