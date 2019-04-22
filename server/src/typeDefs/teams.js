import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
import {
  partsList,
  damagePositions
} from "../classes/generic/damageReports/constants.js";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Team {
    id: ID
    type: TEAM_TYPES
    simulatorId: ID
    name: String
    priority: PRIORITIES
    location: Location
    orders: String
    officers: [Crew]
    cleared: Boolean
  }

  input TeamInput {
    id: ID
    type: TEAM_TYPES
    simulatorId: ID
    name: String
    priority: PRIORITIES
    location: String
    orders: String
    officers: [ID]
  }
  enum TEAM_TYPES {
    security
    damage
    medical
  }
  enum PRIORITIES {
    low
    normal
    critical
    emergency
  }

  extend type Query {
    teams(simulatorId: ID, type: String, cleared: Boolean): [Team]
    damagePositions: [String]
    exocompParts: [String]
  }
  extend type Mutation {
    createTeam(team: TeamInput!): String
    updateTeam(team: TeamInput!): String
    addCrewToTeam(teamId: ID!, crewId: ID!): String
    removeCrewFromTeam(teamId: ID!, crewId: ID!): String
    removeTeam(teamId: ID!): String
  }
  extend type Subscription {
    teamsUpdate(simulatorId: ID, type: String, cleared: Boolean): [Team]
  }
`;

const resolver = {
  Team: {
    location(team) {
      const deck = App.decks.find(d => d.id === team.location);
      if (deck) {
        return deck;
      }
      return App.rooms.find(r => r.id === team.location);
    },
    officers(team) {
      return team.officers.map(t => App.crew.find(c => c.id === t));
    }
  },
  Query: {
    teams(root, { simulatorId, type, cleared }) {
      // Get the simulator
      let returnVal = App.teams;
      if (type) {
        returnVal = returnVal.filter(t => t.type === type);
      }
      if (simulatorId) {
        returnVal = returnVal.filter(t => t.simulatorId === simulatorId);
      }
      if (cleared) return returnVal;
      return returnVal.filter(t => t.cleared === false);
    },
    exocompParts() {
      return partsList;
    },
    damagePositions() {
      return damagePositions;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    teamsUpdate: {
      resolve(rootValue, { simulatorId, type, cleared }) {
        // Get the simulator
        let returnVal = rootValue;
        if (type) {
          returnVal = returnVal.filter(t => t.type === type);
        }
        if (simulatorId) {
          returnVal = returnVal.filter(t => t.simulatorId === simulatorId);
        }
        if (cleared) return returnVal;
        return returnVal.filter(c => !c.cleared);
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("teamsUpdate"),
        (rootValue, { simulatorId, type }) => true
      )
    }
  }
};

export default { schema, resolver };
