import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";
import * as Classes from "../classes";

const taskDefinitions = Object.values(Classes)
  .reduce(
    (prev, c) =>
      c.tasks
        ? prev.concat(
            c.tasks.map(t => ({
              ...t,
              id: t.name,
              class: c.name
            }))
          )
        : prev,
    []
  )
  .filter(Boolean);

export const TaskQueries = {
  tasks() {
    return App.tasks;
  },
  taskTemplates() {
    return App.taskTemplates;
  },
  taskDefinitions(rootValue, { simulatorId }) {
    return taskDefinitions.map(t => ({ ...t, simulatorId }));
  },
  taskInstructions(_, { simulatorId, definition, requiredValues, task }) {
    const simulator = App.simulators.find(s => s.id === simulatorId);
    const taskDef = taskDefinitions.find(d => d.id === definition);
    return taskDef.instructions({ simulator, requiredValues, task });
  }
};

export const TaskTypes = {
  TaskDefinition: {
    active({ active, simulatorId }) {
      if (!simulatorId) return false;
      const simulator = App.simulators.find(s => s.id === simulatorId);
      return active({
        simulator
      });
    },
    stations({ stations, simulatorId }) {
      if (!simulatorId) return null;
      const simulator = App.simulators.find(s => s.id === simulatorId);
      return stations ? stations({ simulator }) : simulator.stations;
    },
    valuesInput({ name, values, simulatorId }) {
      try {
        const simulator = App.simulators.find(s => s.id === simulatorId);
        return Object.entries(values).reduce((prev, [key, value]) => {
          prev[key] = value.input({ simulator });
          return prev;
        }, {});
      } catch (e) {
        console.error("Error accessing task inputs for ", name);
        console.error(e);
        return {};
      }
    },
    valuesValue({ name, values, simulatorId }) {
      try {
        const simulator = App.simulators.find(s => s.id === simulatorId);
        return Object.entries(values).reduce((prev, [key, value]) => {
          prev[key] = value.value({ simulator });
          return prev;
        }, {});
      } catch (e) {
        console.error("Error accessing task values for ", name);
        console.error(e);
        return {};
      }
    }
  }
};
