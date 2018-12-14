import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

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

App.on("executeCommandLine", ({ simulatorId, command, arg = "", callback }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  const com = App.commandLine
    .filter(c => c.simulatorId === simulatorId)
    .reduce(
      (prev, next) => prev.concat(next.getCommand(command, arg, simulator)),
      []
    )[0];
  // Only allow a single command. Keeps things simpler.
  if (!com) return callback(`command not found: ${command}`);
  if (arg.toLowerCase() === "help" || (!arg && com.needsArg)) {
    return callback(com.help);
  }
  if (com.options.map(o => o.toLowerCase()).indexOf(arg.toLowerCase()) === -1)
    return callback(com.error);
  App.handleEvent({ simulatorId, macros: com.triggers }, "triggerMacros");
  return callback(com.output);
});
