import React, { Component } from "react";
import { Label } from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import { graphql } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";
const SUB = gql`
  subscription TargetUpdate($simulatorId: ID) {
    targetingUpdate(simulatorId: $simulatorId) {
      id
      displayName
      contacts {
        id
        targeted
        name
      }
    }
  }
`;

class Targeted extends Component {
  render() {
    if (this.props.data.loading || !this.props.data.targeting) return null;
    const targeting = this.props.data.targeting && this.props.data.targeting[0];
    if (!targeting) return null;
    const target = targeting.contacts.find(t => t.targeted);
    return (
      <div>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  targeting: subscriptionData.data.targetingUpdate
                });
              }
            })
          }
        />
        <Label>Current Target</Label>
        <div className="status-field">{target ? target.name : "No Target"}</div>
      </div>
    );
  }
}
const QUERY = gql`
  query Target($simulatorId: ID) {
    targeting(simulatorId: $simulatorId) {
      id
      displayName
      contacts {
        id
        targeted
        name
      }
    }
  }
`;

export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(Targeted);
