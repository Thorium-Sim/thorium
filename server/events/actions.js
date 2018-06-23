import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";
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
    case "borg":
    case "soviet":
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
    case "message":
      const stations = [];
      if (args.stationId !== "all") {
        stations.push(args.stationId);
      } else {
        const sim = App.simulators.find(s => s.id === args.simulatorId);
        sim.stations.forEach(s => stations.push(s.name));
      }
      stations.forEach(s => {
        pubsub.publish("notify", {
          id: uuid.v4(),
          simulatorId: args.simulatorId,
          station: s,
          title: args.message,
          body: "",
          color: "info"
        });
      });
      break;
    default:
      pubsub.publish("actionsUpdate", args);
      break;
  }
});
