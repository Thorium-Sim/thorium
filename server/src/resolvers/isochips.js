import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const IsochipsQueries = {
  isochips(root, { simulatorId }) {
    let returnVal = App.isochips;
    if (simulatorId)
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    return returnVal;
  }
};

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Events is tough to return data for mutations
export const IsochipsMutations = {
  insertIsochip(root, args, context) {
    App.handleEvent(args, "insertIsochip", context);
  },
  updateIsochip(root, args, context) {
    App.handleEvent(args, "updateIsochip", context);
  },
  async batchIsochipUpdate(root, args, context) {
    App.handleEvent(args, "batchIsochipUpdate", context);
    await timeout(100);
    let isochips = App.isochips;
    if (args.simulatorId)
      isochips = isochips.filter(i => i.simulatorId === args.simulatorId);
    return isochips;
  }
};

export const IsochipsSubscriptions = {
  isochipsUpdate: {
    resolve(rootValue, { simulatorId }) {
      let returnVal = rootValue;
      if (simulatorId)
        returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
      return returnVal;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("isochipsUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};

export const IsochipsTypes = {
  Isochip: {
    system(rootValue) {
      return App.systems.find(s => s.id === rootValue.system);
    },
    simulator(rootValue) {
      return App.simulator.find(s => s.id === rootValue.simulator);
    }
  }
};
