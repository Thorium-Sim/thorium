import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Log {
    id: ID
    clientId: ID
    flightId: ID
    simulatorId: ID
    timestamp: String
    log: String
  }

  input LogInput {
    clientId: ID
    flightId: ID
    simulatorId: ID
    timestamp: String
    log: String
  }
  extend type Query {
    officerLogs(clientId: ID, flightId: ID!): [Log]
    shipLogs(simulatorId: ID!): [Log]
  }
  extend type Mutation {
    addLog(log: LogInput): String
  }
  extend type Subscription {
    officerLogsUpdate(clientId: ID, flightId: ID!): [Log]
    shipLogsUpdate(simulatorId: ID!): [Log]
  }
`;

const resolver = {
  Query: {
    officerLogs(rootValue, {clientId, flightId}) {
      if (!clientId) {
        return App.officerLogs.filter(l => l.flightId === flightId);
      }
      return App.officerLogs.filter(
        l => l.clientId === clientId && l.flightId === flightId,
      );
    },
    shipLogs(rootValue, {simulatorId}) {
      return App.officerLogs.filter(l => l.simulatorId === simulatorId);
    },
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    officerLogsUpdate: {
      resolve(rootValue, {clientId, flightId}) {
        if (!clientId) {
          return rootValue.filter(l => l.flightId === flightId);
        }
        return rootValue.filter(
          l => l.clientId === clientId && l.flightId === flightId,
        );
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("officerLogsUpdate"),
        rootValue => !!(rootValue && rootValue.length),
      ),
    },
    shipLogsUpdate: {
      resolve(rootValue, {simulatorId}) {
        return rootValue.filter(l => l.simulatorId === simulatorId);
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("shipLogsUpdate"),
        rootValue => !!(rootValue && rootValue.length),
      ),
    },
  },
};

export default {schema, resolver};
