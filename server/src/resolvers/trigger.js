import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const TriggerQueries = {
  triggers(root, { simulatorId }) {
    let returnVal = App.triggerGroups;
    if (simulatorId) {
      returnVal.filter(c => c.simulatorId === simulatorId);
    } else {
      returnVal = returnVal.filter(c => !c.simulatorId);
    }
    return returnVal;
  }
};

export const TriggerMutations = {
  addTrigger(rootValue, args, context) {
    App.handleEvent(args, "addTrigger", context);
  },
  renameTrigger(root, args, context) {
    App.handleEvent(args, "renameTrigger", context);
  },
  removeTrigger(root, args, context) {
    App.handleEvent(args, "removeTrigger", context);
  },
  updateTrigger(root, args, context) {
    App.handleEvent(args, "updateTrigger", context);
  },
  addTriggerToSimulator(root, args, context) {
    App.handleEvent(args, "addTriggerToSimulator", context);
  },
  removeTriggerFromSimulator(root, args, context) {
    App.handleEvent(args, "removeTriggerFromSimulator", context);
  }
};

export const TriggerSubscriptions = {
  triggersUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(c => c.simulatorId === simulatorId);
      }
      return rootValue.filter(c => !c.simulatorId);
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("triggersUpdate"),
      (rootValue, { simulatorId }) => {
        if (simulatorId)
          return rootValue.find(c => c.simulatorId === simulatorId);
        return true;
      }
    )
  }
};
