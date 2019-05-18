import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

function performAction(id, action) {
  const sys = App.commandLine.find(s => s.id === id);
  if (sys) {
    action(sys);
  }
  pubsub.publish("commandLineUpdate", App.commandLine);
}

App.on("addCommandLine", ({ name }) => {
  App.commandLine.push(new Classes.CommandLine({ name }));
  pubsub.publish("commandLineUpdate", App.commandLine);
});

App.on("renameCommandLine", ({ id, name }) => {
  performAction(id, c => c.rename(name));
});

App.on("removeCommandLine", ({ id }) => {
  App.commandLine = App.commandLine.filter(c => c.id !== id);
  pubsub.publish("commandLineUpdate", App.commandLine);
});

App.on(
  "updateCommandLine",
  ({ id, components, connections, values, config }) => {
    performAction(id, c =>
      c.update({ components, connections, values, config })
    );
  }
);

App.on(
  "executeCommandLine",
  ({ simulatorId, command, arg = "", context: { client }, cb }) => {
    const simulator = App.simulators.find(s => s.id === simulatorId);
    const com = App.commandLine
      .filter(c => c.simulatorId === simulatorId)
      .reduce(
        (prev, next) => prev.concat(next.getCommand(command, arg, simulator)),
        []
      )[0];

    // Send the original input
    client.addCommandLineOutput(`> ${command}`);
    pubsub.publish("commandLineOutputUpdate", client);

    let output = `command not found: ${command}`;
    // Only allow a single command. Keeps things simpler.
    if (command.toLowerCase().trim() === "help") {
      output = App.commandLine
        .filter(c => c.simulatorId === simulatorId)
        .reduce((prev, next) => prev.concat(next.commands), [])
        .filter(c => !c.hidden)
        .map(c => `${c.name}${c.help ? ": " : ""}${c.help}`)
        .join("\n");
    } else if (command.toLowerCase().trim() === "programmer") {
      output = "Alex Anderson 🚀";
    } else if (["clear", "cls"].includes(command.toLowerCase().trim())) {
      output = "";
      client.clearCommandLine();
    } else if (!com) {
    } else if (arg.toLowerCase() === "help" || (!arg && com.needsArg)) {
      output = com.help;
    } else if (
      com.options.length > 0 &&
      com.options.map(o => o.toLowerCase()).indexOf(arg.toLowerCase()) === -1
    ) {
      output = com.error;
    } else {
      App.handleEvent({ simulatorId, macros: com.triggers }, "triggerMacros");
      output = com.output;
    }
    client.addCommandLineOutput(output);
    pubsub.publish("commandLineOutputUpdate", client);
  }
);

App.on("addCommandLineToSimulator", ({ simulatorId, commandLine }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  const commandLineData = App.commandLine.find(s => s.id === commandLine);
  if (!simulator || !commandLineData) return;
  const id = uuid.v4();
  const commandLineObj = {
    ...commandLineData,
    templateId: commandLineData.id,
    id,
    simulatorId
  };
  App.commandLine.push(new Classes.CommandLine(commandLineObj));
});

App.on("removeCommandLineFromSimulator", ({ simulatorId, commandLine }) => {
  App.commandLine = App.commandLine.filter(c => {
    if (!c.templateId) return true;
    if (c.templateId === commandLine || c.id === commandLine) return false;
    return true;
  });
});
