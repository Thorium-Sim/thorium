import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const TractorBeamQueries = {
  tractorBeam(root, { simulatorId }) {
    let returnVal = App.systems.filter(s => s.type === "TractorBeam");
    if (simulatorId) {
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const TractorBeamMutations = {
  setTractorBeamState(rootValue, args, context) {
    App.handleEvent(args, "setTractorBeamState", context);
  },
  setTractorBeamTarget(rootValue, args, context) {
    App.handleEvent(args, "setTractorBeamTarget", context);
  },
  setTractorBeamStrength(rootValue, args, context) {
    App.handleEvent(args, "setTractorBeamStrength", context);
  },
  setTractorBeamStress(rootValue, args, context) {
    App.handleEvent(args, "setTractorBeamStress", context);
  },
  setTractorBeamScanning(rootValue, args, context) {
    App.handleEvent(args, "setTractorBeamScanning", context);
  },
  setTractorBeamTargetLabel(rootValue, args, context) {
    App.handleEvent(args, "setTractorBeamTargetLabel", context);
  },
  addTractorTarget(rootValue, args, context) {
    App.handleEvent(args, "addTractorTarget", context);
  },
  removeTractorTarget(rootValue, args, context) {
    App.handleEvent(args, "removeTractorTarget", context);
  }
};

export const TractorBeamSubscriptions = {
  tractorBeamUpdate: {
    resolve(rootValue, { simulatorId }) {
      let returnRes = rootValue;
      if (simulatorId)
        returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
      return returnRes;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("tractorBeamUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
