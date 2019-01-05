import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Trigger from "./trigger";

const queryData = `
id
name
components
connections
config
values
`;

const QUERY = gql`
  query Triggers {
    triggers {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription TriggersUpdate {
    triggersUpdate {
${queryData}
    }
  }
`;

class TriggerData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY}>
        {({ loading, data, subscribeToMore }) => {
          const { triggers } = data;
          if (loading || !triggers) return null;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      triggers: subscriptionData.data.triggersUpdate
                    });
                  }
                })
              }
            >
              <Trigger {...this.props} triggers={triggers} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}

export default TriggerData;
