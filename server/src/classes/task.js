import uuid from "uuid";
import App from "../app";
import * as classes from "./";
import reportReplace from "../helpers/reportReplacer";

const tasks = [
  // Simple, generic task definition.
  // Always available, must be manually verified
  {
    name: "Generic",
    active() {
      return true;
    },
    values: {
      message: {
        input: () => "textarea",
        value: () => "This is a generic task."
      }
    },
    instructions({ simulator, requiredValues: { message } }) {
      return reportReplace(message, { simulator });
    },
    verify() {
      return false;
    }
  }
];

const taskDefinitions = Object.values(classes)
  .reduce((prev, c) => prev.concat(c.tasks), [])
  .filter(Boolean)
  .concat(tasks);

export default class Task {
  constructor(params = {}) {
    // The check to see if the task is relevant was already handled
    // before this task was instantiated

    this.id = params.id || uuid.v4();
    this.class = "Task";
    this.simulatorId = params.simulatorId || "";
    this.station = params.station || "";
    this.taskTemplate = params.taskTemplate || "";

    // For damage reports
    this.systemId = params.systemId || "";

    // For security incidents
    this.deck = params.deck || "";
    this.room = params.room || "";

    // The static object which defines the values and
    // methods for the task
    this.definition = params.definition || "Generic";

    // The values from the task template are stamped onto the task when it is created.

    // Get the random values provided by the task definition
    const simulator = App.simulators.find(s => s.id === this.simulatorId);
    const definitionObject = taskDefinitions.find(
      t => t.name === this.definition
    );
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
  }
  static tasks = tasks;
  verify(dismiss) {
    this.verified = true;
    if (dismiss) this.dismissed = true;
    this.verifyRequested = false;
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
