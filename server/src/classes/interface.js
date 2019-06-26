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
  triggerObject(objectId) {
    // Get all of the connections to macros
    this.values[objectId] = this.values[objectId] || {};
    const value = this.values[objectId];
    const component = this.components.find(o => o.id === objectId);
    let levelDirection = null;
    if (
      (value && (value.level || value.level === 0)) ||
      component.component.name === "Toggle"
    ) {
      this.values[objectId].level = value.level ? 0 : 1;
      levelDirection = value.level ? "up" : "down";
    }
    return this.connections
      .filter(({ to, from }) => to.id === objectId || from.id === objectId)
      .filter(({ to, from }) => {
        // Add handler for the toggle switch
        if (levelDirection) {
          if (
            to.nodeId === `triggerOut-${levelDirection}` ||
            from.nodeId === `triggerOut-${levelDirection}`
          )
            return true;
          return false;
        }
        return true;
      })
      .map(c => {
        if (c.to.nodeId === "trigger")
          return {
            ...this.components.find(comp => comp.id === c.to.id),
            values: this.values[c.to.id] || {},
            config: this.config[c.to.id] || {}
          };
        if (c.from.nodeId === "trigger")
          return {
            ...this.components.find(comp => comp.id === c.from.id),
            values: this.values[c.from.id] || {},
            config: this.config[c.from.id] || {}
          };
        return null;
      })
      .filter(Boolean)
      .map(comp => {
        return {
          id: comp.id,
          event: comp.component.name.replace("macro-", ""),
          args: comp.values,
          delay: 0
        };
      });
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
