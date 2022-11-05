import React from "react";
import {Query} from "@apollo/client/react/components";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import MacroConfig from "./macroConfig";

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
      {({loading, data, subscribeToMore}) => {
        if (loading || !data) return null;
        const {macroButtons} = data;
        return (
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: SUBSCRIPTION,
                updateQuery: (previousResult, {subscriptionData}) => {
                  return Object.assign({}, previousResult, {
                    macroButtons: subscriptionData.data.macroButtonsUpdate,
                  });
                },
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
