import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";
import uuid from "uuid";
export const TacticalMapQueries = {
  tacticalMaps(rootValue, { flightId, template }) {
    let returnVal = App.tacticalMaps;
    if (flightId) returnVal = returnVal.filter(m => m.flightId === flightId);
    if (template || template === false) {
      returnVal = returnVal.filter(m => m.template === template);
    }
    return returnVal;
  }
};

export const TacticalMapMutations = {
  newTacticalMap(rootValue, args, context) {
    const id = uuid.v4();
    App.handleEvent(Object.assign({}, args, { id }), "newTacticalMap", context);
    return id;
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
    const newid = uuid.v4();
    App.handleEvent(
      Object.assign({}, args, { newid }),
      "loadTacticalMap",
      context
    );
    return newid;
  },
  removeTacticalMap(rootValue, args, context) {
    App.handleEvent(args, "removeTacticalMap", context);
  },
  addTacticalMapLayer(rootValue, args, context) {
    App.handleEvent(args, "addTacticalMapLayer", context);
  },
  updateTacticalMapLayer(rootValue, args, context) {
    App.handleEvent(args, "updateTacticalMapLayer", context);
  },
  reorderTacticalMapLayer(rootValue, args, context) {
    App.handleEvent(args, "reorderTacticalMapLayer", context);
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
  },
  addTacticalMapPath(rootValue, args, context) {
    App.handleEvent(args, "addTacticalMapPath", context);
  },
  updateTacticalMapPath(rootValue, args, context) {
    App.handleEvent(args, "updateTacticalMapPath", context);
  },
  removeTacticalMapPath(rootValue, args, context) {
    App.handleEvent(args, "removeTacticalMapPath", context);
  },
  showViewscreenTactical(rootValue, args, context) {
    App.handleEvent(args, "showViewscreenTactical", context);
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
      (rootValue, { flightId }) => {
        if (flightId) {
          return rootValue.filter(s => s.flightId === flightId).length > 0;
        }
        return !!(rootValue && rootValue.length);
      }
    )
  }
};

export const TacticalMapTypes = {
  TacticalMap: {
    flight(rootValue) {
      return App.flights.find(f => f.id === rootValue.flightId);
    }
  },
  TacticalLayer: {
    items(rootValue) {
      return rootValue.items.map(i =>
        Object.assign({}, i, {
          layerId: rootValue.id,
          locationJson: JSON.stringify(i.location)
        })
      );
    },
    paths(rootValue) {
      return rootValue.paths.map(i =>
        Object.assign({}, i, {
          layerId: rootValue.id
        })
      );
    }
  }
};
