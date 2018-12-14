import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const CommandLineQueries = {
  commandLine(root, { simulatorId }) {
    return App.commandLine;
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
  }
};

export const CommandLineSubscriptions = {
  commandLineUpdate: {
    resolve(rootValue) {
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("commandLineUpdate"),
      rootValue => true
    )
  }
};
