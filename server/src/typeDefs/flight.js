import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Flight {
    id: ID
    name: String
    date: String
    running: Boolean
    timelineStep: Int
    simulators: [Simulator]
    flightType: String
    clients: [SpaceEdventuresClient]
  }

  type SpaceEdventuresClient {
    id: ID
    token: String
    name: String
    email: String
  }
  extend type Query {
    flights(running: Boolean, id: ID): [Flight]
    events: [String]
  }
  extend type Mutation {
    startFlight(
      name: String
      simulators: [SimulatorInput!]!
      flightType: String
    ): String
    """
    Macro: Flight: Reset Flight
    """
    resetFlight(flightId: ID!, full: Boolean): String
    deleteFlight(flightId: ID!): String
    pauseFlight(flightId: ID!): String
    resumeFlight(flightId: ID!): String

    # Space EdVentures
    clientAddExtra(flightId: ID!, simulatorId: ID!, name: String!): String
  }
  extend type Subscription {
    flightsUpdate(id: ID): [Flight]
  }
`;

const resolver = {
  Flight: {
    date(rootValue) {
      const date = new Date(rootValue.date);
      return date.toISOString();
    },
    simulators(rootValue) {
      return rootValue.simulators.map(s =>
        App.simulators.find(sim => sim.id === s)
      );
    }
  },
  Query: {
    events: () => {
      return Object.keys(App._events);
    },
    flights(root, { running, id }) {
      let returnRes = App.flights;
      if (running) {
        returnRes = returnRes.filter(f => f.running);
      }
      if (id) {
        returnRes = returnRes.filter(f => f.id === id);
      }
      return returnRes;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    flightsUpdate: {
      resolve(payload, { id }) {
        if (id) return payload.filter(s => s.id === id);
        return payload;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("flightsUpdate"),
        rootValue => {
          return !!rootValue;
        }
      )
    }
  }
};

export default { schema, resolver };
