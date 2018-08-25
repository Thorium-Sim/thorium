import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const CoolantQueries = {
  coolant(root, { simulatorId, systemId }) {
    let returnVal = App.systems.filter(s => s.type === "Coolant");
    if (simulatorId) {
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    if (systemId) returnVal = returnVal.filter(s => s.id === systemId);
    return returnVal;
  },
  systemCoolant(root, { simulatorId }) {
    return App.systems
      .filter(
        s =>
          s.simulatorId === simulatorId &&
          (s.coolant || s.coolant === 0) &&
          s.type !== "Coolant"
      )
      .map(s => {
        return {
          systemId: s.id,
          simulatorId: s.simulatorId,
          name: s.displayName || s.name,
          type: s.type,
          coolant: s.coolant
        };
      });
  }
};

export const CoolantMutations = {
  setCoolantTank(root, args, context) {
    App.handleEvent(args, "setCoolantTank", context);
  },
  transferCoolant(root, args, context) {
    if (args.which === "stop") {
      App.handleEvent(args, "cancelCoolantTransfer", context);
    } else {
      App.handleEvent(args, "transferCoolant", context);
    }
  }
};

export const CoolantSubscriptions = {
  coolantUpdate: {
    resolve(rootValue, { simulatorId }) {
      let returnRes = rootValue;
      if (simulatorId)
        returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
      return returnRes;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("coolantUpdate"),
      (rootValue, { simulatorId }) => {
        if (simulatorId)
          return !!rootValue.find(s => s.simulatorId === simulatorId);
        return true;
      }
    )
  },
  coolantSystemUpdate: {
    resolve(rootValue, { simulatorId, systemId }) {
      let returnRes = rootValue;
      if (simulatorId)
        returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
      if (systemId) returnRes = returnRes.filter(s => s.id === systemId);
      return returnRes;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("coolantSystemUpdate"),
      (rootValue, { simulatorId, systemId }) => {
        let returnRes = rootValue;
        if (simulatorId)
          returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
        if (systemId) returnRes = returnRes.filter(s => s.id === systemId);
        return returnRes.length > 0 ? true : false;
      }
    )
  }
};
