import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";
App.on("createSurveyForm", ({ name }) => {
  const form = new Classes.SurveyForm({ title: name });
  App.surveyForms.push(form);
  pubsub.publish("surveyformUpdate", App.surveyForms);
});

App.on("removeSurveyForm", ({ id }) => {
  App.surveyForms = App.surveyForms.filter(s => s.id !== id);
  pubsub.publish("surveyformUpdate", App.surveyForms);
});

App.on("updateSurveyForm", ({ id, form }) => {
  const survey = App.surveyForms.find(s => s.id === id);
  survey.updateForm(form);
  pubsub.publish("surveyformUpdate", App.surveyForms);
});

App.on("triggerSurvey", ({ simulatorId, id }) => {
  // Duplicate the form with the simualtor id
  const form = Object.assign({}, App.surveyForms.find(s => s.id === id), {
    simulatorId,
    id: uuid.v4(),
    active: true
  });
  App.surveyForms.push(form);
  pubsub.publish("surveyformUpdate", App.surveyForms);

  // Trigger the hypercard for that simulator
  App.handleEvent(
    { simulatorId, component: "SurveyForm" },
    "setClientHypercard"
  );
});

App.on("surveyFormResponse", ({ id, response }) => {
  const form = App.surveyForms.find(s => s.id === id);
  form.addResults(response);
  pubsub.publish("surveyformUpdate", App.surveyForms);
});
