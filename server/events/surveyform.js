import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

App.on("createSurveyForm", ({ name }) => {
  const form = new Classes.SurveyForm({ name });
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
  const form = App.surveyForms.find(s => s.id === id);
  form.simulatorId = simulatorId;
  form.id = uuid.v4();
  App.surveyForms.push(form);

  // Trigger the hypercard for that simulator
});

App.on("surveyFormResponse", ({ id, response }) => {
  const form = App.surveyForms.find(s => s.id === id);
  form.addResults(response);
  App.surveyForms.push(form);
});
