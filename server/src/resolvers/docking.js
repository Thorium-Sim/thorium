import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const DockingQueries = {
  docking(rootValue, { id, simulatorId, type }) {
    let dockingPorts = App.dockingPorts;
    if (id) {
      return dockingPorts.filter(d => d.id === id);
    }
    if (simulatorId) {
      dockingPorts = dockingPorts.filter(d => d.simulatorId === simulatorId);
    }
    if (type) {
      dockingPorts = dockingPorts.filter(d => d.type === type);
    }
    return dockingPorts;
  }
};

export const DockingMutations = {
  createDockingPort(rootValue, params, context) {
    App.handleEvent(params, "createDockingPort", context);
  },
  updateDockingPort(rootValue, params, context) {
    App.handleEvent(params, "updateDockingPort", context);
  },
  removeDockingPort(rootValue, params, context) {
    App.handleEvent(params, "removeDockingPort", context);
  }
};

export const DockingSubscriptions = {
  dockingUpdate: {
    resolve(rootValue, { id, simulatorId, type }) {
      let dockingPorts = rootValue;
      if (id) {
        return dockingPorts.filter(d => d.id === id);
      }
      if (simulatorId) {
        dockingPorts = dockingPorts.filter(d => d.simulatorId === simulatorId);
      }
      if (type) {
        dockingPorts = dockingPorts.filter(d => d.type === type);
      }
      return dockingPorts.length && dockingPorts;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("dockingUpdate"),
      rootValue => {
        return !!(rootValue && rootValue.length);
      }
    )
  }
};
export const DockingTypes = {
  DockingPort: {
    deck: port => {
      return App.decks.find(d => d.id === port.deckId);
    }
  }
};
