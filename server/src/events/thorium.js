import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import autoUpdate from "../bootstrap/autoupdate";
import heap from "../helpers/heap";

App.on("toggleAutoUpdate", ({ autoUpdate }) => {
  App.autoUpdate = autoUpdate;
  pubsub.publish("thoriumUpdate", App);
});

App.on("triggerAutoUpdate", () => {
  autoUpdate(true);
});

App.on("setTrackingPreference", ({ pref }) => {
  App.doTrack = pref;
  App.askedToTrack = true;
  heap.stubbed = !pref;
});

App.on("importTaskTemplates", () => {
  if (App.addedTaskTemplates) return;
  App.addedTaskTemplates = true;
  const templates = require("../helpers/baseTaskTemplates.json");
  App.taskTemplates = App.taskTemplates.concat(templates);
  pubsub.publish("taskTemplatesUpdate", App.taskTemplates);
});
