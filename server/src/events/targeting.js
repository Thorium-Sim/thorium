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
    type: "Targeting",
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
    s =>
      s.simulatorId === system.simulatorId &&
      s.class === "Sensors" &&
      s.domain === "external"
  );

  system.destroyTarget(targetId);

  // Remove the contact from Sensors
  if (sensors.contacts.find(c => c.id === classId)) {
    sensors.destroyContact({ id: classId });
    pubsub.publish("sensorContactUpdate", sensors);

    // We should also remove the class, if there are none left
    if (!system.contacts.find(c => c.class === classId && c.id !== targetId)) {
      setTimeout(() => {
        App.handleEvent({ id, classId }, "removeTargetClass");
      }, 500);
    }
  }

  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
});
App.on("addTargetClass", ({ id, classInput }) => {
  const sys = App.systems.find(s => s.id === id);
  sys && sys.addTargetClass(classInput);
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

App.on("clearAllTargetingContacts", ({ id, simulatorId }) => {
  const system = App.systems.find(
    s =>
      s.id === id || (s.simulatorId === simulatorId && s.type === "Targeting")
  );
  system.contacts = [];
  system.classes = [];
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

App.on("setTargetingRange", ({ id, range }) => {
  const system = App.systems.find(s => s.id === id);
  system.setRange(range);
  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
});

App.on("setTargetingClasses", ({ id, simulatorId, classInput }) => {
  const system = App.systems.find(
    s =>
      s.id === id || (s.simulatorId === simulatorId && s.type === "Targeting")
  );
  classInput.forEach(c => system.addTargetClass(c));
  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
});
