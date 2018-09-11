import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";
export const ActionsQueries = {
  actions() {
    // Return nothing, because we don't care about the query
    return {};
  }
};

// We aren't going to log these as events
export const ActionsMutations = {
  triggerAction(root, args, context) {
    App.handleEvent(args, "triggerAction", context);
  }
};

export const ActionsSubscriptions = {
  actionsUpdate: {
    resolve(rootQuery) {
      const { action, duration, message, voice } = rootQuery;
      return { action, duration, message, voice };
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("actionsUpdate"),
      (rootValue, { simulatorId, stationId, clientId }) => {
        const {
          simulatorId: toSimulator,
          stationId: toStation,
          clientId: toClient,
          clients,
          stations
        } = rootValue;
        if (simulatorId !== toSimulator) return false;
        if (
          toStation === "all" ||
          toClient === "all" ||
          stations.indexOf(toStation) > -1 ||
          clients.indexOf(toClient)
        ) {
          return true;
        }
        return false;
      }
    )
  }
};
