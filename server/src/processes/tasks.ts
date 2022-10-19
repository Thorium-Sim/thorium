import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import taskDefinitions from "../tasks";

let lastTime = Date.now();
function verifyTasks() {
  App.flights
    .filter(f => f.running === true)
    .forEach(f => {
      f.simulators
        .map(s => App.simulators.find(sim => sim.id === s))
        .forEach(sim => {
          if (!sim) return;
          let time = Date.now() - lastTime;
          let tasks = App.tasks.filter(s => s.simulatorId === sim.id);
          // Add on all of the report tasks.
          tasks = tasks.concat(
            App.taskReports
              .filter(s => s.simulatorId === sim.id && !s.cleared)
              .map(r => r.tasks.filter(t => !t.verified))
              .reduce((prev, next) => prev.concat(next), []),
          );
          // Go through each task and run the verify function.
          tasks.forEach(t => {
            // Increment the time elapsed
            if (t.verified) return;
            t.timeElapsedInMS += time;
            const taskDef = taskDefinitions.find(d => d.name === t.definition);

            if (
              taskDef &&
              taskDef.verify &&
              taskDef.verify({simulator: sim, requiredValues: t.values})
            ) {
              t.verify();
            }
          });
          pubsub.publish(
            "tasksUpdate",
            App.tasks.filter(s => s.simulatorId === sim.id),
          );
        });
    });
  pubsub.publish("taskReportUpdate", App.taskReports);
  lastTime = Date.now();
  setTimeout(verifyTasks, 1000);
}

verifyTasks();
