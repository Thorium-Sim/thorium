import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Shield implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    stealthFactor: Float
    heat: Float
    coolant: Float
    position: Int
    power: Power
    frequency: Float
    state: Boolean
    integrity: Float
    damage: Damage
    locations: [Room]
  }

  extend type Query {
    shields(simulatorId: ID): [Shield]
  }
  extend type Mutation {
    shieldRaised(id: ID!): String
    shieldLowered(id: ID!): String
    shieldIntegritySet(id: ID!, integrity: Float): String
    shieldFrequencySet(id: ID!, frequency: Float): String
    #Macro: Shields: Hit all shields
    hitShields(id: ID, simulatorId: ID): String
    restoreShields(simulatorId: ID): String
  }
  extend type Subscription {
    shieldsUpdate(simulatorId: ID): [Shield]
  }
`;

// We define all of the resolvers necessary for
// the functionality in this file. These will be
// deep merged with the other resolvers.
const resolver = {
  Shield: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    }
  },
  Query: {
    shields(root, { simulatorId }) {
      return App.systems.filter(system => {
        return system.type === "Shield" && system.simulatorId === simulatorId;
      });
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    shieldsUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId)
          return rootValue.filter(s => s.simulatorId === simulatorId);
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("shieldsUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
