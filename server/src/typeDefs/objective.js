import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Objective {
    id: ID
    simulatorId: ID
    timestamp: String
    station: String
    title: String
    description: String
    completed: Boolean
    cancelled: Boolean
    crewComplete: Boolean
  }
  input ObjectiveInput {
    id: ID
    simulatorId: ID
    station: String
    title: String
    description: String
    completed: Boolean
    cancelled: Boolean
    crewComplete: Boolean
  }
  extend type Query {
    objective(simulatorId: ID): [Objective]
  }
  extend type Mutation {
    """
    Macro: Objective: Add Objective
    """
    addObjective(objective: ObjectiveInput!): String
    """
    Macro: Objective: Complete Objective
    """
    completeObjective(
      id: ID!
      title: String
      state: Boolean
      cancel: Boolean
    ): String
    objectiveSetCrewComplete(id: ID!, crewComplete: Boolean!): String
  }
  extend type Subscription {
    objectiveUpdate(simulatorId: ID): [Objective]
  }
`;

const resolver = {
  Query: {
    objective(root, { simulatorId }) {
      let returnVal = App.objectives;
      if (simulatorId) {
        returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
      }
      return returnVal;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    objectiveUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          return rootValue.filter(s => s.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("objectiveUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
