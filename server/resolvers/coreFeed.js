import App from "../../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const CoreFeedQueries = {
  coreFeed(rootValue, { simulatorId }) {
    let returnValue = App.coreFeed;
    if (simulatorId)
      returnValue = returnValue.filter(r => r.simulatorId === simulatorId);
    return returnValue;
  }
};

export const CoreFeedMutations = {
  ignoreCoreFeed(rootValue, args, context) {
    App.handleEvent(args, "ignoreCoreFeed", context);
  }
};

export const CoreFeedSubscriptions = {
  coreFeedUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId)
        rootValue = rootValue.filter(r => r.simulatorId === simulatorId);
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("coreFeedUpdate"),
      (rootValue, { simulatorId }) => {
        if (simulatorId)
          return !!rootValue.find(r => r.simulatorId === simulatorId);
        return true;
      }
    )
  }
};
