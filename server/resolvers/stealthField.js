import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const StealthFieldQueries = {
  stealthField(root, { simulatorId }) {
    let returnVal = App.systems.filter(s => s.type === "StealthField");
    if (simulatorId) {
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const StealthFieldMutations = {
  setStealthActivated(rootValue, args, context) {
    App.handleEvent(args, "setStealthActivated", context);
  },
  setStealthCharge(rootValue, args, context) {
    App.handleEvent(args, "setStealthCharge", context);
  },
  activateStealth(rootValue, args, context) {
    App.handleEvent(args, "activateStealth", context);
  },
  deactivateStealth(rootValue, args, context) {
    App.handleEvent(args, "deactivateStealth", context);
  },
  setStealthQuadrant(rootValue, args, context) {
    App.handleEvent(args, "setStealthQuadrant", context);
  },
  fluxStealthQuadrants(rootValue, args, context) {
    App.handleEvent(args, "fluxStealthQuadrants", context);
  }
};

export const StealthFieldSubscriptions = {
  stealthFieldUpdate: {
    resolve(rootValue, { simulatorId }) {
      let returnRes = rootValue;
      if (simulatorId)
        returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
      return returnRes;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("stealthFieldUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};

export const StealthFieldTypes = {
  StealthField: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    }
  }
};
