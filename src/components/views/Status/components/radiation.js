import React, { Component } from "react";
import { Label } from "reactstrap";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Dot from "./dots";
import SubscriptionHelper from "../../../../helpers/subscriptionHelper";
const SUB = gql`
  subscription ShipUpdate($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        radiation
      }
    }
  }
`;

class Radiation extends Component {
  render() {
    if (this.props.data.loading || !this.props.data.simulators) return null;
    if (!this.props.data.simulators) return null;
    const { ship } = this.props.data.simulators[0];
    return (
      <div>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  simulators: subscriptionData.data.simulatorsUpdate
                });
              }
            })
          }
        />
        <Label>Radiation</Label>
        <Dot level={ship.radiation} />
      </div>
    );
  }
}

const QUERY = gql`
  query Ship($simulatorId: String) {
    simulators(id: $simulatorId) {
      id
      ship {
        radiation
      }
    }
  }
`;

export default graphql(QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(Radiation);
