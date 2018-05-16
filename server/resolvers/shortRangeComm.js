import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const ShortRangeCommQueries = {
  shortRangeComm(root, { simulatorId }) {
    let returnVal = App.systems.filter(s => s.type === "ShortRangeComm");
    if (simulatorId)
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    return returnVal;
  }
};

export const ShortRangeCommMutations = {
  commAddSignal(root, args, context) {
    App.handleEvent(args, "commAddSignal", context);
  },
  commUpdateSignal(root, args, context) {
    App.handleEvent(args, "commUpdateSignal", context);
  },
  commUpdateSignals(root, args, context) {
    App.handleEvent(args, "commUpdateSignals", context);
  },
  commRemoveSignal(root, args, context) {
    App.handleEvent(args, "commRemoveSignal", context);
  },
  commAddArrow(root, args, context) {
    App.handleEvent(args, "commAddArrow", context);
  },
  commRemoveArrow(root, args, context) {
    App.handleEvent(args, "commRemoveArrow", context);
  },
  commConnectArrow(root, args, context) {
    App.handleEvent(args, "commConnectArrow", context);
  },
  commDisconnectArrow(root, args, context) {
    App.handleEvent(args, "commDisconnectArrow", context);
  },
  commUpdate(root, args, context) {
    App.handleEvent(args, "commUpdate", context);
  },
  commHail(root, args, context) {
    App.handleEvent(args, "commHail", context);
  },
  cancelHail(root, args, context) {
    App.handleEvent(args, "cancelHail", context);
  },
  connectHail(root, args, context) {
    App.handleEvent(args, "connectHail", context);
  },
  addShortRangeComm(root, args, context) {
    App.handleEvent(args, "addShortRangeComm", context);
  },
  removeShortRangeComm(root, args, context) {
    App.handleEvent(args, "removeShortRangeComm", context);
  },
  muteShortRangeComm(root, args, context) {
    App.handleEvent(args, "muteShortRangeComm", context);
  }
};

export const ShortRangeCommSubscriptions = {
  shortRangeCommUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("shortRangeCommUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};

export const ShortRangeCommTypes = {
  ShortRangeComm: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    }
  }
};
