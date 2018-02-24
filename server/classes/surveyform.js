import uuid from "uuid";
import App from "../app";
export default class SurveyForm {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "SurveyForm";
    this.simulatorId = params.simulatorId || null;
    this.title = params.title || "Survey Form";
    this.form = params.form || [];
    this.results = params.results || [];
    this.active = false;
  }
  updateForm(form) {
    if (Array.isArray(form)) {
      this.form = form;
    }
  }
  addResults({ client, form }) {
    const clientObj = App.clients.find(c => c.id === client);
    const station = clientObj.station;
    const name = clientObj.loginName;
    if (Array.isArray(form)) {
      this.results = this.results.concat({ client, station, name, form });
    }
  }
}
