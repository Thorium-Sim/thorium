import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const InterfaceQueries = {
  interfaces(root, { simulatorId }) {
    let returnVal = App.interfaces;
    if (simulatorId)
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    return returnVal;
  },
  interfaceDevices() {
    return App.interfaceDevices;
  }
};

export const InterfaceMutations = {
  addInterface(rootQuery, args, context) {
    App.handleEvent(args, "addInterface", context);
  },
  renameInterface(rootQuery, args, context) {
    App.handleEvent(args, "renameInterface", context);
  },
  removeInterface(rootQuery, args, context) {
    App.handleEvent(args, "removeInterface", context);
  },
  updateInterface(rootQuery, args, context) {
    App.handleEvent(args, "updateInterface", context);
  },
  addInterfaceToSimulator(rootQuery, args, context) {
    App.handleEvent(args, "addInterfaceToSimulator", context);
  },
  removeInterfaceFromSimulator(rootQuery, args, context) {
    App.handleEvent(args, "removeInterfaceFromSimulator", context);
  },
  addInterfaceDevice(rootQuery, args, context) {
    App.handleEvent(args, "addInterfaceDevice", context);
  },
  renameInterfaceDevice(rootQuery, args, context) {
    App.handleEvent(args, "renameInterfaceDevice", context);
  },
  removeInterfaceDevice(rootQuery, args, context) {
    App.handleEvent(args, "removeInterfaceDevice", context);
  },
  updateInterfaceDevice(rootQuery, args, context) {
    App.handleEvent(args, "updateInterfaceDevice", context);
  }
};

export const InterfaceSubscriptions = {
  interfaceUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("interfaceUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};

export const InterfaceTypes = {
  Interface: {
    deviceType: int => {
      return App.interfaceDevices.find(d => d.id === int.deviceType);
    }
  }
};
