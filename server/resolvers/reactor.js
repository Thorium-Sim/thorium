import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const ReactorQueries = {
  reactors(root, { simulatorId }) {
    let returnVal = App.systems.filter(s => s.type === "Reactor");
    if (simulatorId) {
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const ReactorMutations = {
  reactorEject(root, args, context) {
    App.handleEvent(args, "reactorEject", context);
  },
  reactorChangeOutput(root, args, context) {
    App.handleEvent(args, "reactorChangeOutput", context);
  },
  reactorChangeEfficiency(root, args, context) {
    App.handleEvent(args, "reactorChangeEfficiency", context);
  },
  reactorBatteryChargeLevel(root, args, context) {
    App.handleEvent(args, "reactorBatteryChargeLevel", context);
  },
  reactorBatteryChargeRate(root, args, context) {
    App.handleEvent(args, "reactorBatteryChargeRate", context);
  }
};

export const ReactorSubscriptions = {
  reactorUpdate: {
    resolve(rootValue, { simulatorId }) {
      let returnRes = rootValue;
      if (simulatorId)
        returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
      return returnRes;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("reactorUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
