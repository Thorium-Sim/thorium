import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

App.on("ignoreCoreFeed", ({ id }) => {
  if (App.simulators.find(s => s.id === id)) {
    App.coreFeed.filter(c => c.simulatorId === id).forEach(c => c.ignore());
  } else App.coreFeed.find(c => c.id === id).ignore();
  pubsub.publish("coreFeedUpdate", App.coreFeed);
});
App.on("addCoreFeed", args => {
  App.coreFeed.push(new Classes.CoreFeed(args));
  pubsub.publish("coreFeedUpdate", App.coreFeed);
});

App.on("syncTimer", args => {
  pubsub.publish("syncTime", args);
});
