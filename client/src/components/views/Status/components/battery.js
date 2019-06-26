import React, { Component } from "react";
import { Label } from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import { graphql } from "react-apollo";
import Dot from "./dots";
import SubscriptionHelper from "helpers/subscriptionHelper";
const SUB = gql`
  subscription Battery($simulatorId: ID) {
    reactorUpdate(simulatorId: $simulatorId) {
      id
      model
      batteryChargeLevel
      displayName
    }
  }
`;

class Battery extends Component {
  render() {
    if (this.props.data.loading || !this.props.data.reactors) return null;
    const { reactors } = this.props.data;
    if (!reactors) return null;
    const battery = reactors.find(r => r.model === "battery");
    if (!battery) return null;
    return (
      <div>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  reactors: subscriptionData.data.reactorUpdate
                });
              }
            })
          }
        />
        <Label>Battery</Label>
        <Dot color="goldenrod" level={battery.batteryChargeLevel} />
      </div>
    );
  }
}

const QUERY = gql`
  query Battery($simulatorId: ID) {
    reactors(simulatorId: $simulatorId) {
      id
      model
      batteryChargeLevel
      displayName
    }
  }
`;

export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(Battery);
