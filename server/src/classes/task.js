import uuid from "uuid";
import App from "../app";
import taskDefinitions from "../tasks";
import { randomFromList } from "./generic/damageReports/constants";

export default class Task {
  constructor(params = {}) {
    // The check to see if the task is relevant was already handled
    // before this task was instantiated

    this.id = params.id || uuid.v4();
    this.class = "Task";

    // The static object which defines the values and
    // methods for the task
    this.definition = params.definition || "Generic";

    // The values from the task template are stamped onto the task when it is created.

    // Get the random values provided by the task definition
    const definitionObject = taskDefinitions.find(
      t => t.name === this.definition
    );

    this.simulatorId = params.simulatorId || "";
    const simulator = App.simulators.find(s => s.id === this.simulatorId);
    const stations = definitionObject.stations
      ? definitionObject.stations({ simulator })
      : simulator.stations;
    this.station =
      params.station === "nothing" || !params.station
        ? stations.length > 0
          ? randomFromList(stations).name
          : "None"
        : params.station;

    this.taskTemplate = params.taskTemplate || "";

    // For damage reports
    this.systemId = params.systemId || "";

    // For security incidents
    this.deck = params.deck || "";
    this.room = params.room || "";

    const defintionValues = definitionObject.values
      ? Object.entries(definitionObject.values).reduce((prev, [key, value]) => {
          prev[key] = value.value({ simulator, stations: simulator.stations });
          return prev;
        }, {})
      : {};

    // Get the values determined by the task template or instantiated when the task is created

    let setValues = {};
    if (this.taskTemplate) {
      const template = App.taskTemplates.find(t => t.id === this.taskTemplate);
      if (template) {
        setValues = { ...template.values };
      }
    } else {
      setValues = params.values || {};
    }

    this.values = { ...defintionValues, ...setValues };

    // Task parameters
    this.verified = params.verified || false;
    this.dismissed = params.dismissed || false;
    this.verifyRequested = params.verifyRequested || false;

    // Timing
    this.startTime = new Date();
    this.endTime = null;
  }
  verify(dismiss) {
    this.verified = true;
    if (dismiss) this.dismissed = true;
    this.verifyRequested = false;
    this.endTime = new Date();
  }
  dismiss() {
    this.dismissed = true;
  }
  requestVerify() {
    this.verifyRequested = true;
  }
  denyVerify() {
    this.verifyRequested = false;
  }
}
