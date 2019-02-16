import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Interfaces from "./interfaces";

const queryData = `
id
name
deviceType {
  id
  name
  width
  height
  isLandscape
}
components
connections
config
values
`;

const QUERY = gql`
  query Interfaces {
    interfaces {
${queryData}
    }
    interfaceDevices {
      id
      name
      width
      height
      isLandscape
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription InterfaceUpdate {
    interfaceUpdate {
${queryData}
    }
  }
`;

class InterfacesData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY}>
        {({ loading, data, subscribeToMore }) => {
          const { interfaces } = data;
          if (loading || !interfaces) return null;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      interfaces: subscriptionData.data.interfaceUpdate
                    });
                  }
                })
              }
            >
              <Interfaces {...this.props} interfaces={interfaces} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}

export default InterfacesData;
