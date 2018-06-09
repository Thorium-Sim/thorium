import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";

export const EnvironmentMutations = {
  updateEnvironment(root, args, context) {
    App.handleEvent(args, "updateEnvironment", context);
  }
};
