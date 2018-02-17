import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const SurveyFormQueries = {
  surveyform(root, { simulatorId }) {
    let returnVal = [];
    if (simulatorId)
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    return returnVal;
  }
};

export const SurveyFormMutations = {};

export const SurveyFormSubscriptions = {
  surveyformUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("surveyformUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
