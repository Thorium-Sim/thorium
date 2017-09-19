import App from "../../app";

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
  coreFeedUpdate(rootValue, { simulatorId }) {
    if (simulatorId)
      rootValue = rootValue.filter(r => r.simulatorId === simulatorId);
    return rootValue;
  }
};
