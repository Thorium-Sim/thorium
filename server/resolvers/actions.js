import App from "../../app";
import { pubsub } from "../helpers/subscriptionManager.js";

export const ActionsQueries = {
  actions() {
    // Return nothing, because we don't care about the query
    return {};
  }
};

// We aren't going to log these as events
export const ActionsMutations = {
  triggerAction(root, args, context) {
    // In some cases, we need to change the client
    switch (args.action) {
      case "online":
        App.clients
          .filter(
            c =>
              (c.simulatorId === args.simulatorId &&
                (c.station === args.stationId || args.stationId === "all")) ||
              c.id === args.clientId
          )
          .forEach(c =>
            App.handleEvent({ client: c.id, state: null }, "clientOfflineState")
          );
        break;
      case "blackout":
      case "offline":
      case "power":
      case "lockdown":
      case "maintenance":
        App.clients
          .filter(
            c =>
              (c.simulatorId === args.simulatorId &&
                (c.station === args.stationId || args.stationId === "all")) ||
              c.id === args.clientId
          )
          .forEach(c =>
            App.handleEvent(
              { client: c.id, state: args.action },
              "clientOfflineState"
            )
          );
        break;
      default:
        pubsub.publish("actionsUpdate", args, context);
        break;
    }
  }
};

export const ActionsSubscriptions = {
  actionsUpdate(
    {
      action,
      simulatorId: toSimulator,
      stationId: toStation,
      clientId: toClient,
      duration
    },
    { simulatorId, stationId, clientId }
  ) {
    if (simulatorId !== toSimulator) return;
    if (
      toStation === "all" ||
      toClient === "all" ||
      (toStation === stationId && toStation && stationId) ||
      (toClient === clientId && toClient && clientId)
    ) {
      return { action, duration };
    }
  }
};
