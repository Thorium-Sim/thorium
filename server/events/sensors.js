import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";
// id always represents the ID of the sensor system
App.on("addSensorsArray", ({ simulatorId, domain }) => {
  const system = new Classes.Sensors({ simulatorId, domain });
  App.systems.push(system);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("removedSensorsArray", ({ id }) => {});
App.on("sensorScanRequest", ({ id, request }) => {
  const system = App.systems.find(sys => sys.id === id);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    station: "Core",
    title: `${system.domain} Scan`,
    body: request,
    color: "info"
  });
  App.handleEvent(
    { simulatorId: system.simulatorId, component: "SensorsCore" },
    "addCoreFeed"
  );
  system.scanRequested(request);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("sensorScanResult", ({ id, result }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.scanResulted(result);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("processedData", ({ id, simulatorId, domain, data }) => {
  let system;
  if (id) {
    system = App.systems.find(sys => sys.id === id);
  }
  if (simulatorId && domain) {
    system = App.systems.find(
      sys => sys.simulatorId === simulatorId && sys.domain === domain
    );
  }
  if (!system) {
    console.log("Please specify the domain when sending this data: ", data);
    return;
  }
  const simulator = App.simulators.find(s => s.id === system.simulatorId);
  system && system.processedDatad(data.replace(/#SIM/gi, simulator.name));
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("sensorScanCancel", ({ id }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.scanCanceled();
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    station: "Core",
    title: `${system.domain} Scan Cancelled`,
    body: "",
    color: "info"
  });
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("setPresetAnswers", ({ simulatorId, domain, presetAnswers }) => {
  const system = App.systems.find(
    sys => sys.simulatorId === simulatorId && sys.domain === domain
  );
  const simulator = App.simulators.find(s => s.id === system.simulatorId);
  system &&
    system.setPresetAnswers(
      presetAnswers.map(p => {
        return {
          label: p.label ? p.label.replace(/#SIM/gi, simulator.name) : "",
          value: p.value ? p.value.replace(/#SIM/gi, simulator.name) : ""
        };
      })
    );
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});

// Contacts
App.on("createSensorContact", ({ id, contact }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.createContact(contact);
  pubsub.publish("sensorContactUpdate", system.contacts);
});
App.on("moveSensorContact", ({ id, contact }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.moveContact(contact);
  pubsub.publish("sensorContactUpdate", system.contacts);
});
App.on("updateSensorContactLocation", ({ id, contact }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.updateContact(contact);
  pubsub.publish("sensorContactUpdate", system.contacts);
});
App.on("removeSensorContact", ({ id, contact }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.removeContact(contact);
  pubsub.publish("sensorContactUpdate", system.contacts);
});
App.on("removeAllSensorContacts", ({ id }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.contacts.concat().forEach(contact => {
    system.removeContact(contact);
  });
  pubsub.publish("sensorContactUpdate", system.contacts);
});
App.on("stopAllSensorContacts", ({ id }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.contacts.concat().forEach(contact => {
    system.stopContact(contact);
  });
  pubsub.publish("sensorContactUpdate", system.contacts);
});
App.on("destroySensorContact", ({ id, contact }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.destroyContact(contact);
  pubsub.publish("sensorContactUpdate", system.contacts);
});
App.on("updateSensorContact", ({ id, contact }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.updateContact(contact);
  pubsub.publish("sensorContactUpdate", system.contacts);
});

// Army Contacts
App.on("setArmyContacts", ({ simulatorId, domain, armyContacts }) => {
  const system = App.systems.find(
    sys => sys.simulatorId === simulatorId && sys.domain === domain
  );
  system && system.setArmyContacts(armyContacts);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("createSensorArmyContact", ({ id, contact }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.createArmyContact(contact);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("removeSensorArmyContact", ({ id, contact }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.removeArmyContact(contact);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("updateSensorArmyContact", ({ id, contact }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.updateArmyContact(contact);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("nudgeSensorContacts", ({ id, amount, speed, yaw }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.nudgeContacts(amount, speed, yaw);
  pubsub.publish(
    "sensorContactUpdate",
    system.contacts.map(c => Object.assign({}, c, { forceUpdate: true }))
  );
  // Reset the force update after a second.
  setTimeout(() => pubsub.publish("sensorContactUpdate", system.contacts), 500);
});
App.on("setSensorPingMode", ({ id, mode }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.setPingMode(mode);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("pingSensors", ({ id }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.timeSincePing = 0;
  pubsub.publish("sensorsPing", id);
});

App.on("setSensorsHistory", ({ id, history }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.history = history;

  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});

App.on("newSensorScan", ({ id, scan }) => {
  const sensors = App.systems.find(sys => sys.id === id);
  sensors.newScan(scan);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("updateSensorScan", ({ id, scan }) => {
  const sensors = App.systems.find(sys => sys.id === id);
  sensors.updateScan(scan);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("cancelSensorScan", ({ id, scan }) => {
  const sensors = App.systems.find(sys => sys.id === id);
  sensors.cancelScan(scan);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("toggleSensorsAutoTarget", ({ id, target }) => {
  const sensors = App.systems.find(sys => sys.id === id);
  sensors.setAutoTarget(target);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("setSensorsSegment", ({ id, segment, state }) => {
  const sensors = App.systems.find(sys => sys.id === id);
  sensors.setSegment(segment, state);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
