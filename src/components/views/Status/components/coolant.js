import { graphql } from "@apollo/client";
import React, {Component} from "react";
import {Label} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import Dots from "./dots";
import SubscriptionHelper from "helpers/subscriptionHelper";
export const STATUS_COOLANT_SUB = gql`
  subscription Coolant($simulatorId: ID!) {
    coolantUpdate(simulatorId: $simulatorId) {
      id
      coolant
    }
  }
`;

class Coolant extends Component {
  render() {
    if (this.props.data.loading || !this.props.data.coolant) return null;
    const coolant = this.props.data.coolant && this.props.data.coolant[0];
    if (!coolant) return null;
    return (
      <div>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: STATUS_COOLANT_SUB,
              variables: {simulatorId: this.props.simulator.id},
              updateQuery: (previousResult, {subscriptionData}) => {
                return Object.assign({}, previousResult, {
                  coolant: subscriptionData.data.coolantUpdate,
                });
              },
            })
          }
        />
        <Label>Coolant</Label>
        <Dots level={coolant.coolant} color="rgb(40,60,255)" />
      </div>
    );
  }
}
export const STATUS_COOLANT_QUERY = gql`
  query Coolant($simulatorId: ID!) {
    coolant(simulatorId: $simulatorId) {
      id
      coolant
    }
  }
`;

export default graphql(STATUS_COOLANT_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {simulatorId: ownProps.simulator.id},
  }),
})(Coolant);
