import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
import taskDefinitions from "../tasks";

// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Task {
    id: ID
    simulatorId: ID
    station: String
    systemId: ID
    deck: Deck
    room: Room
    definition: String
    verified: Boolean
    verifyRequested: Boolean
    dismissed: Boolean
    values: JSON
    instructions: String
    startTime: String
    endTime: String
    macros: [TimelineItem]
    assigned: Boolean
  }

  input TaskInput {
    simulatorId: ID
    definition: String
    values: JSON
    station: String
    macros: [TimelineItemInput]
  }

  type TaskTemplate {
    id: ID
    name: String
    values: JSON
    definition: String
    reportTypes: [String]
    macros: [TimelineItem]
  }

  type TaskDefinition {
    id: ID
    name: String
    class: String
    stations: [Station]
    active: Boolean
    valuesInput: JSON
    valuesValue: JSON
  }
  extend type Query {
    tasks(simulatorId: ID!, station: String, definitions: [String!]): [Task]
    taskTemplates: [TaskTemplate]
    taskDefinitions(simulatorId: ID): [TaskDefinition]
    taskInstructions(
      simulatorId: ID
      definition: String!
      requiredValues: JSON!
      task: TaskInput
    ): String
  }
  extend type Mutation {
    """
    Macro: Tasks: Add Task
    """
    addTask(taskInput: TaskInput!): String
    verifyTask(taskId: ID!, dismiss: Boolean): String
    requestTaskVerify(id: ID!): String
    denyTaskVerify(id: ID!): String
    dismissVerifiedTasks(simulatorId: ID!): String
    addTaskTemplate(definition: String!): String
    removeTaskTemplate(id: ID!): String
    renameTaskTemplate(id: ID!, name: String!): String
    setTaskTemplateValues(id: ID!, values: JSON!): String
    setTaskTemplateReportTypes(id: ID!, reportTypes: [String]!): String
    setTaskTemplateMacros(id: ID!, macros: [TimelineItemInput]!): String
  }
  extend type Subscription {
    tasksUpdate(
      simulatorId: ID!
      station: String
      definitions: [String!]
    ): [Task]
    taskTemplatesUpdate: [TaskTemplate]
  }
`;

const resolver = {
  Task: {
    instructions(task) {
      const { simulatorId, values, definition } = task;
      const simulator = App.simulators.find(s => s.id === simulatorId);
      const taskDef = taskDefinitions.find(d => d.name === definition);
      return taskDef.instructions({ simulator, requiredValues: values, task });
    },
    assigned(task) {
      return !!task.assigned;
    }
  },
  TaskDefinition: {
    id: ({ name }) => name,
    active({ active, simulatorId }) {
      if (!simulatorId) return false;
      const simulator = App.simulators.find(s => s.id === simulatorId);
      return Boolean(active({
        simulator
      }));
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
  },
  Query: {
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
  },
  Mutation: mutationHelper(schema),
  Subscription: {
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
  }
};

export default { schema, resolver };
