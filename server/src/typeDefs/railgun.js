import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Railgun implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    power: Power
    name: String
    displayName: String
    stealthFactor: Float
    heat: Float
    damage: Damage
    coolant: Float
    locations: [Room]

    availableAmmo: Int
    maxAmmo: Int
    ammo: Int
  }
  extend type Query {
    railgun(simulatorId: ID): [Railgun]
  }
  extend type Mutation {
    setRailgunAmmo(id: ID!, ammo: Int): String
    setRailgunMaxAmmo(id: ID!, ammo: Int!): String
    setRailgunAvailableAmmo(id: ID!, ammo: Int!): String
    fireRailgun(id: ID!, simulatorId: ID!, contactId: ID): String
    loadRailgun(id: ID!): String
  }
  extend type Subscription {
    railgunUpdate(simulatorId: ID): [Railgun]
  }
`;

const resolver = {
  Query: {
    railgun(root, { simulatorId }) {
      let returnVal = App.systems.filter(s => s.type === "Railgun");
      if (simulatorId)
        returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
      return returnVal;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    railgunUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          return rootValue.filter(s => s.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("railgunUpdate"),
        (rootValue, { simulatorId }) => {
          if (simulatorId) {
            return (
              rootValue.filter(s => s.simulatorId === simulatorId).length > 0
            );
          }
          return rootValue.length;
        }
      )
    }
  }
};

export default { schema, resolver };
