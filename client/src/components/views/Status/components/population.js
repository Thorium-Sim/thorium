import React, { Component } from "react";
import { Label } from "reactstrap";
import gql from "graphql-tag.macro";
import { graphql } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";
const POP_SUB = gql`
  subscription Population($simulatorId: ID) {
    crewCountUpdate(simulatorId: $simulatorId, killed: false)
  }
`;

const SIM_SUB = gql`
  subscription ShipUpdate($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        bridgeCrew
      }
    }
  }
`;

class Population extends Component {
  render() {
    if (this.props.data.loading) return null;
    const crewCount = this.props.data.crewCount || 0;
    if (!this.props.data.simulators) return null;
    const { ship } = this.props.data.simulators[0];
    if (!ship) return null;
    return (
      <div>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SIM_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  simulators: subscriptionData.data.simulatorsUpdate
                });
              }
            })
          }
        />
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: POP_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  crewCount: subscriptionData.data.crewCountUpdate
                });
              }
            })
          }
        />
        <Label>Crew Population</Label>
        <div className="status-field">
          {crewCount + (ship.bridgeCrew ? ship.bridgeCrew : 0)}
        </div>
      </div>
    );
  }
}

const POP_QUERY = gql`
  query Population($simulatorId: ID!) {
    crewCount(simulatorId: $simulatorId, killed: false)
    simulators(id: $simulatorId) {
      id
      ship {
        bridgeCrew
      }
    }
  }
`;

export default graphql(POP_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      simulatorId: ownProps.simulator.id,
      simId: ownProps.simulator.id
    }
  })
})(Population);
