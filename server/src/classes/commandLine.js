import uuid from "uuid";

export default class CommandLine {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "CommandLine";

    this.name = params.name || "Command Line";

    // Have a place to store all of the diagram stuff.
    this.components = params.components || [];
    this.connections = params.components || [];
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
