import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import CommandLineConfig from "./commandLineConfig";

const queryData = `
id
name
components
connections
config
values
`;

const QUERY = gql`
  query CommandLine {
    commandLine {
${queryData}
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription CommandLineUpdate {
    commandLineUpdate {
${queryData}
    }
  }
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
