import App from "../app";
import { pubsub } from "../helpers/subscriptionManager";
import * as Classes from "../classes";

function performAction(id, action) {
  const macro = App.macros.find(s => s.id === id);
  if (!macro) return;
  action(macro);
  pubsub.publish("macrosUpdate", App.macros);
}

App.on("addMacro", ({ name, cb }) => {
  const macro = new Classes.Macro({ name });
  App.macros.push(macro);
  pubsub.publish("macrosUpdate", App.macros);
  cb && cb(macro.id);
});
App.on("removeMacro", ({ id }) => {
  App.macros = App.macros.filter(m => m.id !== id);
  pubsub.publish("macrosUpdate", App.macros);
});
App.on("renameMacro", ({ id, name }) => {
  performAction(id, m => m.rename(name));
});
App.on("updateMacroActions", ({ id, actions }) => {
  performAction(id, m => m.setActions(actions));
});
App.on("triggerMacroAction", ({ macroId, simulatorId }) => {
  const macro = App.macros.find(s => s.id === macroId);

  // Don't allow a macro to trigger itself
  const macros = macro.actions.filter(a => {
    const args = typeof a.args === "string" ? JSON.parse(a.args) : a.args;
    if (a.event === "triggerMacroAction" && args.macroId === macroId) {
      return false;
    }
    return true;
  });
  if (macros.length > 0)
    App.handleEvent({ simulatorId, macros }, "triggerMacros");
});
