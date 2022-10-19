import {gql, withFilter} from "apollo-server-express";
import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";

const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Ship {
    clamps: Boolean
    ramps: Boolean
    airlock: Boolean
    legs: Boolean
    bridgeCrew: Int
    extraPeople: Int
    radiation: Float
    velocity: Float
    remoteAccessCodes: [RemoteAccessCode]
    selfDestructTime: Float
    selfDestructCode: String
    selfDestructAuto: Boolean
    inventoryLogs: [InventoryLog]
  }

  type InventoryLog {
    timestamp: String
    log: String
  }

  type RemoteAccessCode {
    id: ID
    code: String
    state: String
    station: String
    timestamp: String
  }

  type Notification {
    id: ID
    title: String
    body: String
    color: String
    type: String
    trigger: String
    duration: Int
    relevantCards: [String]
  }
  enum NotifyColors {
    primary
    secondary
    success
    danger
    warning
    info
    light
    dark
  }
  extend type Mutation {
    shipDockingChange(simulatorId: ID!, which: String!, state: Boolean!): String
    """
    Macro: Docking: Set docking state
    Requires:
     - Cards:Docking
     - Docking
    """
    shipSetDocking(
      simulatorId: ID!
      clamps: Boolean
      ramps: Boolean
      airlock: Boolean
      legs: Boolean
    ): String
    remoteAccessSendCode(
      simulatorId: ID!
      code: String!
      station: String!
    ): String
    remoteAccessUpdateCode(
      simulatorId: ID!
      codeId: ID!
      state: String!
    ): String
    setSelfDestructTime(simulatorId: ID!, time: Float): String
    setSelfDestructCode(simulatorId: ID!, code: String): String
    setSelfDestructAuto(simulatorId: ID!, auto: Boolean): String
    """
    Macro: Actions: Send Notification
    """
    notify(
      simulatorId: ID!
      type: String
      """
      Dynamic: Station
      """
      station: String
      title: String!
      body: String
      color: NotifyColors
    ): String

    """
    Macro: Actions: Print PDF Asset
    """
    printPdf(asset: String!): String
    clearPdf(id: ID!): String
  }

  type PrintQueue {
    id: ID!
    simulatorId: String!
    asset: String!
    timestamp: Float!
  }

  extend type Subscription {
    notify(simulatorId: ID!, station: String, trigger: String): Notification
    widgetNotify(simulatorId: ID!, station: String): String
    printQueue(simulatorId: ID!): [PrintQueue]
  }
`;

const resolver = {
  Query: {},
  Mutation: mutationHelper(schema),
  Subscription: {
    notify: {
      resolve: rootValue => {
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("notify"),
        (rootValue, {simulatorId, station, trigger}) => {
          if (simulatorId) {
            if (rootValue.simulatorId !== simulatorId) return false;
          }
          if (station) {
            if (rootValue.station.trim() !== station.trim()) return false;
          }
          if (trigger) {
            if (rootValue.trigger !== trigger) return false;
          }
          return true;
        },
      ),
    },
    widgetNotify: {
      resolve: (rootValue, {simulatorId, station}) => {
        let returnVal = rootValue;
        if (simulatorId) {
          returnVal = returnVal.simulatorId === simulatorId && returnVal;
        }
        if (station) {
          returnVal = returnVal.station.trim() === station.trim() && returnVal;
        }
        return returnVal.widget;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("widgetNotify"),
        rootValue => !!rootValue,
      ),
    },
    printQueue: {
      resolve(rootValue) {
        return rootValue;
      },
      subscribe: withFilter(
        (rootValue, {simulatorId}) => {
          const id = uuid.v4();
          process.nextTick(() => {
            let returnVal = App.printQueue.filter(
              queue => queue.simulatorId === simulatorId,
            );
            pubsub.publish(id, returnVal);
          });
          return pubsub.asyncIterator([id, "printQueue"]);
        },
        (rootValue, {simulatorId}) => {
          return true;
        },
      ),
    },
  },
};

export default {schema, resolver};
