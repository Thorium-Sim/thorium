import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const TacticalMapQueries = {
  tacticalMaps(rootValue, { flightId, template }, context) {
    let returnVal = App.tacticalMaps;
    if (flightId) returnVal = returnVal.filter(m => m.flightId === flightId);
    if (template || template === false)
      returnVal = returnVal.filter(m => m.template === template);
    return returnVal;
  }
};

export const TacticalMapMutations = {
  newTacticalMap(rootValue, args, context) {
    App.handleEvent(args, "newTacticalMap", context);
  },
  updateTacticalMap(rootValue, args, context) {
    App.handleEvent(args, "updateTacticalMap", context);
  },
  freezeTacticalMap(rootValue, args, context) {
    App.handleEvent(args, "freezeTacticalMap", context);
  },
  duplicateTacticalMap(rootValue, args, context) {
    App.handleEvent(args, "duplicateTacticalMap", context);
  },
  loadTacticalMap(rootValue, args, context) {
    App.handleEvent(args, "loadTacticalMap", context);
  },
  addTacticalMapLayer(rootValue, args, context) {
    App.handleEvent(args, "addTacticalMapLayer", context);
  },
  updateTacticalMapLayer(rootValue, args, context) {
    App.handleEvent(args, "updateTacticalMapLayer", context);
  },
  removeTacticalMapLayer(rootValue, args, context) {
    App.handleEvent(args, "removeTacticalMapLayer", context);
  },
  addTacticalMapItem(rootValue, args, context) {
    App.handleEvent(args, "addTacticalMapItem", context);
  },
  updateTacticalMapItem(rootValue, args, context) {
    App.handleEvent(args, "updateTacticalMapItem", context);
  },
  removeTacticalMapItem(rootValue, args, context) {
    App.handleEvent(args, "removeTacticalMapItem", context);
  }
};

export const TacticalMapSubscriptions = {
  tacticalMapsUpdate: {
    resolve(rootValue, { flightId }) {
      let returnRes = rootValue;
      if (flightId) {
        returnRes = returnRes.filter(s => s.flightId === flightId);
      }
      return returnRes;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("tacticalMapsUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};

export const TacticalMapTypes = {
  TacticalMap: {
    flight(rootValue) {
      return App.flights.find(f => f.id === rootValue.flightId);
    }
  }
};
