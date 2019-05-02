import React, { Component } from "react";
import { Query } from "react-apollo";
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
  }
`;

const QUERY = gql`
  query Crm($simulatorId: ID!) {
    crm(simulatorId: $simulatorId) {
      ...CrmData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
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
      <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
        {({ loading, data, subscribeToMore }) => {
          const { crm } = data;
          if (loading) return null;
          if (!crm) return <div>No CRM System</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      crm: subscriptionData.data.crmUpdate
                    });
                  }
                })
              }
            >
              <Crm {...this.props} {...crm} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default CrmData;
