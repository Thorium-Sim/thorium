import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";
import App from "../app";
import {TaskFlow} from "../classes";

// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type TaskFlowStep {
    id: ID!
    name: String!
    tasks: [Task!]!
    activeTasks: [Task!]!
    completeAll: Boolean!
    delay: Int!
    completed: Boolean!
  }
  type TaskFlow {
    id: ID!
    name: String!
    category: String!
    currentStep: Int!
    steps: [TaskFlowStep!]!
    completed: Boolean!
  }
  extend type Query {
    taskFlows(simulatorId: ID): [TaskFlow!]!
  }
  extend type Mutation {
    taskFlowAdd(name: String!): String
    taskFlowRemove(id: ID!): String
    taskFlowRename(id: ID!, name: String!): String
    taskFlowSetCategory(id: ID!, category: String!): String
    taskFlowAddStep(id: ID!, name: String!): String
    taskFlowRemoveStep(id: ID!, stepId: ID!): String
    taskFlowRenameStep(id: ID!, stepId: ID!, name: String!): String
    taskFlowReorderStep(id: ID!, stepId: ID!, order: Int!): String
    taskFlowStepAddTask(id: ID!, stepId: ID!, task: TaskInput!): String
    taskFlowStepRemoveTask(id: ID!, stepId: ID!, taskId: ID!): String
    taskFlowStepEditTask(
      id: ID!
      stepId: ID!
      taskId: ID!
      task: TaskInput!
    ): String
    taskFlowStepSetCompleteAll(
      id: ID!
      stepId: ID!
      completeAll: Boolean!
    ): String
    taskFlowStepSetDelay(id: ID!, stepId: ID!, delay: Int!): String
    """
    Macro: Tasks: Activate Task Flow
    """
    taskFlowActivate(id: ID!, simulatorId: ID!): String
    taskFlowAdvance(simulatorId: ID!): String
  }
  extend type Subscription {
    taskFlows(simulatorId: ID): [TaskFlow!]!
  }
`;

const resolver = {
  Query: {
    taskFlows(_, {simulatorId = null}) {
      // If simulatorId is null, we're dealing with a template task flow
      return App.taskFlows.filter(t => t.simulatorId === simulatorId);
    },
  },
  Mutation: {
    taskFlowAdd(_, {name}) {
      const taskFlow = new TaskFlow({name});
      App.taskFlows.push(taskFlow);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
      return taskFlow.id;
    },
    taskFlowRemove(_, {id}) {
      App.taskFlows = App.taskFlows.filter(t => t.id !== id);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
    },
    taskFlowRename(_, {id, name}) {
      const flow = App.taskFlows.find(d => d.id === id);
      flow.setName(name);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
    },
    taskFlowSetCategory(_, {id, category}) {
      const flow = App.taskFlows.find(d => d.id === id);
      flow.setCategory(category);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
    },
    taskFlowAddStep(_, {id, name}) {
      const flow = App.taskFlows.find(d => d.id === id);
      const step = flow.addStep(name);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
      return step.id;
    },
    taskFlowRemoveStep(_, {id, stepId}) {
      const flow = App.taskFlows.find(d => d.id === id);
      flow.removeStep(stepId);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
    },
    taskFlowRenameStep(_, {id, stepId, name}) {
      const flow = App.taskFlows.find(d => d.id === id);
      flow.renameStep(stepId, name);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
    },
    taskFlowReorderStep(_, {id, stepId, order}) {
      const flow = App.taskFlows.find(d => d.id === id);
      flow.reorderStep(stepId, order);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
    },
    taskFlowStepAddTask(_, {id, stepId, task}) {
      const flow = App.taskFlows.find(d => d.id === id);
      const taskObj = flow.addTask(stepId, task);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
      return taskObj?.id;
    },
    taskFlowStepRemoveTask(_, {id, stepId, taskId}) {
      const flow = App.taskFlows.find(d => d.id === id);
      flow.removeTask(stepId, taskId);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
    },
    taskFlowStepEditTask(_, {id, stepId, taskId, task}) {
      const flow = App.taskFlows.find(d => d.id === id);
      flow.editTask(stepId, taskId, task);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
    },
    taskFlowStepSetCompleteAll(_, {id, stepId, completeAll}) {
      const flow = App.taskFlows.find(d => d.id === id);
      flow.setCompleteAll(stepId, completeAll);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
    },
    taskFlowStepSetDelay(_, {id, stepId, delay}) {
      const flow = App.taskFlows.find(d => d.id === id);
      flow.setDelay(stepId, delay);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
    },
    taskFlowActivate(_, {id, simulatorId}) {
      const flow = App.taskFlows.find(d => d.id === id);
      const newFlow = new TaskFlow({
        currentStep: -1,
        id: null,
        simulatorId,
        name: flow.name,
        category: flow.category,
        steps: flow.steps.map(f => ({
          ...f,
          id: null,
          tasks: f.tasks.map(t => ({...t, id: null})),
        })),
      });
      // Trigger the flows to be created.
      newFlow.advance();
      App.taskFlows.push(newFlow);
      pubsub.publish("taskFlows", {
        simulatorId: simulatorId,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === simulatorId),
      });
    },
    taskFlowAdvance(_, {simulatorId}) {
      App.taskFlows
        .filter(t => t.simulatorId === simulatorId)
        .forEach(t => t.advance());
      pubsub.publish("taskFlows", {
        simulatorId: simulatorId,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === simulatorId),
      });
    },
  },
  Subscription: {
    taskFlows: {
      resolve(rootQuery) {
        return rootQuery.taskFlows;
      },
      subscribe: withFilter(
        (rootValue, {simulatorId = null}) => {
          const id = uuid.v4();
          process.nextTick(() => {
            const data = {
              simulatorId,
              taskFlows: App.taskFlows.filter(
                t => t.simulatorId === simulatorId,
              ),
            };
            pubsub.publish(id, data);
          });
          return pubsub.asyncIterator([id, "taskFlows"]);
        },
        (rootValue, {simulatorId = null}) => {
          const rootSimId = rootValue.simulatorId || null;
          return rootSimId === simulatorId;
        },
      ),
    },
  },
};

export default {schema, resolver};
