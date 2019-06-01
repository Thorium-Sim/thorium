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
    let output = null;
    // Send the original input
    simulator.addCommandLineOutput(client.id, `> ${command}`);

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
    }
    if (output) {
      simulator.addCommandLineOutput(client.id, output);
    }
    const coms = App.commandLine
      .filter(c => c.simulatorId === simulatorId)
      .reduce(
        (prev, next) => prev.concat(next.getCommand(command, arg, simulator)),
        []
      );
    if (!output && coms.length === 0) {
      simulator.addCommandLineOutput(
        client.id,
        `command not found: ${command}`
      );
    }
    coms.forEach(com => {
      let output = ``;
      if (!com) {
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
        } else if (com.output.text) {
          simulator.addCommandLineOutput(client.id, com.output.text);

          const id = uuid.v4();
          simulator.addCommandLineFeedback(client.id, {
            id,
            command,
            clientId: client.id,
            simulatorId: simulator.id,
            ...com.output
          });
          if (parseInt(com.output.timeout, 10)) {
            setTimeout(() => {
              if (
                simulator.commandLineFeedback[client.id].find(c => c.id === id)
              ) {
                simulator.removeCommandLineFeedback(client.id, id);
                simulator.addCommandLineOutput(client.id, com.output.fallback);

                pubsub.publish("clientChanged", App.clients);
                pubsub.publish("commandLineOutputUpdate", {
                  id: client.id,
                  commandLineOutput: simulator.commandLineOutputs[client.id]
                });
              }
            }, parseInt(com.output.timeout, 10));
          }
          return;
        }
      }
      simulator.addCommandLineOutput(client.id, output);
    });
    pubsub.publish("commandLineOutputUpdate", {
      id: client.id,
      commandLineOutput: simulator.commandLineOutputs[client.id]
    });
    pubsub.publish("clientChanged", App.clients);
  }
);

function processCommandLineOutput(simulator, clientId, com) {
  let output = "";
  if (typeof com.output === "string") {
    output = com.output;
  } else if (com.output.delay && com.output.text) {
    const strings = com.output.text.split("\n");
    strings.reduce((acc, string) => {
      return acc.then(() =>
        delayPromise(() => {
          simulator.addCommandLineOutput(clientId, string);
          pubsub.publish("commandLineOutputUpdate", {
            id: clientId,
            commandLineOutput: simulator.commandLineOutputs[clientId]
          });
        }, com.output.delay)
      );
    }, Promise.resolve());
    return;
  }
  simulator.addCommandLineOutput(clientId, output);
}
App.on(
  "handleCommandLineFeedback",
  ({ simulatorId, clientId, feedbackId, isApproved }) => {
    const simulator = App.simulators.find(s => s.id === simulatorId);
    const feedback = simulator.commandLineFeedback[clientId].find(
      c => c.id === feedbackId
    );
    if (!feedback) return;
    if (isApproved) {
      if (feedback.triggers && feedback.triggers.length) {
        App.handleEvent(
          { simulatorId, macros: feedback.triggers },
          "triggerMacros"
        );
      }
      if (feedback.approve) {
        processCommandLineOutput(simulator, clientId, {
          output: feedback.approve
        });
      }
    } else {
      if (feedback.deny) {
        processCommandLineOutput(simulator, clientId, {
          output: feedback.deny
        });
      }
    }
    simulator.removeCommandLineFeedback(clientId, feedbackId);

    pubsub.publish("commandLineOutputUpdate", {
      id: clientId,
      commandLineOutput: simulator.commandLineOutputs[clientId]
    });
    pubsub.publish("clientChanged", App.clients);
  }
);
App.on("addCommandLineOutput", ({ simulatorId, clientId, output }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  simulator.addCommandLineOutput(clientId, output);
  pubsub.publish("commandLineOutputUpdate", {
    id: clientId,
    commandLineOutput: simulator.commandLineOutputs[clientId]
  });
  pubsub.publish("clientChanged", App.clients);
});
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
