import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Crm from "./crm";

const fragment = gql`
  fragment CrmFighterData on CrmFighter {
    id
    clientId
    icon
    size
    hull
    shield
    shieldRaised
    phaserLevel
    torpedoCount
    torpedoLoaded
    destroyed
    docked
    position {
      x
      y
      z
    }
  }
`;

const QUERY = gql`
  query Crm($simulatorId: ID!, $clientId: ID!) {
    crmFighter(simulatorId: $simulatorId, clientId: $clientId) {
      ...CrmFighterData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription CrmUpdate($simulatorId: ID!, $clientId: ID!) {
    crmFighterUpdate(simulatorId: $simulatorId, clientId: $clientId) {
      ...CrmFighterData
    }
  }
  ${fragment}
`;

class FighterData extends Component {
  state = {};
  render() {
    const { crm } = this.props;
    return (
      <Query
        query={QUERY}
        variables={{
          simulatorId: this.props.simulator.id,
          clientId: this.props.clientObj.id
        }}
      >
        {({ loading, data, subscribeToMore }) => {
          const { crmFighter } = data;
          if (loading || !crmFighter) return null;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: {
                    simulatorId: this.props.simulator.id,
                    clientId: this.props.clientObj.id
                  },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      crmFighter: subscriptionData.data.crmFighterUpdate
                    });
                  }
                })
              }
            >
              <Crm {...this.props} crm={crm} fighter={crmFighter} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default FighterData;
