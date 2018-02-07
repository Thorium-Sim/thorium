import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

App.on("triggerAction", args => {
  args.stationId = args.stationId || "all";
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
      pubsub.publish("actionsUpdate", args);
      break;
  }
});
