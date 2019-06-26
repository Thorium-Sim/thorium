import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import MacroConfig from "./macroConfig.js";

const fragment = gql`
  fragment MacrosData on Macro {
    id
    name
    actions {
      id
      args
      event
      delay
    }
  }
`;

const QUERY = gql`
  query Macros {
    macros {
      ...MacrosData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription MacroUpdate {
    macrosUpdate {
      ...MacrosData
    }
  }
  ${fragment}
`;

const MacrosData = props => {
  return (
    <Query query={QUERY}>
      {({ loading, data, subscribeToMore }) => {
        const { macros } = data;
        if (loading || !macros) return null;
        return (
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: SUBSCRIPTION,
                updateQuery: (previousResult, { subscriptionData }) => {
                  return Object.assign({}, previousResult, {
                    macros: subscriptionData.data.macrosUpdate
                  });
                }
              })
            }
          >
            <MacroConfig {...props} macros={macros} />
          </SubscriptionHelper>
        );
      }}
    </Query>
  );
};

export default MacrosData;
