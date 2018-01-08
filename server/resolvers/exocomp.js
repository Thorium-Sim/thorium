import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const ExocompQueries = {
  exocomps(rootValue, { simulatorId }) {
    if (simulatorId) {
      return App.exocomps.filter(s => s.simulatorId === simulatorId);
    }
    return App.exocomps;
  }
};

export const ExocompMutations = {
  setSimulatorExocomps(rootValue, args, context) {
    App.handleEvent(args, "setSimulatorExocomps", context);
  },
  deployExocomp(rootValue, args, context) {
    App.handleEvent(args, "deployExocomp", context);
  },
  recallExocomp(rootValue, args, context) {
    App.handleEvent(args, "recallExocomp", context);
  }
};

export const ExocompSubscriptions = {
  exocompsUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("exocompsUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};

export const ExocompTypes = {
  Exocomp: {
    destination(exocomp) {
      return App.systems.find(s => s.id === exocomp.destination);
    }
  }
};
