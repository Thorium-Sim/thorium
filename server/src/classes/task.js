import uuid from "uuid";
import App from "../app";
import * as classes from "./";

const taskDefinitions = Object.values(classes)
  .reduce((prev, c) => prev.concat(c.tasks), [])
  .filter(Boolean);
console.log(taskDefinitions);
export default class Task {
  static tasks = [
    // Simple, generic task definition.
    // Always available, must be manually verified
    {
      name: "Generic",
      active() {
        return true;
      },
      verify() {
        return false;
      }
    }
  ];
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || "";
    // For damage reports
    this.systemId = params.systemId || "";

    // For security incidents
    this.deck = params.deck || "";
    this.room = params.room || "";

    // The static object which defines the values and
    // methods for the task
    this.definition = params.definition || "Generic";

    const simulator = App.simulators.find(s => s.id === this.simulatorId);
    const definitionObject = taskDefinitions.find(
      t => t.name === this.definition
    );
    const defintionValues = definitionObject.values
      ? Object.entries(definitionObject.values).reduce((prev, [key, value]) => {
          prev[key] = value.value({ simulator, stations: simulator.stations });
        }, {})
      : {};

    // The task template is stamped onto the task when it is created.
    this.taskTemplate = params.taskTemplate || "";
    let setValues = {};
    if (this.taskTemplate) {
      const template = App.taskTemplates.find(t => t.id === this.taskTemplate);
      if (template) {
        setValues = { ...template.values };
      }
    } else {
      setValues = params.values || {};
    }

    // Task parameters
    this.verified = params.verified || false;
  }
}
