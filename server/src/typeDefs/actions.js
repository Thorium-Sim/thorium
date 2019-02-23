import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Action {
    action: String
    message: String
    voice: String
    duration: Float
  }
  extend type Query {
    actions(stationId: ID, clientId: ID): Action
  }
  extend type Mutation {
    #Macro: Actions: Trigger Action (eg. Flash, Blackout, etc.)
    triggerAction(
      action: String!
      message: String
      voice: String
      simulatorId: ID!
      stationId: String
      clientId: ID
      duration: Float
    ): String
  }
  extend type Subscription {
    actionsUpdate(simulatorId: ID!, stationId: ID, clientId: ID): Action
  }
`;

const resolver = {
  Query: {
    actions() {
      // Return nothing, because we don't care about the query
      return {};
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    actionsUpdate: {
      resolve(rootQuery) {
        const { action, duration, message, voice } = rootQuery;
        return { action, duration, message, voice };
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("actionsUpdate"),
        (rootValue, { simulatorId, stationId, clientId }) => {
          const {
            simulatorId: toSimulator,
            stationId: toStation,
            clientId: toClient,
            clients,
            stations
          } = rootValue;
          if (simulatorId !== toSimulator) return false;
          if (
            toStation === "all" ||
            toClient === "all" ||
            stations.indexOf(stationId) > -1 ||
            clients.indexOf(clientId) > -1
          ) {
            return true;
          }
          return false;
        }
      )
    }
  }
};

export default { schema, resolver };
