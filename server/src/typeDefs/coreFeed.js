import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type CoreFeed {
    id: ID
    simulatorId: ID
    component: String
    ignored: Boolean
    timestamp: String
    title: String
    body: String
    color: String
  }
  type Timer {
    time: String
    active: Boolean
  }
  extend type Query {
    coreFeed(simulatorId: ID): [CoreFeed]
  }
  extend type Mutation {
    ignoreCoreFeed(id: ID): String
    #Macro: Core: Set a timer on core (requires sync time enabled)
    syncTimer(time: String, active: Boolean, simulatorId: ID!): String
  }
  extend type Subscription {
    coreFeedUpdate(simulatorId: ID): [CoreFeed]
    syncTime(simulatorId: ID!): Timer
  }
`;

const resolver = {
  Query: {
    coreFeed(rootValue, { simulatorId }) {
      let returnValue = App.coreFeed;
      if (simulatorId) {
        returnValue = returnValue.filter(r => r.simulatorId === simulatorId);
      }
      return returnValue;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    coreFeedUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          rootValue = rootValue.filter(r => r.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("coreFeedUpdate"),
        (rootValue, { simulatorId }) => {
          if (simulatorId) {
            return !!rootValue.find(r => r.simulatorId === simulatorId);
          }
          return true;
        }
      )
    },
    syncTime: {
      resolve(rootValue) {
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("syncTime"),
        (rootValue, { simulatorId }) => {
          if (rootValue.simulatorId === simulatorId) {
            return true;
          }
          return false;
        }
      )
    }
  }
};

export default { schema, resolver };
