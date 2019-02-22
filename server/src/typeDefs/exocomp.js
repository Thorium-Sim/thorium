import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Exocomp {
    id: ID
    simulatorId: ID
    class: String
    state: String
    completion: Float
    parts: [String]
    # Destination refers to a system
    destination: System
    logs: [ExocompLog]
    difficulty: Float
  }

  type ExocompLog {
    timestamp: Float
    message: String
  }

  input ExocompInput {
    id: ID
    simulatorId: ID
    parts: [String]
    # Destination refers to a system
    destination: ID
  }
  extend type Query {
    exocomps(simulatorId: ID): [Exocomp]
  }
  extend type Mutation {
    setSimulatorExocomps(simulatorId: ID!, count: Int!): String
    deployExocomp(exocomp: ExocompInput!): String
    recallExocomp(exocomp: ID!): String
    updateExocompDifficulty(exocomp: ID!, difficulty: Float!): String
  }
  extend type Subscription {
    exocompsUpdate(simulatorId: ID!): [Exocomp]
  }
`;

const resolver = {
  Exocomp: {
    destination(exocomp) {
      return App.systems.find(s => s.id === exocomp.destination);
    }
  },
  Query: {
    exocomps(rootValue, { simulatorId }) {
      if (simulatorId) {
        return App.exocomps.filter(s => s.simulatorId === simulatorId);
      }
      return App.exocomps;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    exocompsUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          return rootValue.filter(s => s.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("exocompsUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
