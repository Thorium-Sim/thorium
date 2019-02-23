import uuid from "uuid";

export default class Interface {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Interface";

    this.simulatorId = params.simulatorId || null;
    this.templateId = params.templateId || null;

    this.name = params.name || "Generic Interface";

    this.deviceType = params.deviceType || null;

    // Have a place to store all of the diagram stuff.
    this.components = params.components || [];
    this.connections = params.connections || [];
    this.values = params.values || [];
    this.config = params.config || [];
  }

  rename(name) {
    this.name = name;
  }
  update({ deviceType, components, connections, values, config }) {
    if (deviceType) this.deviceType = deviceType;
    if (components) this.components = components;
    if (connections) this.connections = connections;
    if (values) this.values = values;
    if (config) this.config = config;
  }
}

export class InterfaceDevice {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "InterfaceDevice";
    this.name = params.name || "Generic Interface Device";
    this.width = params.width || 320;
    this.height = params.height || 568;
  }
  get isLandscape() {
    return this.width > this.height;
  }

  rename(name) {
    this.name = name;
  }
  update({ width, height }) {
    if (width) this.width = width;
    if (height) this.height = height;
  }
}
