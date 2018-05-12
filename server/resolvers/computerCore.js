import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const ComputerCoreQueries = {
  computerCore(root, { simulatorId }) {
    let returnVal = App.systems.filter(s => s.class === "ComputerCore");
    if (simulatorId)
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    return returnVal;
  }
};

export const ComputerCoreMutations = {
  addComputerCoreUser(root, args, context) {
    App.handleEvent(args, "addComputerCoreUser", context);
  },
  removeComputerCoreUser(root, args, context) {
    App.handleEvent(args, "removeComputerCoreUser", context);
  },
  restoreComputerCoreFile(root, args, context) {
    App.handleEvent(args, "restoreComputerCoreFile", context);
  },
  deleteComputerCoreVirus(root, args, context) {
    App.handleEvent(args, "deleteComputerCoreVirus", context);
  },
  restartComputerCoreTerminal(root, args, context) {
    App.handleEvent(args, "restartComputerCoreTerminal", context);
  }
};

export const ComputerCoreSubscriptions = {
  computerCoreUpdate: {
    resolve(rootValue) {
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("computerCoreUpdate"),
      (rootValue, { simulatorId }) => {
        let returnVal = rootValue;
        if (simulatorId) {
          returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
        }
        return returnVal.length > 0;
      }
    )
  }
};
