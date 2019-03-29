import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Ship {
    clamps: Boolean
    ramps: Boolean
    airlock: Boolean
    bridgeCrew: Int
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
      station: String
      title: String!
      body: String
      color: NotifyColors
    ): String
  }

  extend type Subscription {
    notify(simulatorId: ID!, station: String, trigger: String): Notification
    widgetNotify(simulatorId: ID!, station: String): String
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
        (rootValue, { simulatorId, station, trigger }) => {
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
        }
      )
    },
    widgetNotify: {
      resolve: (rootValue, { simulatorId, station }) => {
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
        rootValue => !!rootValue
      )
    }
  }
};

export default { schema, resolver };
