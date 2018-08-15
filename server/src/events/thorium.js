import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import autoUpdate from "../bootstrap/autoupdate";

App.on("toggleAutoUpdate", ({ autoUpdate }) => {
  App.autoUpdate = autoUpdate;
  pubsub.publish("thoriumUpdate", App);
});

App.on("triggerAutoUpdate", () => {
  autoUpdate(true);
});
