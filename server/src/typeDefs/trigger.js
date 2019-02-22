import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Trigger {
    id: ID
    name: String
    components: JSON
    connections: JSON
    values: JSON
    config: JSON
  }
  extend type Query {
    triggers(simulatorId: ID): [Trigger]
  }
  extend type Mutation {
    addTrigger(name: String!): String
    renameTrigger(id: ID!, name: String!): String
    removeTrigger(id: ID!): String
    updateTrigger(
      id: ID!
      components: JSON
      connections: JSON
      values: JSON
      config: JSON
    ): String

    #Macro: Triggers: Add trigger to simulator
    addTriggerToSimulator(simulatorId: ID!, trigger: ID!): String

    #Macro: Triggers: Remove trigger to simulator
    removeTriggerFromSimulator(simulatorId: ID!, trigger: ID!): String
  }
  extend type Subscription {
    triggersUpdate(simulatorId: ID): [Trigger]
  }
`;

// We define all of the resolvers necessary for
// the functionality in this file. These will be
// deep merged with the other resolvers.
const resolver = {
  Query: {
    triggers(root, { simulatorId }) {
      let returnVal = App.triggerGroups;
      if (simulatorId) {
        returnVal.filter(c => c.simulatorId === simulatorId);
      } else {
        returnVal = returnVal.filter(c => !c.simulatorId);
      }
      return returnVal;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    triggersUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          return rootValue.filter(c => c.simulatorId === simulatorId);
        }
        return rootValue.filter(c => !c.simulatorId);
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("triggersUpdate"),
        (rootValue, { simulatorId }) => {
          if (simulatorId)
            return rootValue.find(c => c.simulatorId === simulatorId);
          return true;
        }
      )
    }
  }
};

export default { schema, resolver };
