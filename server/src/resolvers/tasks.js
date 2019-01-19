import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";
import taskDefinitions from "../tasks";
import uuid from "uuid";

export const TasksTypes = {
  Task: {
    instructions(task) {
      const { simulatorId, values, definition } = task;
      const simulator = App.simulators.find(s => s.id === simulatorId);
      const taskDef = taskDefinitions.find(d => d.name === definition);
      return taskDef.instructions({ simulator, requiredValues: values, task });
    }
  },
  TaskDefinition: {
    id: ({ name }) => name,
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

export const TasksQueries = {
  tasks(_, { simulatorId, station, definitions }) {
    let tasks = App.tasks.filter(s => s.simulatorId === simulatorId);
    if (station) tasks = tasks.filter(s => s.station === station);
    if (definitions)
      tasks = tasks.filter(s => definitions.indexOf(s.definition) > -1);
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
    const taskDef = taskDefinitions.find(d => d.name === definition);
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
  },
  requestTaskVerify(root, args, context) {
    App.handleEvent(args, "requestTaskVerify", context);
  },
  denyTaskVerify(root, args, context) {
    App.handleEvent(args, "denyTaskVerify", context);
  },
  addTaskTemplate(root, args, context) {
    const id = uuid.v4();
    App.handleEvent({ ...args, id }, "addTaskTemplate", context);
    return id;
  },
  removeTaskTemplate(root, args, context) {
    App.handleEvent(args, "removeTaskTemplate", context);
  },
  renameTaskTemplate(root, args, context) {
    App.handleEvent(args, "renameTaskTemplate", context);
  },
  setTaskTemplateValues(root, args, context) {
    App.handleEvent(args, "setTaskTemplateValues", context);
  },
  addTaskMacro(root, args, context) {
    App.handleEvent(args, "addTaskMacro", context);
  },
  removeTaskMacro(root, args, context) {
    App.handleEvent(args, "removeTaskMacro", context);
  }
};

export const TasksSubscriptions = {
  tasksUpdate: {
    resolve(rootValue, { simulatorId, station, definitions }) {
      let tasks = rootValue.filter(s => s.simulatorId === simulatorId);
      if (station) tasks = tasks.filter(s => s.station === station);
      if (definitions)
        tasks = tasks.filter(s => definitions.indexOf(s.definition) > -1);
      return tasks;
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
  },
  taskTemplatesUpdate: {
    resolve(rootValue) {
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("taskTemplatesUpdate"),
      () => true
    )
  }
};
