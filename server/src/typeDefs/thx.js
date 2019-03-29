import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
import { StationResolver } from "../helpers/stationResolver";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type ThxClient {
    id: ID
    charge: Float
    lock: Boolean
    station: Station
    executive: Boolean
  }

  type Thx {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    damage: Damage
    power: Power
    stealthFactor: Float
    locations: [Room]

    activated: Boolean
    clients: [ThxClient]
  }
  extend type Query {
    thx(simulatorId: ID): [Thx]
  }
  extend type Mutation {
    chargeThx(id: ID!, clientId: ID!, charge: Float!): String
    lockThx(id: ID!, clientId: ID!): String
    activateThx(id: ID!): String
    deactivateThx(id: ID!): String
    resetThx(id: ID!): String
  }
  extend type Subscription {
    thxUpdate(simulatorId: ID): [Thx]
  }
`;

const resolver = {
  Thx: {
    clients(thx) {
      // Return clients from the simulator that are crew stations (not keyboards or sound players)
      const simulator = App.simulators.find(s => s.id === thx.simulatorId);
      const stations = simulator.stations.map(s => s.name);
      return App.clients
        .filter(
          c =>
            c.simulatorId === thx.simulatorId &&
            stations.indexOf(c.station) > -1
        )
        .map(c => {
          const client = thx.clients.find(cli => cli.id === c.id) || {
            charge: 0,
            lock: false
          };
          const station = simulator.stations.find(s => s.name === c.station);
          return { ...station, ...client, ...c };
        });
    }
  },
  ThxClient: {
    station: StationResolver
  },
  Query: {
    thx(root, { simulatorId }) {
      let returnVal = App.systems.filter(s => s.class === "Thx");
      if (simulatorId) {
        returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
      }
      return returnVal;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    thxUpdate: {
      resolve(rootValue, { simulatorId }) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("thxUpdate"),
        (rootValue, { simulatorId }) => {
          if (simulatorId) {
            return !!rootValue.find(s => s.simulatorId === simulatorId);
          }
          return true;
        }
      )
    }
  }
};

export default { schema, resolver };
