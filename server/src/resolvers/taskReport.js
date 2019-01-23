import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const TaskReportQueries = {
  taskReport(root, { simulatorId }) {
    let returnVal = App.taskReports;
    if (simulatorId)
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    return returnVal;
  }
};

export const TaskReportMutations = {
  generateTaskReport(root, args, context) {
    App.handleEvent(args, "generateTaskReport", context);
  }
};

export const TaskReportSubscriptions = {
  taskReportUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("taskReportUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
