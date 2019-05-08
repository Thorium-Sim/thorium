import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Macro {
    id: ID
    name: String
    actions: [MacroAction]
  }
  extend type Query {
    macros(simulatorId: ID): [Macro]
  }
  extend type Mutation {
    addMacro(name: String!): String
    removeMacro(id: ID!): String
    renameMacro(id: ID!, name: String!): String
    updateMacroActions(id: ID!, actions: [ActionInput]): String
    """
    Macro: Macros: Trigger Macro
    """
    triggerMacroAction(simulatorId: ID!, macroId: ID!): String
  }
  extend type Subscription {
    macrosUpdate(simulatorId: ID): [Macro]
  }
`;

const resolver = {
  Query: {
    macros(root) {
      let returnVal = App.macros;
      return returnVal;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    macrosUpdate: {
      resolve(rootQuery) {
        return rootQuery;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("macroUpdate"),
        (rootValue, args) => {
          return true;
        }
      )
    }
  }
};

export default { schema, resolver };
