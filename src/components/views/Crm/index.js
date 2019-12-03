import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Crm from "./crm";
import "./style.scss";

const fragment = gql`
  fragment CrmData on Crm {
    id
    power {
      power
      powerLevels
    }
    damage {
      damaged
    }
    displayName
    activated
    password
  }
`;

export const CRM_QUERY = gql`
  query Crm($simulatorId: ID!) {
    crm(simulatorId: $simulatorId) {
      ...CrmData
    }
    clients(simulatorId: $simulatorId) {
      id
      station {
        name
      }
      hypercard
    }
  }
  ${fragment}
`;
export const CRM_CLIENT_SUB = gql`
  subscription Clients($simulatorId: ID!) {
    clientChanged(simulatorId: $simulatorId) {
      id
      station {
        name
      }
      hypercard
    }
  }
`;
export const CRM_SUB = gql`
  subscription CrmUpdate($simulatorId: ID!) {
    crmUpdate(simulatorId: $simulatorId) {
      ...CrmData
    }
  }
  ${fragment}
`;

class CrmData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={CRM_QUERY}
        variables={{simulatorId: this.props.simulator.id}}
      >
        {({loading, data, subscribeToMore}) => {
          if (loading || !data) return null;
          const {crm, clients} = data;
          if (!crm) return <div>No CRM System</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: CRM_SUB,
                  variables: {simulatorId: this.props.simulator.id},
                  updateQuery: (previousResult, {subscriptionData}) => {
                    return Object.assign({}, previousResult, {
                      crm: subscriptionData.data.crmUpdate,
                    });
                  },
                })
              }
            >
              <SubscriptionHelper
                subscribe={() =>
                  subscribeToMore({
                    document: CRM_CLIENT_SUB,
                    variables: {simulatorId: this.props.simulator.id},
                    updateQuery: (previousResult, {subscriptionData}) => {
                      return Object.assign({}, previousResult, {
                        clients: subscriptionData.data.clientChanged,
                      });
                    },
                  })
                }
              />
              <Crm {...this.props} {...crm} clients={clients} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default CrmData;
