import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type StationSet {
    id: ID
    name: String
    simulator: Simulator
    crewCount: Int
    stations: [Station]
  }

  type Station {
    name: String
    description: String
    training: String
    login: Boolean
    executive: Boolean
    messageGroups: [String]
    layout: String
    widgets: [String]
    cards: [Card]
  }

  type Card {
    name: String
    component: String
  }
  extend type Simulator {
    stationSets: [StationSet]
    stationSet: StationSet
  }
  extend type Query {
    stations: [StationSet]
    station(simulatorId: ID!, station: String!): Station
  }
  extend type Mutation {
    createStationSet(name: String!, simulatorId: ID!): String
    removeStationSet(stationSetID: ID!): String
    renameStationSet(stationSetID: ID!, name: String!): String
    setStationSetCrewCount(stationSetID: ID!, crewCount: Int!): String
    addStationToStationSet(stationSetID: ID!, stationName: String!): String
    removeStationFromStationSet(stationSetID: ID!, stationName: String!): String
    editStationInStationSet(
      stationSetID: ID!
      stationName: String!
      newStationName: String!
    ): String
    addCardToStation(
      stationSetID: ID!
      stationName: String!
      cardName: String!
      cardComponent: String!
      cardIcon: String
    ): String
    removeCardFromStation(
      stationSetID: ID!
      stationName: String!
      cardName: String!
    ): String
    editCardInStationSet(
      stationSetID: ID!
      stationName: String!
      cardName: String!
      newCardName: String
      cardComponent: String
      cardIcon: String
    ): String
    setStationLogin(
      stationSetID: ID!
      stationName: String!
      login: Boolean!
    ): String
    setStationLayout(
      stationSetID: ID!
      stationName: String!
      layout: String!
    ): String
    setStationExecutive(
      stationSetID: ID!
      stationName: String!
      exec: Boolean!
    ): String
    toggleStationWidgets(
      stationSetID: ID!
      stationName: String!
      widget: String!
      state: Boolean!
    ): String
    setStationDescription(
      stationSetID: ID!
      stationName: String!
      description: String!
    ): String
    setStationTraining(
      stationSetID: ID!
      stationName: String!
      training: String
    ): String
    reorderStationWidgets(
      stationSetId: ID!
      stationName: String!
      widget: String!
      order: Int!
    ): String
  }
  extend type Subscription {
    stationSetUpdate: [StationSet]
  }
`;

const resolver = {
  StationSet: {
    simulator(rootValue) {
      return App.simulators.find(s => s.id === rootValue.simulatorId);
    }
  },
  Query: {
    station: (root, { simulatorId, station }) => {
      const sim = App.simulators.find(s => s.id === simulatorId);
      if (!sim) return null;
      const { stations } = sim;
      if (!stations) return null;
      return stations.find(s => s.name === station);
    },

    stations() {
      return App.stationSets;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    stationSetUpdate: {
      resolve(rootValue) {
        return rootValue;
      },
      subscribe: () => pubsub.asyncIterator("stationSetUpdate")
    }
  }
};

export default { schema, resolver };
