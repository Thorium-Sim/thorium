import App from "../../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const ShieldQueries = {
  shields(root, { simulatorId }) {
    return App.systems.filter(system => {
      return system.type === "Shield" && system.simulatorId === simulatorId;
    });
  }
};

export const ShieldMutations = {
  shieldRaised(root, args, context) {
    App.handleEvent(args, "shieldRaised", context);
  },
  shieldLowered(root, args, context) {
    App.handleEvent(args, "shieldLowered", context);
  },
  shieldIntegritySet(root, args, context) {
    App.handleEvent(args, "shieldIntegritySet", context);
  },
  shieldFrequencySet(root, args, context) {
    App.handleEvent(args, "shieldFrequencySet", context);
  }
};

export const ShieldSubscriptions = {
  shieldsUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId)
        return rootValue.filter(s => s.simulatorId === simulatorId);
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("shieldsUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
