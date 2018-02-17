import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const SurveyFormQueries = {
  surveyform(root, { simulatorId }) {
    let returnVal = App.surveyForms;
    if (simulatorId) {
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const SurveyFormMutations = {
  createSurveyForm(root, args, context) {
    App.handleEvent(args, "createForm", context);
  },
  removeSurveyForm(root, args, context) {
    App.handleEvent(args, "removeForm", context);
  },
  updateSurveyForm(root, args, context) {
    App.handleEvent(args, "updateSurveyForm", context);
  },
  triggerSurvey(root, args, context) {
    App.handleEvent(args, "triggerSurvey", context);
  },
  surveyFormResponse(root, args, context) {
    App.handleEvent(args, "surveyFormResponse", context);
  }
};

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
