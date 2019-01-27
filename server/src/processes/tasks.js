import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import taskDefinitions from "../tasks";

function verifyTasks() {
  App.flights.filter(f => f.running === true).forEach(f => {
    f.simulators
      .map(s => App.simulators.find(sim => sim.id === s))
      .forEach(sim => {
        let publish = false;
        let tasks = App.tasks.filter(s => s.simulatorId === sim.id);
        // Add on all of the report tasks.
        tasks = tasks.concat(
          App.taskReports
            .filter(s => s.simulatorId === sim.id && !s.cleared)
            .map(r => r.tasks.filter(t => !t.verified))
            .reduce((prev, next) => prev.concat(next), [])
        );
        // Go through each task and run the verify function.
        tasks.forEach(t => {
          if (t.verified) return;
          const taskDef = taskDefinitions.find(d => d.name === t.definition);
          if (
            taskDef.verify &&
            taskDef.verify({ simulator: sim, requiredValues: t.values })
          ) {
            t.verify();
            publish = true;
          }
        });
        if (publish) {
          pubsub.publish(
            "tasksUpdate",
            App.tasks.filter(s => s.simulatorId === sim.id)
          );
        }
      });
  });
  pubsub.publish("taskReportUpdate", App.taskReports);
  setTimeout(verifyTasks, 1000);
}

verifyTasks();
