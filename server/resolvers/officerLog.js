import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const OfficerLogQueries = {
  officerLogs(rootValue, { clientId, flightId }) {
    return App.officerLogs.filter(
      l => l.clientId === clientId && l.flightId === flightId
    );
  },
  shipLogs(rootValue, { simulatorId }) {
    return App.officerLogs.filter(l => l.simulatorId === simulatorId);
  }
};

export const OfficerLogMutations = {
  addLog(rootValue, args, context) {
    App.handleEvent(args, "addLog", context);
  }
};

export const OfficerLogSubscriptions = {
  officerLogsUpdate: {
    resolve(rootValue, { clientId, flightId }) {
      return rootValue.filter(
        l => l.clientId === clientId && l.flightId === flightId
      );
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("officerLogsUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  },
  shipLogsUpdate: {
    resolve(rootValue, { simulatorId }) {
      return rootValue.filter(l => l.simulatorId === simulatorId);
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("shipLogsUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
