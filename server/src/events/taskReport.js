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

App.on("clearTaskReport", ({ id }) => {
  const taskReport = App.taskReports.find(t => t.id === id);
  taskReport.clear();
  pubsub.publish("taskReportUpdate", App.taskReports);
  pubsub.publish(
    "tasksUpdate",
    App.tasks.filter(s => s.simulatorId === taskReport.simulatorId)
  );
});

App.on("completeTaskReport", ({ id }) => {
  const taskReport = App.taskReports.find(t => t.id === id);
  taskReport.complete();
  pubsub.publish("taskReportUpdate", App.taskReports);
  pubsub.publish(
    "tasksUpdate",
    App.tasks.filter(s => s.simulatorId === taskReport.simulatorId)
  );
});
App.on("verifyTaskReportStep", ({ id, stepId }) => {
  const taskReport = App.taskReports.find(t => t.id === id);
  taskReport.verifyTask(stepId);
  pubsub.publish("taskReportUpdate", App.taskReports);
  pubsub.publish(
    "tasksUpdate",
    App.tasks.filter(s => s.simulatorId === taskReport.simulatorId)
  );
});

App.on("assignTaskReportStep", ({ id, stepId, station }) => {
  const taskReport = App.taskReports.find(t => t.id === id);
  taskReport.assignTask(stepId, station);
  pubsub.publish("taskReportUpdate", App.taskReports);
  pubsub.publish(
    "tasksUpdate",
    App.tasks.filter(s => s.simulatorId === taskReport.simulatorId)
  );
});

App.on("requestVerifyTaskReportStep", ({ id, stepId }) => {
  const taskReport = App.taskReports.find(t => t.id === id);
  taskReport.requestVerify(stepId);
  pubsub.publish("taskReportUpdate", App.taskReports);
  pubsub.publish(
    "tasksUpdate",
    App.tasks.filter(s => s.simulatorId === taskReport.simulatorId)
  );
});
