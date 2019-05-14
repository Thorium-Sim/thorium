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
    macros: [Macro]
  }
  extend type Mutation {
    addMacro(name: String!): ID
    removeMacro(id: ID!): String
    renameMacro(id: ID!, name: String!): String
    updateMacroActions(id: ID!, actions: [ActionInput]): String
    """
    Macro: Macros: Trigger Macro
    """
    triggerMacroAction(simulatorId: ID!, macroId: ID!): String
  }
  extend type Subscription {
    macrosUpdate: [Macro]
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
      subscribe: () => pubsub.asyncIterator("macrosUpdate")
    }
  }
};

export default { schema, resolver };
