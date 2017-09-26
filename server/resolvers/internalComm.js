import App from "../../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const InternalCommQueries = {
  internalComm(root, { simulatorId }) {
    let comm = App.systems.filter(s => s.type === "InternalComm");
    if (simulatorId) comm = comm.filter(s => s.simulatorId === simulatorId);
    return comm;
  }
};

export const InternalCommMutations = {
  internalCommConnectOutgoing(root, args, context) {
    App.handleEvent(args, "internalCommConnectOutgoing", context);
  },
  internalCommConnectIncoming(root, args, context) {
    App.handleEvent(args, "internalCommConnectIncoming", context);
  },
  internalCommCancelIncoming(root, args, context) {
    App.handleEvent(args, "internalCommCancelIncoming", context);
  },
  internalCommCancelOutgoing(root, args, context) {
    App.handleEvent(args, "internalCommCancelOutgoing", context);
  },
  internalCommCallIncoming(root, args, context) {
    App.handleEvent(args, "internalCommCallIncoming", context);
  },
  internalCommCallOutgoing(root, args, context) {
    App.handleEvent(args, "internalCommCallOutgoing", context);
  }
};

export const InternalCommSubscriptions = {
  internalCommUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId)
        rootValue = rootValue.filter(s => s.simulatorId === simulatorId);
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("internalCommUpdate"),
      rootValue => rootValue.length
    )
  }
};
