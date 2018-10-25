import * as classes from "../classes";
import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

const taskDefinitions = Object.values(classes)
  .reduce((prev, c) => prev.concat(c.tasks), [])
  .filter(Boolean);

function verifyTasks() {
  App.flights.filter(f => f.running === true).forEach(f => {
    f.simulators
      .map(s => App.simulators.find(sim => sim.id === s))
      .forEach(sim => {
        let publish = false;
        const tasks = App.tasks.filter(s => s.simulatorId === sim.id);

        // Go through each task and run the verify function.
        tasks.forEach(t => {
          if (t.verified) return;
          const taskDef = taskDefinitions.find(d => d.name === t.definition);
          if (taskDef.verify && taskDef.verify({ simulator: sim })) {
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
  setTimeout(verifyTasks, 1000);
}

verifyTasks();
