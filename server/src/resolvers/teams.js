import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";
import {
  partsList,
  damagePositions
} from "../classes/generic/damageReports/constants.js";

export const TeamsQueries = {
  teams(root, { simulatorId, type }) {
    // Get the simulator
    let returnVal = App.teams;
    if (type) {
      returnVal = returnVal.filter(t => t.type === type);
    }
    if (simulatorId) {
      returnVal = returnVal.filter(t => t.simulatorId === simulatorId);
    }
    return returnVal;
  },
  exocompParts() {
    return partsList;
  },
  damagePositions() {
    return damagePositions;
  }
};

export const TeamsMutations = {
  createTeam(root, params) {
    App.handleEvent(params, "createTeam");
  },
  updateTeam(root, params) {
    App.handleEvent(params, "updateTeam");
  },
  addCrewToTeam(root, params) {
    App.handleEvent(params, "addCrewToTeam");
  },
  removeCrewFromTeam(root, params) {
    App.handleEvent(params, "removeCrewFromTeam");
  },
  removeTeam(root, params) {
    App.handleEvent(params, "removeTeam");
  }
};

export const TeamsSubscriptions = {
  teamsUpdate: {
    resolve(rootValue, { simulatorId, type }) {
      // Get the simulator
      let returnVal = rootValue;
      if (type) {
        returnVal = returnVal.filter(t => t.type === type);
      }
      if (simulatorId) {
        returnVal = returnVal.filter(t => t.simulatorId === simulatorId);
      }
      return returnVal;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("teamsUpdate"),
      (rootValue, { simulatorId, type }) => true
    )
  }
};

export const TeamsTypes = {
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
  }
};
