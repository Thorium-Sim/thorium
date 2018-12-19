import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

function performAction(id, action) {
  const sys = App.triggerGroups.find(s => s.id === id);
  if (sys) {
    action(sys);
  }
  pubsub.publish("triggersUpdate", App.triggerGroups);
}

App.on("addTrigger", ({ name }) => {
  App.triggerGroups.push(new Classes.Trigger({ name }));
  pubsub.publish("triggersUpdate", App.triggerGroups);
});

App.on("renameTrigger", ({ id, name }) => {
  performAction(id, c => c.rename(name));
});

App.on("removeTrigger", ({ id }) => {
  App.triggerGroups = App.triggerGroups.filter(c => c.id !== id);
  pubsub.publish("triggersUpdate", App.triggerGroups);
});

App.on("updateTrigger", ({ id, components, connections, values, config }) => {
  performAction(id, c => c.update({ components, connections, values, config }));
});

App.on("addTriggerToSimulator", ({ simulatorId, trigger }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  const triggerData = App.triggerGroups.find(s => s.id === trigger);
  if (!simulator || !triggerData) return;
  const id = uuid.v4();
  const triggerObj = {
    ...triggerData,
    templateId: triggerData.id,
    id,
    simulatorId
  };
  App.triggerGroups.push(new Classes.Trigger(triggerObj));
});

App.on("removeTriggerFromSimulator", ({ simulatorId, trigger }) => {
  App.triggerGroups = App.triggerGroups.filter(c => {
    if (!c.templateId) return true;
    if (c.templateId === trigger || c.id === trigger) return false;
    return true;
  });
});
