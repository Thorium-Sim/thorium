import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type StealthField {
    id: ID
    simulatorId: ID
    type: String
    power: Power
    damage: Damage
    name: String
    displayName: String
    activated: Boolean
    charge: Boolean
    changeAlert: Boolean
    state: Boolean
    quadrants: StealthQuad
    locations: [Room]
  }

  type StealthQuad {
    fore: Float
    aft: Float
    port: Float
    starboard: Float
  }
  extend type Query {
    stealthField(simulatorId: ID): [StealthField]
    stealth(id: ID!): StealthField
  }
  extend type Mutation {
    setStealthActivated(id: ID, state: Boolean): String
    setStealthCharge(id: ID, state: Boolean): String
    activateStealth(id: ID): String
    deactivateStealth(id: ID): String
    setStealthQuadrant(id: ID, which: String, value: Float): String
    fluxStealthQuadrants(id: ID): String
    stealthChangeAlert(id: ID!, change: Boolean!): String
  }
  extend type Subscription {
    stealthFieldUpdate(simulatorId: ID): [StealthField]
  }
`;

const resolver = {
  StealthField: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    }
  },
  Query: {
    stealthField(root, { simulatorId }) {
      let returnVal = App.systems.filter(s => s.type === "StealthField");
      if (simulatorId) {
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      }
      return returnVal;
    },
    stealth(root, { id }) {
      return App.systems.find(s => s.id === id);
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    stealthFieldUpdate: {
      resolve(rootValue, { simulatorId }) {
        let returnRes = rootValue;
        if (simulatorId)
          returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
        return returnRes;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("stealthFieldUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
