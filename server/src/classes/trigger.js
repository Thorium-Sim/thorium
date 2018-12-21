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
  getTrigger(eventName) {
    return this.components
      .filter(c => c.component.name === eventName)
      .map(c => ({
        ...c,
        config: this.config[c.id] || {}
      }))
      .map(c => {
        console.log(this.connections);
        const connections = this.connections
          .map(o => {
            if (o.from.id === c.id) {
              const comp = this.components.find(m => m.id === o.to.id);
              const inputNode = o.to.nodeId;
              const outputNode = o.from.nodeId;
              if (comp) return { ...comp, inputNode, outputNode };
            }
            if (o.to.id === c.id) {
              const comp = this.components.find(m => m.id === o.from.id);
              const inputNode = o.from.nodeId;
              const outputNode = o.to.nodeId;
              if (comp) return { ...comp, inputNode, outputNode };
            }
            return null;
          })
          .filter(Boolean)
          .map(c => ({
            ...c,
            config: this.config[c.id] || {},
            value: this.values[c.id]
          }));

        return { ...c, connectedComponents: connections };
      });
  }
}
