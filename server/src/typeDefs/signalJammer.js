import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type SignalJammer implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    damage: Damage
    power: Power
    stealthFactor: Float
    active: Boolean
    level: Float
    strength: Float
    signals: [Signal]
    locations: [Room]
  }

  type Signal {
    id: ID
    type: String
    level: Float
    power: Float
  }
  input SignalJammerInput {
    id: ID
    active: Boolean
    level: Float
    strength: Float
  }
  extend type Query {
    signalJammers(simulatorId: ID!): [SignalJammer]
  }
  extend type Mutation {
    updateSignalJammer(jammer: SignalJammerInput!): String
    """
    Macro: Signal Jammer: Set Signal
    """
    signalJammerSignals(id: ID!, type: String!, signals: Int!): String
    fluxSignalJammer(id: ID): String
  }
  extend type Subscription {
    signalJammersUpdate(simulatorId: ID!): [SignalJammer]
  }
`;

const resolver = {
  SignalJammer: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    }
  },
  Query: {
    signalJammers(root, { simulatorId }) {
      return App.systems.filter(
        s => s.class === "SignalJammer" && s.simulatorId === simulatorId
      );
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    signalJammersUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId)
          return rootValue.filter(s => s.simulatorId === simulatorId);
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("signalJammersUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
