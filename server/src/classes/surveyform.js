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
    this.active = params.active || false;
    this.googleSpreadsheet = params.googleSpreadsheet || null;
    this.googleSpreadsheetName = params.googleSpreadsheetName || null;
    this.googleSheet = params.googleSheet || null;
  }
  updateForm(form) {
    if (Array.isArray(form)) {
      this.form = form;
    }
  }
  updateGoogleSheets(spreadsheedId, spreadsheetName, sheetId) {
    this.googleSpreadsheet = spreadsheedId;
    this.googleSpreadsheetName = spreadsheetName;
    this.googleSheet = sheetId;
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
