import React, {Component} from "react";
import {Query} from "@apollo/client/react/components";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import InterfacesControl from "./interfaces";

const fragment = gql`
  fragment InterfaceConfigData on Interface {
    id
    name
    simulatorId
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
  }
`;

const QUERY = gql`
  query Interfaces {
    interfaces {
      ...InterfaceConfigData
    }
  }
  ${fragment}
`;
export const DEVICE_QUERY = gql`
  query Devices {
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
      ...InterfaceConfigData
    }
  }
  ${fragment}
`;

class InterfacesData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY}>
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {interfaces} = data;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      interfaces: subscriptionData.data.interfaceUpdate,
                    });
                  },
                })
              }
            >
              <Query query={DEVICE_QUERY}>
                {({loading, data}) => {
                  if (loading || !data) return null;
                  const {interfaceDevices} = data;

                  return (
                    <InterfacesControl
                      {...this.props}
                      interfaces={interfaces.filter(i => !i.simulatorId)}
                      interfaceDevices={interfaceDevices}
                    />
                  );
                }}
              </Query>
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}

export default InterfacesData;
