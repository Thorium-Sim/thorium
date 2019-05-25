import uuid from "uuid";
import App from "../app";

import { DateTime } from "luxon";

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
    const simulator = App.simulators.find(s => s.id === clientObj.simulatorId);
    const mission = App.missions.find(m => m.id === simulator.mission);
    const name = clientObj.loginName;

    if (Array.isArray(form)) {
      this.results = this.results.concat({ client, station, name, form });
    }

    // Process the results for Google Sheets
    if (this.googleSpreadsheet && this.googleSheet) {
      const headers = [
        "Timestamp",
        "Name",
        "Simulator",
        "Station",
        "Client",
        "Mission"
      ].concat(this.form.map(f => f.title));

      const values = [
        new DateTime("now").toFormat("D TT"),
        name,
        simulator.name,
        station,
        client,
        mission ? mission.name : ""
      ].concat(
        form.map(f => {
          if (this.form.find(m => m.id === f.id)) {
            const option = this.form
              .find(m => m.id === f.id)
              .options.filter(o => f.value.split(",").includes(o.id))
              .map(o => o.label)
              .join("; ");
            if (option) {
              return option;
            }
          }
          if (parseInt(f.value, 10)) {
            return parseInt(f.value, 10);
          }
          return f.value;
        })
      );

      App.handleEvent(
        {
          spreadsheetId: this.googleSpreadsheet,
          sheetId: this.googleSheet,
          headers,
          row: values
        },
        "googleSheetsAppendData"
      );
    }
  }
}
