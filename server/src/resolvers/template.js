import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const TemplateQueries = {};

export const TemplateMutations = {};

export const TemplateSubscriptions = {
  templateUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("templateUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
