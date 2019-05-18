import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

function delayPromise(action, delay) {
  return new Promise(resolve =>
    setTimeout(() => {
      action();
      return resolve(Promise.resolve());
    }, delay)
  );
}

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
    simulator.addCommandLineOutput(client.id, `> ${command}`);
    pubsub.publish("commandLineOutputUpdate", {
      id: client.id,
      commandLineOutput: simulator.commandLineOutputs[client.id]
    });

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
      client.clearCommandLine(client.id);
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
      if (typeof com.output === "string") {
        output = com.output;
      } else if (com.output.delay && com.output.text) {
        const strings = com.output.text.split("\n");
        const clientId = client.id;
        strings.reduce((acc, string) => {
          return acc.then(() =>
            delayPromise(() => {
              simulator.addCommandLineOutput(clientId, string);
              pubsub.publish("commandLineOutputUpdate", {
                id: client.id,
                commandLineOutput: simulator.commandLineOutputs[client.id]
              });
            }, com.output.delay)
          );
        }, Promise.resolve());
        return;
      }
    }
    simulator.addCommandLineOutput(client.id, output);
    pubsub.publish("commandLineOutputUpdate", {
      id: client.id,
      commandLineOutput: simulator.commandLineOutputs[client.id]
    });
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
