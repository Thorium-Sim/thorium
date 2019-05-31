import uuid from "uuid";
import { camelCase } from "change-case";
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
  processName(name) {
    return camelCase(name.replace("trigger", ""));
  }
  getTriggerActions(eventName, args) {
    return this.components
      .filter(c => this.processName(c.component.name) === eventName)
      .map(c => ({
        ...c,
        values: { ...this.values[c.id], ...args },
        config: this.config[c.id] || {}
      }))
      .map(comp => {
        // Get all of the connections which
        // 1) do not go to a switch
        // 2) which go to a switch that has the correct
        //    conditional value
        //const connections = []
        const processConnections = c => {
          // We are only worried about connections from the
          // components' trigger output nodes
          return this.connections
            .map(o => {
              if (o.from.id === c.id && o.from.nodeId === "triggerOut") {
                const comp = this.components.find(m => m.id === o.to.id);
                return {
                  id: comp.id,
                  name: comp.component.name,
                  config: this.config[comp.id],
                  values: this.values[comp.id]
                };
              }
              if (o.to.id === c.id && o.to.nodeId === "triggerOut") {
                const comp = this.components.find(m => m.id === o.from.id);
                return {
                  id: comp.id,
                  name: comp.component.name,
                  config: this.config[comp.id],
                  values: this.values[comp.id]
                };
              }
              return null;
            })
            .filter(Boolean)
            .reduce((prev, o) => {
              if (o.name === "Switch") {
                // Check to see if it's check matches the input check
                const checkInput = this.connections.find(
                  c =>
                    (c.from.id === o.id && c.from.nodeId === "check") ||
                    (c.to.id === o.id && c.to.nodeId === "check")
                );
                if (!checkInput) return null;
                const checkValue = o.config && o.config.check;
                const compId =
                  checkInput.from.id === o.id
                    ? checkInput.to.id
                    : checkInput.from.id;
                const checkKey =
                  checkInput.from.id === o.id
                    ? checkInput.to.nodeId
                    : checkInput.from.nodeId;
                const checkValues =
                  comp.id === compId ? comp.values : this.values[compId];
                // Do a loose check
                if (checkValues[checkKey] == checkValue) {
                  return prev.concat(processConnections(o));
                }
                return prev;
              }
              return prev.concat(o);
            }, []);
        };
        const macros = processConnections(comp).map(c => ({
          id: c.id,
          event: c.name.replace("macro-", ""),
          args: { ...c.config, ...c.values },
          delay: c.config && c.config.delay ? c.config.delay : 0
        }));
        return { ...comp, macros };
      });
  }
}
