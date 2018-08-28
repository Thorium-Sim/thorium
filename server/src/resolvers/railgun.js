import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const RailgunQueries = {
  railgun(root, { simulatorId }) {
    let returnVal = App.systems.filter(s => s.type === "Railgun");
    if (simulatorId)
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    return returnVal;
  }
};

export const RailgunMutations = {
  setRailgunAmmo(root, args, context) {
    App.handleEvent(args, "setRailgunAmmo", context);
  },
  setRailgunMaxAmmo(root, args, context) {
    App.handleEvent(args, "setRailgunMaxAmmo", context);
  },
  setRailgunAvailableAmmo(root, args, context) {
    App.handleEvent(args, "setRailgunAvailableAmmo", context);
  },
  fireRailgun(root, args, context) {
    App.handleEvent(args, "fireRailgun", context);
  },
  loadRailgun(root, args, context) {
    App.handleEvent(args, "loadRailgun", context);
  }
};

export const RailgunSubscriptions = {
  railgunUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("railgunUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
