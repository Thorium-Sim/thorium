import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import autoUpdate from "../bootstrap/autoupdate";
import heap from "../helpers/heap";
import GraphQLClient from "../helpers/graphqlClient";

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

App.on("setSpaceEdventuresToken", async ({ token, cb }) => {
  // Check the token first
  const {
    data: { center }
  } = await GraphQLClient.query({
    query: `query {
      center {
        id
        name
      }
    }`,
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  console.log(center);
  if (center) {
    App.spaceEdventuresToken = token;
    cb(center);
  }
  cb();
});
