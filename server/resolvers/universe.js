import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const UniverseQueries = {
  universes(root) {
    return App.universes;
  },
  universe(root, { universeId }) {
    return App.universes.find(u => u.id === universeId);
  }
};

export const UniverseMutations = {};

export const UniverseSubscriptions = {
  universeUpdate: {
    resolve(rootValue) {
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("universeUpdate"),
      (rootValue, { universeId }) => {
        if (rootValue.id === universeId) return true;
        return false;
      }
    )
  }
};
