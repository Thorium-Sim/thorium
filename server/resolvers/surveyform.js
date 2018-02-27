import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const SurveyFormQueries = {
  surveyform(root, { simulatorId, active }) {
    let returnVal = App.surveyForms.filter(
      s => (active ? s.active === true : true)
    );
    if (simulatorId) {
      return returnVal.filter(i => i.simulatorId === simulatorId);
    }
    return returnVal.filter(i => i.simulatorId === null);
  }
};

export const SurveyFormMutations = {
  createSurveyForm(root, args, context) {
    App.handleEvent(args, "createSurveyForm", context);
  },
  removeSurveyForm(root, args, context) {
    App.handleEvent(args, "removeSurveyForm", context);
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
    resolve(rootValue, { simulatorId, active }) {
      if (simulatorId) {
        return rootValue
          .filter(s => (active ? s.active === true : true))
          .filter(s => s.simulatorId === simulatorId);
      }
      return rootValue
        .filter(s => (active ? s.active === true : true))
        .filter(s => s.simulatorId === null);
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("surveyformUpdate"),
      rootValue => !!rootValue
    )
  }
};
