import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const TranswarpQueries = {
  transwarp(root, { simulatorId }) {
    let returnVal = App.systems.filter(s => s.class === "Transwarp");
    if (simulatorId)
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    return returnVal;
  }
};

export const TranswarpMutations = {
  setTranswarpActive(root, args, context) {
    App.handleEvent(args, "setTranswarpActive", context);
  },
  fluxTranswarp(root, args, context) {
    App.handleEvent(args, "fluxTranswarp", context);
  },
  normalTranswarp(root, args, context) {
    App.handleEvent(args, "normalTranswarp", context);
  },
  setTranswarpSectorValue(root, args, context) {
    App.handleEvent(args, "setTranswarpSectorValue", context);
  }
};

export const TranswarpSubscriptions = {
  transwarpUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("transwarpUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
