import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";

App.on("createTargetingContact", ({ id, targetClass }) => {
  App.systems.find(s => s.id === id).createTarget(targetClass);
  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
});
App.on("targetTargetingContact", ({ id, targetId }) => {
  const system = App.systems.find(s => s.id === id);
  system.targetTarget(targetId);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    station: "Core",
    title: `Targeted`,
    body: "",
    color: "info"
  });
  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      title: `Targeted`,
      component: "TargetingCore",
      body: null,
      color: "info"
    },
    "addCoreFeed"
  );
  // Send a sensors update too
  const sensors = App.systems.find(
    s => s.simulatorId === system.simulatorId && s.class === "Sensors"
  );
  pubsub.publish("sensorContactUpdate", sensors);
  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
});
App.on("untargetTargetingContact", ({ id, targetId }) => {
  const system = App.systems.find(s => s.id === id);
  system.untargetTarget(targetId);
  // Send a sensors update too
  const sensors = App.systems.find(
    s => s.simulatorId === system.simulatorId && s.class === "Sensors"
  );
  pubsub.publish("sensorContactUpdate", sensors);
  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
});
App.on("targetSystem", ({ id, targetId, system }) => {
  App.systems.find(s => s.id === id).targetSystem(targetId, system);
  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
});
App.on("removeTarget", ({ id, targetId }) => {
  const system = App.systems.find(s => s.id === id);
  const contact = system.contacts.find(c => c.id === targetId);
  const classId = contact.class;
  // Send a sensors update too
  const sensors = App.systems.find(
    s => s.simulatorId === system.simulatorId && s.class === "Sensors"
  );
  // Remove the contact from Sensors
  sensors.destroyContact({ id: classId });
  pubsub.publish("sensorContactUpdate", sensors);

  system.destroyTarget(targetId);

  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
});
App.on("addTargetClass", ({ id, classInput }) => {
  App.systems.find(s => s.id === id).addTargetClass(classInput);
  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
});
App.on("removeTargetClass", ({ id, classId }) => {
  const system = App.systems.find(s => s.id === id);
  system.removeTargetClass(classId);
  // Send a sensors update too
  const sensors = App.systems.find(
    s => s.simulatorId === system.simulatorId && s.class === "Sensors"
  );
  pubsub.publish("sensorContactUpdate", sensors);
  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
});
App.on("updateTargetClass", ({ id, classInput }) => {
  App.systems.find(s => s.id === id).updateTargetClass(classInput);
  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
});
App.on("setTargetClassCount", ({ id, classId, count }) => {
  App.systems.find(s => s.id === id).setTargetClassCount(classId, count);
  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
});
App.on(
  "setTargetingCalculatedTarget",
  ({ id, coordinates, simulatorId, contactId }) => {
    if (coordinates.z === 0) coordinates.z = Math.random();
    App.systems
      .find(
        s =>
          s.id === id ||
          (s.simulatorId === simulatorId && s.type === "Targeting")
      )
      .setCalculatedTarget(coordinates, contactId);
    pubsub.publish(
      "targetingUpdate",
      App.systems.filter(s => s.type === "Targeting")
    );
  }
);
App.on("setTargetingEnteredTarget", ({ id, simulatorId, coordinates }) => {
  App.systems
    .find(
      s =>
        s.id === id || (s.simulatorId === simulatorId && s.type === "Targeting")
    )
    .setEnteredTarget(coordinates);
  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
});
App.on("setCoordinateTargeting", ({ id, which }) => {
  App.systems.find(s => s.id === id).setCoordinateTargeting(which);
  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
});
