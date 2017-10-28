import App from "../../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const ViewscreenQueries = {
  viewscreens(rootValue, { simulatorId }) {
    let viewscreens = App.clients.filter(s => s.station === "Viewscreen");
    if (simulatorId) {
      viewscreens = viewscreens.filter(v => v.simulatorId === simulatorId);
      return viewscreens.map(v =>
        App.viewscreens.find(
          av => av.id === v.id && av.simulatorId === simulatorId
        )
      );
    }
    return viewscreens.map(v => App.viewscreens.find(av => av.id === v.id));
  }
};

export const ViewscreenMutations = {
  updateViewscreenName(_, params, context) {
    App.handleEvent(params, "updateViewscreenName", context);
  },
  updateViewscreenComponent(_, params, context) {
    App.handleEvent(params, "updateViewscreenComponent", context);
  },
  updateViewscreenData(_, params, context) {
    App.handleEvent(params, "updateViewscreenData", context);
  },
  updateViewscreenAuto(_, params, context) {
    App.handleEvent(params, "updateViewscreenAuto", context);
  },
  setViewscreenToAuto(_, params, context) {
    App.handleEvent(params, "setViewscreenToAuto", context);
  }
};

export const ViewscreenSubscriptions = {
  viewscreensUpdate: {
    resolve(rootValue, { simulatorId }) {
      let viewscreens = App.clients.filter(s => s.station === "Viewscreen");
      if (simulatorId) {
        viewscreens = viewscreens.filter(v => v.simulatorId === simulatorId);
        return viewscreens.map(v =>
          rootValue.find(av => av.id === v.id && av.simulatorId === simulatorId)
        );
      }
      return viewscreens.map(v => rootValue.find(av => av.id === v.id));
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("viewscreensUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
