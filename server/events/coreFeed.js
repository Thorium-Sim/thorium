import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

App.on("ignoreCoreFeed", ({ id }) => {
  App.coreFeed.find(c => c.id === id).ignore();
  pubsub.publish("coreFeedUpdate", App.coreFeed);
});
App.on("addCoreFeed", args => {
  App.coreFeed
    .filter(
      c => c.simulatorId === args.simulatorId && c.component === args.component
    )
    .forEach(c => c.ignore());
  App.coreFeed.push(new Classes.CoreFeed(args));
  pubsub.publish("coreFeedUpdate", App.coreFeed);
});
