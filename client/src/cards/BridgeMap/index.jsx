import React, {Component} from "react";
import {Query} from "@apollo/client/react/components";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import BridgeMap from "./bridgeMap";
import "./style.scss";

const fragment = gql`
  fragment BridgeMapData on Client {
    id
    loginName
    station {
      name
      description
    }
  }
`;

export const BRIDGE_MAP_QUERY = gql`
  query Clients($simulatorId: ID!) {
    clients(simulatorId: $simulatorId) {
      ...BridgeMapData
    }
  }
  ${fragment}
`;
export const BRIDGE_MAP_SUBSCRIPTION = gql`
  subscription ClientsUpdate($simulatorId: ID!) {
    clientChanged(simulatorId: $simulatorId) {
      ...BridgeMapData
    }
  }
  ${fragment}
`;

class BridgeMapData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={BRIDGE_MAP_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {clients} = data;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: BRIDGE_MAP_SUBSCRIPTION,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      clients: subscriptionData.data.clientChanged,
                    });
                  },
                })
              }
            >
              <BridgeMap {...this.props} clients={clients} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default BridgeMapData;
