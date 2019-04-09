import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";

const shieldNames = [
  "",
  "Fore",
  "Aft",
  "Port",
  "Starboard",
  "Dorsal",
  "Ventral"
];
const sendUpdate = () => {
  const shields = App.systems.filter(sys => sys.type === "Shield");
  pubsub.publish("shieldsUpdate", shields);
};
App.on("shieldRaised", ({ id }) => {
  const system = App.systems.find(sys => sys.id === id);
  if (system) {
    if (system.shieldState(true)) {
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId: system.simulatorId,
        type: "Shields",
        station: "Core",
        title: `Shields Raised`,
        body: `${shieldNames[system.position]}`,
        color: "info"
      });
      App.handleEvent(
        {
          simulatorId: system.simulatorId,
          title: `Shields Raised`,
          body: `${shieldNames[system.position]}`,
          component: "ShieldControlCore",
          color: "info"
        },
        "addCoreFeed"
      );
    }
  } else {
    //Check to see if the ID is the simulator ID
    const sim = App.simulators.find(sim => sim.id === id);
    if (sim) {
      // Loop through the shields
      const raised = App.systems
        .filter(sys => sys.simulatorId === id && sys.type === "Shield")
        .map(sys => sys.shieldState(true))
        .filter(Boolean);
      if (raised.length > 0) {
        pubsub.publish("notify", {
          id: uuid.v4(),
          simulatorId: id,
          type: "Shields",
          station: "Core",
          title: `Shields Raised`,
          body: `All`,
          color: "info"
        });
        App.handleEvent(
          {
            simulatorId: id,
            title: `Shields Raised`,
            component: "ShieldControlCore",
            body: `All`,
            color: "info"
          },
          "addCoreFeed"
        );
      }
    }
  }
  sendUpdate();
});
App.on("shieldLowered", ({ id }) => {
  const system = App.systems.find(sys => sys.id === id);
  if (system) {
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: system.simulatorId,
      type: "Shields",
      station: "Core",
      title: `Shields Lowered`,
      body: `${shieldNames[system.position]}`,
      color: "info"
    });
    App.handleEvent(
      {
        simulatorId: system.simulatorId,
        title: `Shields Lowered`,
        component: "ShieldControlCore",
        body: `${shieldNames[system.position]}`,
        color: "info"
      },
      "addCoreFeed"
    );
    system.shieldState(false);
  } else {
    //Check to see if the ID is the simulator ID
    const sim = App.simulators.find(sim => sim.id === id);
    if (sim) {
      // Loop through the shields
      App.systems
        .filter(sys => sys.simulatorId === id && sys.type === "Shield")
        .forEach(sys => {
          sys.shieldState(false);
        });
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId: id,
        type: "Shields",
        station: "Core",
        title: `Shields Lowered`,
        body: `All`,
        color: "info"
      });
      App.handleEvent(
        {
          simulatorId: id,
          title: `Shields Lowered`,
          component: "ShieldControlCore",
          body: `All`,
          color: "info"
        },
        "addCoreFeed"
      );
    }
  }
  sendUpdate();
});
App.on("shieldIntegritySet", ({ id, integrity }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.setIntegrity(integrity);
  sendUpdate();
});
App.on("shieldFrequencySet", ({ id, frequency, cb }) => {
  const system = App.systems.find(sys => sys.id === id);
  system && system.setFrequency(frequency);
  sendUpdate();
  cb();
});
App.on("hitShields", ({ id, simulatorId }) => {
  if (id) {
    const system = App.systems.find(sys => sys.id === id);
    system.setIntegrity(system.integrity - Math.random() / 10);
  } else {
    App.systems
      .filter(s => s.simulatorId === simulatorId && s.class === "Shield")
      .forEach(s => s.setIntegrity(s.integrity - Math.random() / 10));
  }
  sendUpdate();
});
App.on("restoreShields", ({ simulatorId }) => {
  if (simulatorId) {
    App.systems
      .filter(s => s.simulatorId === simulatorId && s.class === "Shield")
      .forEach(s => s.setIntegrity(1));
    sendUpdate();
  }
});
