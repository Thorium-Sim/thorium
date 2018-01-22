import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const TemplateQueries = {
  softwarePanels(rootQuery, { simulatorId }) {
    if (simulatorId) {
      return App.softwarePanels.filter(s => s.simulatorId === simulatorId);
    }
    return App.softwarePanels.filter(s => !s.simulatorId);
  }
};

export const TemplateMutations = {
  createSoftwarePanel(rootValue, args, context) {
    App.handleEvent(args, "createSoftwarePanel", context);
  },
  updateSoftwarePanel(rootValue, args, context) {
    App.handleEvent(args, "updateSoftwarePanel", context);
  },
  removeSoftwarePanel(rootValue, args, context) {
    App.handleEvent(args, "removeSoftwarePanel", context);
  }
};

export const TemplateSubscriptions = {
  softwarePanelsUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      }
      return rootValue.filter(s => !s.simulatorId);
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("softwarePanelsUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
