import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";
import * as Classes from "../Classes";

export const TaskQueries = {
  tasks() {
    return App.tasks;
  },
  taskTemplates() {
    return App.taskTemplates;
  },
  taskDefinitions(rootValue, { simulatorId }) {
    return Object.values(Classes)
      .reduce((prev, c) => prev.concat(c.tasks), [])
      .filter(Boolean)
      .map(c => ({ ...c, id: c.name, simulatorId }));
  }
};

export const TaskTypes = {
  TaskDefinition: {
    active({ simulatorId }) {
      if (!simulatorId) return false;
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
