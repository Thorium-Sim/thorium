import uuid from "uuid";

function generateOptions(component, simulator) {
  const options = component.connectedComponents.find(
    c => c.component && c.component.name === "Options"
  );
  if (!options) return [];
  if (options.value && options.value !== "Stations")
    return options.value.split("\n");
  if (simulator) return simulator.stations.map(s => s.name).sort();
  return [];
}
function generateHelpText(component, length = "short", simulator) {
  const description = component.connectedComponents.find(
    c => c.component && c.component.name === "Description"
  );
  if (description && length === "short") return description.value;
  const options = generateOptions(component, simulator);
  let optionsText = description ? description.value + "\n" : "";
  if (options && options.length > 0) {
    optionsText += "Available Options:\n";
    if (options.value)
      optionsText += options.value
        .split("\n")
        .map(v => `\t${v}`)
        .join("\n");
    // The default is the stations on the simulator
    if (simulator)
      optionsText += simulator.stations.map(s => `\t${s.name}`).join("\n");
  }
  return optionsText;
}

function generateTriggerActions(component, simulator = {}, argument) {
  return component.connectedComponents
    .filter(c => c.inputNode === "trigger")
    .map(c => ({
      event: c.component.name.replace("macro-", ""),
      delay: c.config.delay || 0,
      args: component.connectedComponents
        .filter(o => c.id === o.id && o.inputNode !== "trigger")
        .map(
          o =>
            o.outputNode.indexOf("argument") > -1 && {
              [o.inputNode]: argument
            }
        )
        .reduce((prev, next) => ({ ...prev, ...next }), c.value || {})
    }));
}

export default class CommandLine {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "CommandLine";

    this.simulatorId = params.simulatorId || null;
    this.templateId = params.templateId || null;

    this.name = params.name || "Command Line";

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
  get commands() {
    return this.getRawCommands()
      .map(c => ({
        name: c.name,
        help: generateHelpText(c, "short"),
        hidden: c.config.hidden
      }))
      .filter((a, i, arr) => arr.indexOf(a) === i && Boolean);
  }
  getRawCommands() {
    return this.components
      .filter(c => c.component && c.component.name === "Command")
      .map(c => ({
        id: c.id,
        config: this.config[c.id] || {},
        name: this.values[c.id]
      }))
      .map(c => {
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
      })
      .map(c => {
        const output = c.connectedComponents.find(
          o => o.outputNode === "output"
        );
        const error = c.connectedComponents.find(o => o.outputNode === "error");

        return {
          ...c,
          output: output ? output.value : "Command sent.",
          error: error ? error.value : "Unknown error in command."
        };
      });
  }
  getHelp() {
    return this.getRawCommands().map(c => ({
      ...c,
      help: generateHelpText(c, "short")
    }));
  }
  getCommand(command, argument = "", simulator) {
    return this.getRawCommands()
      .filter(c => c.name === command)
      .map(c => ({
        ...c,
        options: generateOptions(c, simulator),
        needsArg: c.connectedComponents.find(c => c.outputNode === "argument"),
        output: c.output.replace(/#ARG/gi, argument),
        error: c.error.replace(/#ARG/gi, argument),
        help: generateHelpText(c, "long", simulator),
        triggers: generateTriggerActions(c, simulator, argument)
      }));
  }
}
