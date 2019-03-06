import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import { titleCase } from "change-case";
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
    type: `${titleCase(system.domain)} Sensors`,
    station: "Core",
    title: `${titleCase(system.domain)} Scan`,
    body: request,
    color: "info"
  });
  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      component: "SensorsCore",
      title: `${titleCase(system.domain)} Scan`,
      body: request,
      color: "info"
    },
    "addCoreFeed"
  );

  system.scanRequested(request);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
  if (system.training) {
    setTimeout(() => {
      App.handleEvent(
        { id, result: "None Detected (Training Mode)" },
        "sensorScanResult",
        { clientId: "training", simulatorId: system.simulatorId }
      );
    }, 5000);
  }
});
App.on("sensorScanResult", ({ id, result }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.scanResulted(result);
  const simulator = App.simulators.find(s => s.id === system.simulatorId);
  const stations = simulator.stations.filter(s =>
    s.cards.find(
      c =>
        c.component ===
        (system.domain === "external" ? "SensorScans" : "SecurityScans")
    )
  );
  stations.forEach(s => {
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: system.simulatorId,
      station: s.name,
      title: `Sensor Scan Answered`,
      body: result,
      color: "info",
      relevantCards:
        system.domain === "external"
          ? ["SensorScans", "Sensors", "sensors"]
          : ["SecurityScans"]
    });
  });
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on(
  "processedData",
  ({ id, simulatorId, domain = "external", data, flash }) => {
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
    const stations = simulator.stations.filter(s =>
      s.cards.find(
        c => c.component === "Sensors" || c.component === "JrSensors"
      )
    );
    stations.forEach(s => {
      if (flash) {
        const cardName = s.cards.find(
          c => c.component === "Sensors" || c.component === "JrSensors"
        ).name;
        App.handleEvent(
          {
            action: "changeCard",
            message: cardName,
            simulatorId: system.simulatorId,
            stationId: s.name
          },
          "triggerAction"
        );
        App.handleEvent(
          {
            action: "flash",
            simulatorId: system.simulatorId,
            stationId: s.name
          },
          "triggerAction"
        );
      }
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId: system.simulatorId,
        station: s.name,
        title: `New Processed Data`,
        body: data,
        color: "info",
        relevantCards: ["Sensors", "JrSensors", "sensors"]
      });
    });
  }
);
App.on("sensorScanCancel", ({ id }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.scanCanceled();
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    type: `${titleCase(system.domain)} Sensors`,
    station: "Core",
    title: `${titleCase(system.domain)} Scan Cancelled`,
    body: "",
    color: "info"
  });
  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      title: `${system.domain} Scan Cancelled`,
      component: "SensorsCore",
      body: null,
      color: "warning"
    },
    "addCoreFeed"
  );
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on(
  "setPresetAnswers",
  ({ simulatorId, domain = "external", presetAnswers }) => {
    const system = App.systems.find(
      sys =>
        sys.simulatorId === simulatorId &&
        sys.domain === domain &&
        sys.class === "Sensors"
    );
    if (!system) {
      console.error(
        "Invalid system. You probably forgot to add the domain to the sensors macro"
      );
      return;
    }
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
  }
);

// Contacts
App.on("createSensorContact", ({ id, contact }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.createContact(contact);
  pubsub.publish("sensorContactUpdate", system);
});
App.on("createSensorContacts", ({ id, contacts }) => {
  const system = App.systems.find(sys => sys.id === id);
  contacts.forEach(c => {
    system.createContact(c);
  });
  pubsub.publish("sensorContactUpdate", system);
});
App.on("moveSensorContact", ({ id, contact }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.moveContact(contact);
  pubsub.publish("sensorContactUpdate", system);
});
App.on("updateSensorContactLocation", ({ id, contact, cb }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.updateContact(contact);
  pubsub.publish("sensorContactUpdate", system);
  cb && cb();
});
App.on("removeSensorContact", ({ id, contact, cb }) => {
  const system = App.systems.find(sys => sys.id === id);
  const classId = contact.id;
  system.removeContact(contact);

  // Get rid of any targeting classes
  const targeting = App.systems.find(
    s => s.simulatorId === system.simulatorId && s.class === "Targeting"
  );
  targeting.removeTargetClass(classId);
  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
  pubsub.publish("sensorContactUpdate", system);
  cb && cb();
});
App.on("removeAllSensorContacts", ({ id, type }) => {
  const system = App.systems.find(sys => sys.id === id);

  let removeContacts = [];
  if (type) {
    removeContacts = system.contacts.filter(c => type.indexOf(c.type) > -1);
    system.contacts = system.contacts.filter(c => type.indexOf(c.type) === -1);
  } else {
    removeContacts = system.contacts.concat();
    system.contacts = [];
  }
  // Also remove any contacts from targeting
  if (removeContacts.length > 0) {
    const targeting = App.systems.find(
      s => s.simulatorId === system.simulatorId && s.class === "Targeting"
    );

    removeContacts.forEach(c => {
      if (targeting.classes.find(t => t.id === c.id)) {
        targeting.removeTargetClass(c.id);
      }
    });
    pubsub.publish(
      "targetingUpdate",
      App.systems.filter(s => s.type === "Targeting")
    );
  }
  pubsub.publish("sensorContactUpdate", system);
});
App.on("stopAllSensorContacts", ({ id }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.contacts.concat().forEach(contact => {
    system.stopContact(contact);
  });
  pubsub.publish("sensorContactUpdate", system);
});
App.on("destroySensorContact", ({ id, contact, contacts = [] }) => {
  const system = App.systems.find(sys => sys.id === id);
  // Also remove the contact from targeting
  const targeting = App.systems.find(
    s => s.simulatorId === system.simulatorId && s.class === "Targeting"
  );
  let update = false;
  if (contact) {
    system.destroyContact({ id: contact });
    if (targeting.classes.find(t => t.id === contact)) {
      update = true;
      setTimeout(() => {
        targeting.removeTargetClass(contact);
      }, 1000);
    }
  } else {
    contacts.forEach(c => {
      system.destroyContact({ id: c });
      if (targeting.classes.find(t => t.id === c)) {
        update = true;
        setTimeout(() => {
          targeting.removeTargetClass(c);
        }, 1000);
      }
    });
  }
  pubsub.publish("sensorContactUpdate", system);
  if (update)
    setTimeout(() => {
      pubsub.publish(
        "targetingUpdate",
        App.systems.filter(s => s.type === "Targeting")
      );
    }, 1100);
});
App.on("updateSensorContact", args => {
  const { id, simulatorId, contact, cb } = args;
  const system = App.systems.find(
    sys =>
      sys.id === id ||
      (sys.simulatorId === simulatorId &&
        sys.class === "Sensors" &&
        sys.domain === "external")
  );
  system.updateContact(contact);
  pubsub.publish("sensorContactUpdate", system);
  cb && cb();
});

