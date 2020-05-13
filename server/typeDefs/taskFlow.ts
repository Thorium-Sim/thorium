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
name:String!;
tasks:[Task!]!;
activeTasks: [Task!]!
completeAll: Boolean!;
completed:Boolean!;
  }
  type TaskFlow {
    id:ID!
    name:String!
    currentStep:Int!
    steps:[TaskFlowStep!]!
    completed:Boolean!
  }
  extend type Query {
    taskFlows(simulatorId: ID): TaskFlow[]
  }
  extend type Mutation {
    taskFlowAdd(name:String!):String
    taskFlowRemove(id:ID!):String
    taskFlowRename(id:ID!, name:String!):String
    taskFlowAddStep(id:ID!, name:String!):String
    taskFlowRemoveStep(id:ID!, stepId:ID!):String
    taskFlowRenameStep(id:ID!, stepId:ID!, name:String!):String
    taskFlowStepAddTask(id:ID!, stepId:ID!, task:TaskInput!):String
    taskFlowStepRemoveTask(id:ID!, stepId:ID!, taskId:ID!):String
    taskFlowStepEditTask(id:ID!, stepId:ID!, taskId:ID!, task:TaskInput!):String
    taskFlowStepSetCompleteAll(id:ID!, stepId:ID!, completeAll:Boolean!):String
    """
    Macro: Tasks: Activate Task Flow
    """
    taskFlowActivate(id:ID!, simulatorId:ID!):String
  }
  extend type Subscription {
    taskFlows(simulatorId: ID): TaskFlow[]
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
    taskFlowAddStep(_, {id, name}) {
      const flow = App.taskFlows.find(d => d.id === id);
      flow.addStep(name);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
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
    taskFlowStepAddTask(_, {id, stepId, task}) {
      const flow = App.taskFlows.find(d => d.id === id);
      flow.addTask(stepId, task);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
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
    taskFlowActivate(_, {id, simulatorId}) {
      const flow = App.taskFlows.find(d => d.id === id);

      const newFlow = new TaskFlow({
        ...flow,
        currentStep: -1,
        id: null,
        simulatorId,
      });
      // Trigger the flows to be created.
      newFlow.advance();
      App.taskFlows.push(newFlow);
      pubsub.publish("taskFlows", {
        simulatorId: null,
        taskFlows: App.taskFlows.filter(s => s.simulatorId === null),
      });
    },
  },
  Subscription: {
    taskFlows: {
      resolve(rootQuery) {
        return rootQuery.taskFlows;
      },
      subscribe: withFilter(
        (rootValue, {simulatorId}) => {
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
