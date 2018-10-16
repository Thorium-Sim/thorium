import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Conversations from "./conversations";

const queryData = `
id
sender
content
timestamp
simulatorId
destination`;
const MESSAGING_QUERY = gql`
query Messages($simulatorId: ID!) {
  messages(simulatorId: $simulatorId) {
${queryData}
  }
  teams(simulatorId: $simulatorId) {
    id
    name
    type
  }
}
`;

const MESSAGING_SUB = gql`
  subscription GotMessage($simulatorId: ID!) {
    sendMessage(simulatorId: $simulatorId) {
      ${queryData}
    }
  }
`;

const TEAMS_SUB = gql`
  subscription TeamsUpdate($simulatorId: ID) {
    teamsUpdate(simulatorId: $simulatorId) {
      id
      name
      type
    }
  }
`;

const MessagingData = props => (
  <Query
    query={MESSAGING_QUERY}
    variables={{ simulatorId: props.simulator.id }}
  >
    {({ loading, data, subscribeToMore }) => {
      const { messages, teams } = data;
      if (loading || !messages || !teams) return null;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: MESSAGING_SUB,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                if (!subscriptionData.data.sendMessage) return previousResult;
                const data = Object.assign({}, previousResult, {
                  messages: previousResult.messages.find(
                    m => m.id === subscriptionData.data.sendMessage.id
                  )
                    ? previousResult.messages
                    : previousResult.messages.concat(
                        subscriptionData.data.sendMessage
                      )
                });
                return data;
              }
            })
          }
        >
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: TEAMS_SUB,
                variables: {
                  simulatorId: props.simulator.id
                },
                updateQuery: (previousResult, { subscriptionData }) => {
                  return Object.assign({}, previousResult, {
                    teams: subscriptionData.data.teamsUpdate
                  });
                }
              })
            }
          />
          <div
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Conversations {...props} messages={messages} teams={teams} />
          </div>
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default MessagingData;
