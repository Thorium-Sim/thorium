import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const ObjectiveQueries = {
  objective(root, { simulatorId }) {
    let returnVal = App.objectives;
    if (simulatorId) {
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const ObjectiveMutations = {
  addObjective(root, args, context) {
    App.handleEvent(args, "addObjective", context);
  },
  completeObjective(root, args, context) {
    App.handleEvent(args, "completeObjective", context);
  }
};

export const ObjectiveSubscriptions = {
  objectiveUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("objectiveUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
