import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  enum HULL_PLATING_MODE {
    kinetic
    energy
    radiation
  }

  type HullPlating implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    upgradeName: String
    upgraded: Boolean
    extra: Boolean
    damage: Damage
    locations: [Room]
    stealthFactor: Float
    power: Power
    engaged: Boolean
    mode: HULL_PLATING_MODE
    pulse: Boolean
  }

  extend type Query {
    hullPlating(id: ID!): HullPlating
    hullPlatings(simulatorId: ID!): [HullPlating]
  }
  extend type Mutation {
    setHullPlatingMode(id: ID!, mode: HULL_PLATING_MODE): String
    setHullPlatingEngaged(id: ID!, engaged: Boolean): String
    setHullPlatingPulse(id: ID!, pulse: Boolean): String
  }
  extend type Subscription {
    hullPlatingUpdate(simulatorId: ID): [HullPlating!]!
  }
`;

const resolver = {
  HullPlating: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r),
      );
    },
  },
  Query: {
    hullPlating(rootValue, {id}) {
      const sys = App.systems.find(s => s.id === id);
      if (!sys) return App.dockingPorts.find(s => s.id === id);
      return sys;
    },
    hullPlatings(root, {simulatorId}) {
      let returnVal = App.systems.filter(s => s.type === "HullPlating");
      if (simulatorId) {
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      }
      return returnVal;
    },
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    hullPlatingUpdate: {
      resolve(rootValue, {simulatorId}) {
        let returnSystems = rootValue;
        if (simulatorId) {
          returnSystems = returnSystems.filter(
            s => s.simulatorId === simulatorId,
          );
        }
        return returnSystems;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("hullPlatingUpdate"),
        rootValue => !!(rootValue && rootValue.length),
      ),
    },
  },
};

export default {schema, resolver};
