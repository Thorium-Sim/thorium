import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
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
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: system.simulatorId,
      station: "Core",
      title: `Shields Raised`,
      body: `${shieldNames[system.position]}`,
      color: "info"
    });
    system.shieldState(true);
  } else {
    //Check to see if the ID is the simulator ID
    const sim = App.simulators.find(sim => sim.id === id);
    if (sim) {
      // Loop through the shields
      App.systems
        .filter(sys => sys.simulatorId === id && sys.type === "Shield")
        .forEach(sys => {
          sys.shieldState(true);
        });
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId: id,
        station: "Core",
        title: `Shields Raised`,
        body: `All`,
        color: "info"
      });
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
      station: "Core",
      title: `Shields Lowered`,
      body: `${shieldNames[system.position]}`,
      color: "info"
    });
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
        station: "Core",
        title: `Shields Lowered`,
        body: `All`,
        color: "info"
      });
    }
  }
  sendUpdate();
});
App.on("shieldIntegritySet", ({ id, integrity }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.setIntegrity(integrity);
  sendUpdate();
});
App.on("shieldFrequencySet", ({ id, frequency }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.setFrequency(frequency);
  sendUpdate();
});
