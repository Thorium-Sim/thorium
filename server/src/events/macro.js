import App from "../app";
import { pubsub } from "../helpers/subscriptionManager";
import * as Classes from "../classes";

function performAction(id, action) {
  const macro = App.macros.find(s => s.id === id);
  if (!macro) return;
  action(macro);
  pubsub.publish("macrosUpdate", App.macros);
}
function performButtonAction(id, action) {
  const macro = App.macroButtonConfigs.find(s => s.id === id);
  if (!macro) return;
  action(macro);
  pubsub.publish("macroButtonsUpdate", App.macroButtonConfigs);
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

App.on("addMacroButtonConfig", ({ name, cb }) => {
  const macroButton = new Classes.MacroButtonConfig({ name });
  App.macroButtonConfigs.push(macroButton);
  pubsub.publish("macroButtonsUpdate", App.macroButtonConfigs);
  cb && cb(macroButton.id);
});
App.on("removeMacroButtonConfig", ({ id }) => {
  App.macroButtonConfigs = App.macroButtonConfigs.filter(m => m.id !== id);
  pubsub.publish("macroButtonsUpdate", App.macroButtonConfigs);
});
App.on("renameMacroButtonConfig", ({ id, name }) => {
  performButtonAction(id, macro => macro.rename(name));
});
App.on("addMacroButton", ({ configId, name, cb }) => {
  performButtonAction(configId, macro => {
    const button = macro.addButton(name);
    cb && cb(button.id);
  });
});
App.on("removeMacroButton", ({ configId, id }) => {
  performButtonAction(configId, macro => macro.removeButton(id));
});
App.on("renameMacroButton", ({ configId, id, name }) => {
  performButtonAction(configId, macro => macro.getButton(id).rename(name));
});
App.on("setMacroButtonCategory", ({ configId, id, category }) => {
  performButtonAction(configId, macro =>
    macro.getButton(id).setCategory(category)
  );
});
App.on("setMacroButtonColor", ({ configId, id, color }) => {
  performButtonAction(configId, macro => macro.getButton(id).setColor(color));
});
App.on("updateMacroButtonActions", ({ configId, id, actions }) => {
  performButtonAction(configId, macro =>
    macro.getButton(id).setActions(actions)
  );
});
App.on("triggerMacroButton", ({ simulatorId, configId, buttonId }) => {
  const macro = App.macroButtonConfigs.find(s => s.id === configId);
  const button = macro.getButton(buttonId);
  // Don't allow a macro to trigger itself
  const macros = button.actions;
  if (macros.length > 0)
    App.handleEvent({ simulatorId, macros }, "triggerMacros");
});
