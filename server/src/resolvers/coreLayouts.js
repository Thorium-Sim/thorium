import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

function move(array, old_index, new_index) {
  if (new_index >= array.length) {
    var k = new_index - array.length;
    while (k-- + 1) {
      array.push(undefined);
    }
  }
  array.splice(new_index, 0, array.splice(old_index, 1)[0]);
  return array; // for testing purposes
}

export const CoreLayoutQueries = {
  coreLayouts() {
    return App.coreLayouts.map((c, i) => ({ ...c, order: i }));
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
  },
  reorderCoreLayouts(_, { id, order }, context) {
    App.coreLayouts = move(
      App.coreLayouts,
      App.coreLayouts.findIndex(t => t.id === id),
      order
    );
    pubsub.publish("coreLayoutChange", App.coreLayouts);
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
