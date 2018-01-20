import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const SignalJammerQueries = {
  signalJammers(root, { simulatorId }) {
    return App.systems.filter(
      s => s.class === "SignalJammer" && s.simulatorId === simulatorId
    );
  }
};

export const SignalJammerMutations = {
  updateSignalJammer(root, args, context) {
    App.handleEvent(args, "updateSignalJammer", context);
  },
  signalJammerSignals(root, args, context) {
    App.handleEvent(args, "signalJammerSignals", context);
  },
  fluxSignalJammer(root, args, context) {
    App.handleEvent(args, "fluxSignalJammer", context);
  }
};

export const SignalJammerSubscriptions = {
  signalJammersUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId)
        return rootValue.filter(s => s.simulatorId === simulatorId);
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("signalJammersUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
