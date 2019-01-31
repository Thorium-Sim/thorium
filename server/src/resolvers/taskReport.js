import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const TaskReportQueries = {
  taskReport(root, { simulatorId, type, cleared }) {
    let returnVal = App.taskReports;
    if (simulatorId)
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    if (type) {
      returnVal = returnVal.filter(s => s.type === type);
    }
    if (cleared) return returnVal;
    else return returnVal.filter(i => i.cleared === false);
  }
};

export const TaskReportMutations = {
  generateTaskReport(root, args, context) {
    App.handleEvent(args, "generateTaskReport", context);
  },
  clearTaskReport(root, args, context) {
    App.handleEvent(args, "clearTaskReport", context);
  },
  completeTaskReport(root, args, context) {
    App.handleEvent(args, "completeTaskReport", context);
  },
  verifyTaskReportStep(root, args, context) {
    App.handleEvent(args, "verifyTaskReportStep", context);
  },
  assignTaskReportStep(root, args, context) {
    App.handleEvent(args, "assignTaskReportStep", context);
  },
  requestVerifyTaskReportStep(root, args, context) {
    App.handleEvent(args, "requestVerifyTaskReportStep", context);
  }
};

export const TaskReportSubscriptions = {
  taskReportUpdate: {
    resolve(rootValue = [], { simulatorId, type, cleared }) {
      console.log(rootValue);
      let returnVal = rootValue;
      if (simulatorId) {
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      }
      if (type) {
        returnVal = returnVal.filter(s => s.type === type);
      }
      if (cleared) return returnVal;
      return returnVal.filter(s => !s.cleared);
    },

    subscribe: withFilter(
      () => pubsub.asyncIterator("taskReportUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};

export const TaskReportTypes = {
  TaskReport: {
    system: taskReport => {
      return App.systems.find(s => s.id === taskReport.systemId);
    }
  }
};
