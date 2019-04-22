import React, { Component } from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Interfaces from "./interfaces";
const fragment = gql`
  fragment InterfaceData on Interface {
    id
    name
    values
    config
    deviceType {
      id
      name
      width
      height
    }
    components
    connections
  }
`;
const QUERY = gql`
  query Interfaces($simulatorId: ID!) {
    interfaces(simulatorId: $simulatorId) {
      ...InterfaceData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription TranswarpUpdate($simulatorId: ID!) {
    interfaceUpdate(simulatorId: $simulatorId) {
      ...InterfaceData
    }
  }
  ${fragment}
`;

class InterfaceData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { interfaces } = data;
          if (loading || !interfaces) return null;
          const iFace = interfaces.find(i => i.id === this.props.interfaceId);
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      interfaces: subscriptionData.data.interfaceUpdate
                    });
                  }
                })
              }
            >
              {iFace ? (
                <Interfaces {...this.props} iFace={iFace} />
              ) : (
                "Invalid Interface ID"
              )}
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}

export default InterfaceData;
