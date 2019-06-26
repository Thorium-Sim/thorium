import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Torpedo implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    power: Power
    damage: Damage
    #List torpedos take a list of warheads
    inventory: [Warhead]
    loaded: ID
    #One of 'idle', 'loaded', 'fired'
    state: String
    stealthFactor: Float
    locations: [Room]
  }

  type Warhead {
    id: ID
    type: String
    #TODO Change probe to be a probe type
    probe: Probe
  }

  input WarheadInput {
    type: String
    probe: ID
  }

  extend type Query {
    torpedos(simulatorId: ID): [Torpedo]
    torpedo(id: ID!): Torpedo
  }
  extend type Mutation {
    torpedoAddWarhead(id: ID!, warhead: WarheadInput!): String
    torpedoRemoveWarhead(id: ID!, warheadId: ID!): String
    torpedoLoadWarhead(id: ID!, warheadId: ID!): String
    torpedoSetWarheadCount(id: ID!, warheadType: String!, count: Int!): String
    torpedoUnload(id: ID!): String
    torpedoFire(id: ID!): String
  }
  extend type Subscription {
    torpedosUpdate(simulatorId: ID): [Torpedo]
  }
`;

const resolver = {
  Torpedo: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    },
    inventory(rootValue, args, context) {
      context.simulatorId = rootValue.simulatorId;
      return rootValue.inventory;
    }
  },
  Warhead: {
    probe(w, args, { simulatorId }) {
      if (!w.probe) return;
      const probes = App.systems.find(
        s => s.simulatorId === simulatorId && s.type === "Probes"
      );
      if (probes) {
        return probes.probes.find(p => p.id === w.probe);
      }
    }
  },
  Query: {
    torpedos(root, { simulatorId }) {
      let returnVal = App.systems.filter(s => s.type === "Torpedo");
      if (simulatorId) {
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      }
      return returnVal;
    },
    torpedo(root, { id }) {
      return App.systems.find(s => s.id === id);
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    torpedosUpdate: {
      resolve(rootValue, { simulatorId }) {
        let returnRes = rootValue;
        if (simulatorId)
          returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
        return returnRes;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("torpedosUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
