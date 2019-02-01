import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const SubspaceFieldQueries = {
  subspaceField(root, { simulatorId }) {
    let returnVal = App.systems.find(s => s.class === "SubspaceField");
    if (simulatorId)
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    return returnVal;
  }
};

export const SubspaceFieldMutations = {
  fluxSubspaceField(root, args, context) {
    App.handleEvent(args, "fluxSubspaceField", context);
  },
  normalSubspaceField(root, args, context) {
    App.handleEvent(args, "normalSubspaceField", context);
  },
  setSubspaceFieldSectorValue(root, args, context) {
    App.handleEvent(args, "setSubspaceFieldSectorValue", context);
  }
};

export const SubspaceFieldSubscriptions = {
  subspaceFieldUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("subspaceFieldUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
