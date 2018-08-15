import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const CoreLayoutQueries = {
  coreLayouts() {
    return App.coreLayouts;
  }
};

export const CoreLayoutMutations = {
  updateCoreLayout(_, { layout }, context) {
    App.handleEvent({ layout }, "updateCoreLayout", context);
  },
  addCoreLayout(_, { layout }, context) {
    App.handleEvent({ layout }, "addCoreLayout", context);
  },
  removeCoreLayout(_, { id }, context) {
    App.handleEvent({ id }, "removeCoreLayout", context);
  }
};

export const CoreLayoutSubscriptions = {
  coreLayoutChange: {
    resolve(rootValue) {
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("coreLayoutChange"),
      rootValue => {
        return !!(rootValue && rootValue.length);
      }
    )
  }
};
