import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

App.on(
  "generateTaskReport",
  ({ simulatorId, systemId, name, type, stepCount }) => {
    App.taskReports.push(
      new Classes.TaskReport({ simulatorId, systemId, name, type, stepCount })
    );
    pubsub.publish("taskReportUpdate", App.taskReports);
  }
);
