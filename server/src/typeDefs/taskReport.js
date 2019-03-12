import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
import getDamageSystem from "../helpers/getDamageSystem";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type TaskReport {
    id: ID
    simulatorId: ID
    system: System
    type: String
    stepCount: Int
    name: String
    tasks: [Task]
  }
  extend type Query {
    taskReport(simulatorId: ID, type: String, cleared: Boolean): [TaskReport]
  }
  extend type Mutation {
    generateTaskReport(
      simulatorId: ID!
      systemId: ID
      name: String
      type: String!
      stepCount: Int
    ): String
    clearTaskReport(id: ID!): String
    completeTaskReport(id: ID!): String
    verifyTaskReportStep(id: ID!, stepId: ID!): String
    assignTaskReportStep(id: ID!, stepId: ID!, station: String): String
    requestVerifyTaskReportStep(id: ID!, stepId: ID!): String
  }
  extend type Subscription {
    taskReportUpdate(
      simulatorId: ID
      type: String
      cleared: Boolean
    ): [TaskReport]
  }
`;

const resolver = {
  TaskReport: {
    system: taskReport => {
      return getDamageSystem(taskReport.systemId);
    }
  },
  Query: {
    taskReport(root, { simulatorId, type, cleared }) {
      let returnVal = App.taskReports;
      if (simulatorId)
        returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
      if (type) {
        returnVal = returnVal.filter(s => s.type === type);
      }
      if (cleared) return returnVal;
      else return returnVal.filter(i => i.cleared === false);
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    taskReportUpdate: {
      resolve(rootValue = [], { simulatorId, type, cleared }) {
        let returnVal = rootValue;
        if (simulatorId) {
          returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
        }
        if (type) {
          returnVal = returnVal.filter(s => s.type === type);
        }
        if (cleared) return returnVal;
        return returnVal.filter(s => !s.cleared);
      },

      subscribe: withFilter(
        () => pubsub.asyncIterator("taskReportUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
