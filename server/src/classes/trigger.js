import uuid from "uuid";

export default class Trigger {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Trigger";

    this.simulatorId = params.simulatorId || null;
    this.templateId = params.templateId || null;

    this.name = params.name || "Generic Trigger";

    // Have a place to store all of the diagram stuff.
    this.components = params.components || [];
    this.connections = params.connections || [];
    this.values = params.values || [];
    this.config = params.config || [];
  }
  rename(name) {
    this.name = name;
  }
  update({ components, connections, values, config }) {
    if (components) this.components = components;
    if (connections) this.connections = connections;
    if (values) this.values = values;
    if (config) this.config = config;
  }
}
