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
    taskFlowRemove(_, {id}) {},
    taskFlowRename(_, {id, name}) {},
    taskFlowAddStep(_, {id, name}) {},
    taskFlowRemoveStep(_, {id, stepId}) {},
    taskFlowRenameStep(_, {id, stepId, name}) {},
    taskFlowStepAddTask(_, {id, stepId, task}) {},
    taskFlowStepRemoveTask(_, {id, stepId, taskId}) {},
    taskFlowStepEditTask(_, {id, stepId, taskId, task}) {},
    taskFlowStepSetCompleteAll(_, {id, stepId, completeAll}) {},
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
