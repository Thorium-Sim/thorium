import React, { Component } from "react";
import { Label } from "reactstrap";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
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
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: SUB,
        variables: { simulatorId: nextProps.simulator.id },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            targeting: subscriptionData.targetingUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    // Cancel the subscription
    this.sub();
  }
  render() {
    if (this.props.data.loading || !this.props.data.targeting) return null;
    const targeting = this.props.data.targeting && this.props.data.targeting[0];
    if (!targeting) return null;
    const target = targeting.contacts.find(t => t.targeted);
    return (
      <div>
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
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(Targeted);
