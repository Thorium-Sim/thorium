import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";
import * as Classes from "../classes";

export const TasksTypes = {
  Task: {
    instructions(task) {
      const { simulatorId, values, definition } = task;
      const simulator = App.simulators.find(s => s.id === simulatorId);
      const taskDef = taskDefinitions.find(d => d.id === definition);
      return taskDef.instructions({ simulator, requiredValues: values, task });
    }
  },
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

export const TasksQueries = {
  tasks(_, { simulatorId, station }) {
    let tasks = App.tasks.filter(s => s.simulatorId === simulatorId);
    if (station) tasks = tasks.filter(s => s.station === station);
    return tasks;
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

export const TasksMutations = {
  addTask(root, args, context) {
    App.handleEvent(args, "addTask", context);
  },
  verifyTask(root, args, context) {
    App.handleEvent(args, "verifyTask", context);
  },
  dismissVerifiedTasks(root, args, context) {
    App.handleEvent(args, "dismissVerifiedTasks", context);
  }
};

export const TasksSubscriptions = {
  tasksUpdate: {
    resolve(rootValue) {
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("tasksUpdate"),
      (rootValue, { simulatorId, station }) => {
        let simTasks = App.tasks.filter(s => s.simulatorId === simulatorId);
        if (station) simTasks = simTasks.filter(s => s.station === station);
        if (rootValue.length === 0 && simTasks.length === 0) return true;
        let rootTasks = rootValue.filter(s => s.simulatorId === simulatorId);
        if (station) rootTasks = rootTasks.filter(s => s.station === station);
        if (rootTasks.length > 0) return true;
        return false;
      }
    )
  }
};
