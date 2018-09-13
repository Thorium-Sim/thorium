import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import BridgeMap from "./bridgeMap";
import "./style.scss";

const queryData = `
id
station {
  name
  description
}
`;

const QUERY = gql`
query Clients($simulatorId: ID!){
  clients(simulatorId:$simulatorId){
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
subscription ClientsUpdate($simulatorId:ID!) {
  clientChanged(simulatorId:$simulatorId) {
${queryData}
    }
  }
`;

class BridgeMapData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { clients } = data;
          if (loading || !clients) return null;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      clients: subscriptionData.data.clientChanged
                    });
                  }
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
