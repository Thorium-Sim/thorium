import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

App.on("addLog", ({ log }) => {
  App.officerLogs.push(new Classes.OfficerLog(log));
  pubsub.publish(
    log.simulatorId ? "shipLogsUpdate" : "officerLogsUpdate",
    App.officerLogs
  );
});