// Army Contacts
App.on(
  "setArmyContacts",
  ({ simulatorId, domain = "external", armyContacts }) => {
    const system = App.systems.find(
      sys => sys.simulatorId === simulatorId && sys.domain === domain
    );
    system && system.setArmyContacts(armyContacts);
    pubsub.publish(
      "sensorsUpdate",
      App.systems.filter(s => s.type === "Sensors")
    );
  }
);
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
    Object.assign({}, system, {
      contacts: system.contacts.map(c =>
        Object.assign({}, c, { forceUpdate: true })
      )
    })
  );
  // Reset the force update after a second.
  setTimeout(() => pubsub.publish("sensorContactUpdate", system), 500);
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
  App.handleEvent(
    {
      simulatorId: sensors.simulatorId,
      title: `New Sensor Scan`,
      component: "SensorsCore",
      body: scan.request,
      color: "info"
    },
    "addCoreFeed"
  );
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
  App.handleEvent(
    {
      simulatorId: sensors.simulatorId,
      title: `Sensor Scan Cancelled`,
      component: "SensorsCore",
      body: "",
      color: "info"
    },
    "addCoreFeed"
  );
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
App.on("setSensorsSegment", ({ id, ring, line, state }) => {
  const sensors = App.systems.find(sys => sys.id === id);
  sensors.setSegment(ring, line, state);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("toggleSensorsAutoThrusters", ({ id, thrusters }) => {
  const sensors = App.systems.find(sys => sys.id === id);
  sensors.setAutoThrusters(thrusters);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("setSensorsInterference", ({ id, interference }) => {
  const sensors = App.systems.find(sys => sys.id === id);
  sensors.setInterference(interference);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
  pubsub.publish(
    "targetingUpdate",
    App.systems.filter(s => s.type === "Targeting")
  );
});
App.on("setAutoMovement", ({ id, movement }) => {
  const sensors = App.systems.find(sys => sys.id === id);
  sensors.setMovement(movement);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
App.on("updateSensorContacts", ({ id, contacts, cb }) => {
  const system = App.systems.find(sys => sys.id === id);
  contacts.forEach(contact => {
    if (contact.destination) {
      system.moveContact(contact);
    } else {
      system.updateContact(contact);
    }
  });
  pubsub.publish("sensorContactUpdate", system);
  cb && cb();
});

const findNewPoint = (angle, r) => ({
  x: Math.cos(angle) * r,
  y: Math.sin(angle) * r
});

App.on(
  "sensorsFireProjectile",
  ({ simulatorId, contactId, speed, hitpoints, miss }) => {
    const system = App.systems.find(
      sys =>
        sys.simulatorId === simulatorId &&
        sys.domain === "external" &&
        sys.class === "Sensors"
    );
    if (!system) return;
    const contact = system.contacts.find(c => c.id === contactId);
    if (!contact) return;
    contact.fireTime = 0;
    const { id, ...rest } = contact;
    const projectile = new Classes.SensorContact({
      ...rest,
      hitpoints,
      autoFire: false,
      hostile: false,
      type: "projectile",
      miss
    });
    // Move it to the exact oposite side of the grid
    // at a radius of 1.2
    const currentAngle = Math.atan2(
      projectile.position.y,
      projectile.position.x
    );
    projectile.move(
      { ...findNewPoint(currentAngle + Math.PI, 1.5), z: 0 },
      speed
    );
    system.contacts.push(projectile);
    pubsub.publish("sensorContactUpdate", system);
  }
);

App.on("setSensorsDefaultHitpoints", ({ id, simulatorId, hp }) => {
  const system = App.systems.find(
    sys =>
      sys.id === id ||
      (sys.simulatorId === simulatorId &&
        sys.domain === "external" &&
        sys.class === "Sensors")
  );
  system.setDefaultHitpoints(hp);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});

App.on("setSensorsDefaultSpeed", ({ id, simulatorId, speed }) => {
  const system = App.systems.find(
    sys =>
      sys.id === id ||
      (sys.simulatorId === simulatorId &&
        sys.domain === "external" &&
        sys.class === "Sensors")
  );
  system.setDefaultSpeed(speed);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});

App.on("setSensorsMissPercent", ({ id, simulatorId, miss }) => {
  const system = App.systems.find(
    sys =>
      sys.id === id ||
      (sys.simulatorId === simulatorId &&
        sys.domain === "external" &&
        sys.class === "Sensors")
  );
  system.setMissPercent(miss);
  pubsub.publish(
    "sensorsUpdate",
    App.systems.filter(s => s.type === "Sensors")
  );
});
