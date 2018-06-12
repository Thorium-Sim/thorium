import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const ShipQueries = {
  //Handled by simulator
};

export const ShipMutations = {
  shipDockingChange(root, args, context) {
    App.handleEvent(args, "shipDockingChange", context);
  },
  remoteAccessSendCode(root, args, context) {
    App.handleEvent(args, "remoteAccessSendCode", context);
  },
  remoteAccessUpdateCode(root, args, context) {
    App.handleEvent(args, "remoteAccessUpdateCode", context);
  },
  setSelfDestructTime(root, args, context) {
    App.handleEvent(args, "setSelfDestructTime", context);
  },
  setSelfDestructCode(root, args, context) {
    App.handleEvent(args, "setSelfDestructCode", context);
  },
  setSelfDestructAuto(root, args, context) {
    App.handleEvent(args, "setSelfDestructAuto", context);
  }
};

export const ShipSubscriptions = {
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
};
