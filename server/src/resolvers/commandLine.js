import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const CommandLineQueries = {
  commandLine(root, { simulatorId }) {
    let returnVal = App.commandLine;
    if (simulatorId) {
      returnVal.filter(c => c.simulatorId === simulatorId);
    } else {
      returnVal = returnVal.filter(c => !c.simulatorId);
    }
    return returnVal;
  },
  commandLineCommands(root, { simulatorId }) {
    return App.commandLine
      .filter(c => c.simulatorId === simulatorId)
      .reduce((prev, next) => prev.concat(next.commands), []);
  }
};

export const CommandLineMutations = {
  addCommandLine(rootValue, args, context) {
    App.handleEvent(args, "addCommandLine", context);
  },
  renameCommandLine(root, args, context) {
    App.handleEvent(args, "renameCommandLine", context);
  },
  removeCommandLine(root, args, context) {
    App.handleEvent(args, "removeCommandLine", context);
  },
  updateCommandLine(root, args, context) {
    App.handleEvent(args, "updateCommandLine", context);
  },
  executeCommandLine(root, args, context) {
    return new Promise(resolve => {
      App.handleEvent(
        { ...args, callback: resolve },
        "executeCommandLine",
        context
      );
    });
  },
  addCommandLineToSimulator(root, args, context) {
    App.handleEvent(args, "addCommandLineToSimulator", context);
  },
  removeCommandLineFromSimulator(root, args, context) {
    App.handleEvent(args, "removeCommandLineFromSimulator", context);
  }
};

export const CommandLineSubscriptions = {
  commandLineUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(c => c.simulatorId === simulatorId);
      }
      return rootValue.filter(c => !c.simulatorId);
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("commandLineUpdate"),
      (rootValue, { simulatorId }) => {
        if (simulatorId)
          return rootValue.find(c => c.simulatorId === simulatorId);
        return true;
      }
    )
  }
};
