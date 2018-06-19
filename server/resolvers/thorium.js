import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";

export const ThoriumQueries = {
  thorium(root) {
    return App;
  }
};

export const ThoriumMutations = {
  toggleAutoUpdate(root, args, context) {
    App.handleEvent(args, "toggleAutoUpdate", context);
  },
  triggerAutoUpdate(root, args, context) {
    App.handleEvent(args, "triggerAutoUpdate", context);
  }
};

export const ThoriumSubscriptions = {
  thoriumUpdate: {
    resolve(rootValue) {
      return rootValue;
    },
    subscribe: () => pubsub.asyncIterator("thoriumUpdate")
  }
};
