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
  type MacroButtonConfig {
    id: ID
    name: String
    buttons: [MacroButton]
  }
  type MacroButton {
    id: ID
    name: String
    actions: [MacroAction]
    color: NotifyColors
    category: String
  }
  extend type Query {
    macros: [Macro]
    macroButtons: [MacroButtonConfig]
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

    addMacroButtonConfig(name: String!): ID
    removeMacroButtonConfig(id: ID!): String
    renameMacroButtonConfig(id: ID!, name: String!): String
    addMacroButton(configId: ID!, name: String!): String
    removeMacroButton(configId: ID!, id: ID!): String
    renameMacroButton(configId: ID!, id: ID!, name: String!): String
    setMacroButtonCategory(configId: ID!, id: ID!, category: String!): String
    setMacroButtonColor(configId: ID!, id: ID!, color: NotifyColors!): String
    updateMacroButtonActions(
      configId: ID!
      id: ID!
      actions: [ActionInput]
    ): String

    triggerMacroButton(simulatorId: ID!, configId: ID!, buttonId: ID!): String
  }
  extend type Subscription {
    macrosUpdate: [Macro]
    macroButtonsUpdate: [MacroButtonConfig]
  }
`;

const resolver = {
  Query: {
    macros(root) {
      let returnVal = App.macros;
      return returnVal;
    },
    macroButtons(root) {
      let returnVal = App.macroButtonConfigs;
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
    },
    macroButtonsUpdate: {
      resolve(rootQuery) {
        return rootQuery;
      },
      subscribe: () => pubsub.asyncIterator("macroButtonsUpdate")
    }
  }
};

export default { schema, resolver };
