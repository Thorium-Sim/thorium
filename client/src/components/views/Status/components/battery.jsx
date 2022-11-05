import React, {Component} from "react";
import {Label} from "helpers/reactstrap";
import gql from "graphql-tag";
import {graphql} from "@apollo/client/react/hoc";
import Dot from "./dots";
import SubscriptionHelper from "helpers/subscriptionHelper";
export const STATUS_BATTERY_SUB = gql`
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
    const {reactors} = this.props.data;
    if (!reactors) return null;
    const battery = reactors.find(r => r.model === "battery");
    if (!battery) return null;
    return (
      <div>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: STATUS_BATTERY_SUB,
              variables: {simulatorId: this.props.simulator.id},
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  reactors: subscriptionData.data.reactorUpdate,
                });
              },
            })
          }
        />
        <Label>Battery</Label>
        <Dot color="goldenrod" level={battery.batteryChargeLevel} />
      </div>
    );
  }
}

export const STATUS_BATTERY_QUERY = gql`
  query Battery($simulatorId: ID) {
    reactors(simulatorId: $simulatorId) {
      id
      model
      batteryChargeLevel
      displayName
    }
  }
`;

export default graphql(STATUS_BATTERY_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {simulatorId: ownProps.simulator.id},
  }),
})(Battery);
