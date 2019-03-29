import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Keyboard {
    id: ID
    name: String
    keys: [KeyboardKey]
  }

  type KeyboardKey {
    id: ID
    key: String
    meta: [String]
    actions: [KeyActions]
  }

  input KeyboardKeyInput {
    id: ID
    key: String
    meta: [String]
    actions: [KeyActionInput]
  }
  type KeyActions {
    id: ID
    event: String
    args: String
    delay: Int
  }

  input KeyActionInput {
    id: ID
    event: String
    args: String
    delay: Int
  }
  extend type Query {
    keyboard: [Keyboard]
  }
  extend type Mutation {
    addKeyboard(name: String!): String
    removeKeyboard(id: ID!): String
    renameKeyboard(id: ID!, name: String!): String
    updateKeyboardKey(id: ID!, key: KeyboardKeyInput!): String
    triggerKeyboardAction(
      simulatorId: ID!
      id: ID!
      key: String!
      meta: [String]!
    ): String
  }
  extend type Subscription {
    keyboardUpdate: [Keyboard]
  }
`;

const resolver = {
  Query: {
    keyboard() {
      return App.keyboards;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    keyboardUpdate: {
      resolve(rootValue) {
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("keyboardUpdate"),
        rootValue => !!rootValue
      )
    }
  }
};

export default { schema, resolver };
