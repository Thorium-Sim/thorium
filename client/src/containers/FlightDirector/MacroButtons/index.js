import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import MacroConfig from "./macroConfig.js";

const fragment = gql`
  fragment MacrosButtonData on MacroButtonConfig {
    id
    name
    buttons {
      id
      name
      color
      category
      actions {
        id
        args
        event
        delay
      }
    }
  }
`;

const QUERY = gql`
  query Macros {
    macroButtons {
      ...MacrosButtonData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription MacroUpdate {
    macroButtonsUpdate {
      ...MacrosButtonData
    }
  }
  ${fragment}
`;

const MacrosData = props => {
  return (
    <Query query={QUERY}>
      {({ loading, data, subscribeToMore }) => {
        const { macroButtons } = data;
        if (loading || !macroButtons) return null;
        return (
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: SUBSCRIPTION,
                updateQuery: (previousResult, { subscriptionData }) => {
                  return Object.assign({}, previousResult, {
                    macroButtons: subscriptionData.data.macroButtonsUpdate
                  });
                }
              })
            }
          >
            <MacroConfig {...props} macros={macroButtons} />
          </SubscriptionHelper>
        );
      }}
    </Query>
  );
};

export default MacrosData;
