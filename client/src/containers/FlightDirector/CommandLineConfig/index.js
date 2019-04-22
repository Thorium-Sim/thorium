import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import CommandLineConfig from "./commandLineConfig";

const fragment = gql`
  fragment CommandLineData on CommandLine {
    id
    name
    components
    connections
    config
    values
  }
`;

const QUERY = gql`
  query CommandLine {
    commandLine {
      ...CommandLineData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription CommandLineUpdate {
    commandLineUpdate {
      ...CommandLineData
    }
  }
  ${fragment}
`;

class CommandLineData extends Component {
  state = {};
  render() {
    return (
      <Query query={QUERY}>
        {({ loading, data, subscribeToMore }) => {
          const { commandLine } = data;
          if (loading || !commandLine) return null;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  updateQuery: (previousResult, { subscriptionData }) => {
                    return Object.assign({}, previousResult, {
                      commandLine: subscriptionData.data.commandLineUpdate
                    });
                  }
                })
              }
            >
              <CommandLineConfig {...this.props} commandLines={commandLine} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}

export default CommandLineData;
