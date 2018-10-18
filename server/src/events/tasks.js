import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

App.on("addTask", ({ taskInput }) => {
  App.tasks.push(new Classes.Task(taskInput));
  pubsub.publish(
    "tasksUpdate",
    App.tasks.filter(s => s.simulatorId === taskInput.simulatorId)
  );
});

App.on("verifyTask", ({ taskId, dismiss }) => {
  const task = App.tasks.find(t => t.id === taskId);
  if (task) {
    task.verify(dismiss);
    pubsub.publish(
      "tasksUpdate",
      App.tasks.filter(s => s.simulatorId === task.simulatorId)
    );
  }
});

App.on("dismissVerifiedTasks", ({ simulatorId }) => {
  const tasks = App.tasks.filter(t => t.simulatorId === simulatorId);
  if (tasks.length > 0) {
    tasks.forEach(t => {
      if (t.verified) t.dismiss();
    });
    pubsub.publish("tasksUpdate", tasks);
  }
});
