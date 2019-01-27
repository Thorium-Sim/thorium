import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

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
  const task = taskReport.tasks.find(t => t.id === stepId);

  taskReport.assignTask(stepId, station);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: taskReport.simulatorId,
    type: "Tasks",
    station: station,
    title: `New Task`,
    body: `${task.values.name || task.definition}`,
    color: "info"
  });
  pubsub.publish("widgetNotify", {
    widget: "tasks",
    simulatorId: task.simulatorId,
    station: station
  });

  pubsub.publish("taskReportUpdate", App.taskReports);
  pubsub.publish(
    "tasksUpdate",
    App.tasks.filter(s => s.simulatorId === taskReport.simulatorId)
  );
});

App.on("requestVerifyTaskReportStep", ({ id, stepId }) => {
  const taskReport = App.taskReports.find(t => t.id === id);
  taskReport.requestVerify(stepId);
  const task = taskReport.tasks.find(t => t.id === stepId);
  pubsub.publish("taskReportUpdate", App.taskReports);
  pubsub.publish(
    "tasksUpdate",
    App.tasks.filter(s => s.simulatorId === taskReport.simulatorId)
  );
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: task.simulatorId,
    type: "Tasks",
    station: "Core",
    title: `Task Report Verification`,
    body: `${task.station} - ${task.values.name || task.definition}`,
    color: "info"
  });
  App.handleEvent(
    {
      simulatorId: task.simulatorId,
      component: "TasksReportCore",
      title: `Task Report Verification`,
      body: `${task.station} - ${task.values.name || task.definition}`,
      color: "info"
    },
    "addCoreFeed"
  );
});
