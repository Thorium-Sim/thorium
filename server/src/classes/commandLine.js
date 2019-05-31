import uuid from "uuid";
import App from "../app";

const standardOptions = ["Stations", "Library Entry Slugs"];
function generateOptions(component, simulator) {
  const options = component.connectedComponents.find(
    c => c.component && c.component.name === "Options"
  );
  if (!options) return [];
  if (options.value && !standardOptions.includes(options.value))
    return options.value.split("\n");
  if (options.value === "Stations" && simulator)
    return simulator.stations.map(s => s.name).sort();
  if (options.value === "Library Entry Slugs" && simulator)
    return App.libraryDatabase
      .filter(l => l.simulatorId === simulator.id)
      .map(l => l.slug);
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
    optionsText += options.map(v => `\t${v}`).join("\n");
  }
  // The default is the stations on the simulator
  else if (simulator) {
    optionsText += simulator.stations.map(s => `\t${s.name}`).join("\n");
  }
  return optionsText;
}

function generateTriggerActions(component, simulator = {}, args) {
  if (!component.connectedComponents) return [];
  return component.connectedComponents
    .filter(c => c.inputNode === "trigger")
    .map(c => ({
      id: c.id,
      event: c.component.name.replace("macro-", ""),
      delay: c.config.delay || 0,
      args: component.connectedComponents
        .filter(o => c.id === o.id && o.inputNode !== "trigger")
        .map(o => {
          if (o.outputNode === "argument1")
            return {
              [o.inputNode]: args[0]
            };
          if (o.outputNode === "argument2")
            return {
              [o.inputNode]: args[1]
            };
          return null;
        })
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
  getConnections = c => {
    this.connectionList.push(c.id);
    const connections = this.connections
      .map(o => {
        if (o.from.id === c.id) {
          if (this.connectionList.includes(o.to.id)) return null;
          const comp = this.components.find(m => m.id === o.to.id);
          const inputNode = o.to.nodeId;
          const outputNode = o.from.nodeId;
          if (comp) return { ...comp, inputNode, outputNode };
        }
        if (o.to.id === c.id) {
          if (this.connectionList.includes(o.from.id)) return null;
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
    return {
      ...c,
      connectedComponents: connections
        .map(this.getConnections)
        .map(this.getOutput)
    };
  };
  getOutput = c => {
    const output = c.connectedComponents.find(o => o.outputNode === "output");
    const error = c.connectedComponents.find(o => o.outputNode === "error");
    return {
      ...c,
      output: output ? output : { value: "Command sent." },
      error: error ? error : { value: "Unknown error in command." }
    };
  };
  getRawCommands() {
    this.connectionList = [];
    return this.components
      .filter(c => c.component && c.component.name === "Command")
      .map(c => ({
        id: c.id,
        config: this.config[c.id] || {},
        name: this.values[c.id]
      }))
      .map(this.getConnections)
      .map(this.getOutput);
  }
  getHelp() {
    return this.getRawCommands().map(c => ({
      ...c,
      help: generateHelpText(c, "short")
    }));
  }
  parseOutput(c, simulator, args) {
    if (typeof c.output.value === "string") {
      return c.output.value
        .replace(/#ARG1/gi, args[0])
        .replace(/#ARG2/gi, args[1]);
    }
    return {
      ...c.output.value,
      text:
        c.output.value.text &&
        c.output.value.text
          .replace(/#ARG1/gi, args[0])
          .replace(/#ARG2/gi, args[1]),
      fallback:
        c.output.value.fallback &&
        c.output.value.fallback
          .replace(/#ARG1/gi, args[0])
          .replace(/#ARG2/gi, args[1]),
      approve: c.output.output.value,
      deny: c.output.error.value,
      triggers: generateTriggerActions(c.output, simulator, args)
    };
  }
  getCommand(command, argument = "", simulator) {
    const args = argument.split(" ");
    return this.getRawCommands()
      .filter(c => c.name.toLowerCase().trim() === command.toLowerCase().trim())
      .map(c => ({
        ...c,
        connectedComponents: c.connectedComponents.map(cc => ({
          ...cc,
          triggers: generateTriggerActions(cc, simulator, args)
        })),
        options: generateOptions(c, simulator),
        needsArg: c.connectedComponents.find(c => c.outputNode === "argument"),
        output: this.parseOutput(c, simulator, args),
        error: c.error.value
          .replace(/#ARG1/gi, args[0])
          .replace(/#ARG2/gi, args[1]),
        help: generateHelpText(c, "long", simulator),
        triggers: generateTriggerActions(c, simulator, args)
      }));
  }
}
