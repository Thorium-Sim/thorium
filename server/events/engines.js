import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";
import throttle from "../helpers/throttle";

const throttles = {};

const sendUpdate = sys => {
  if (!throttles[sys.id]) {
    throttles[sys.id] = throttle(sys => {
      pubsub.publish("heatChange", sys);
      pubsub.publish("systemsUpdate", App.systems);
    }, 300);
  }
  return throttles[sys.id];
};

App.on("createEngine", param => {
  const engine = new Classes.Engine(param);
  App.systems.push(engine);
  pubsub.publish("engineChange", App.systems);
});
App.on("removeEngine", param => {
  App.systems = App.systems.filter(e => {
    if (e.type === "Engine") {
      if (param.id) {
        return e.id !== param.id;
      }
      if (param.simulatorId && param.name) {
        return e.simulatorId !== param.simulatorId && e.name !== param.name;
      }
    }
    return true;
  });
  pubsub.publish("engineChange", App.engines);
});
App.on("speedChange", param => {
  const system = App.systems.find(sys => sys.id === param.id);
  const engineIndex = App.systems
    .filter(s => s.simulatorId === system.simulatorId && s.type === "Engine")
    .findIndex(sys => sys.id === param.id);
  const on = system.on;
  const oldSpeed = system.speed;
  system.setSpeed(param.speed, param.on);
  if (oldSpeed === system.speed) return;
  const speed = system.speeds[system.speed - 1];
  if (param.on || on) {
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: system.simulatorId,
      station: "Core",
      title: `Speed Change ${speed ? speed.text : "Full Stop"}`,
      body: ``,
      color: "info"
    });
    App.handleEvent(
      {
        simulatorId: system.simulatorId,
        title: `Speed Change ${speed ? speed.text : "Full Stop"}`,
        component: "EngineControlCore",
        body: null,
        color: "info"
      },
      "addCoreFeed"
    );
  }
  pubsub.publish("engineUpdate", system);
  // Now stop the other engines
  // If speed is -1 (full stop), stop them all
  App.systems
    .filter(s => s.simulatorId === system.simulatorId && s.type === "Engine")
    .forEach((engine, index) => {
      if (index < engineIndex) {
        if (param.speed === -1) {
          engine.setSpeed();
        } else {
          engine.setSpeed(engine.speeds.length, false);
        }
      }
      if (index > engineIndex) {
        engine.setSpeed(-1, false);
      }
      pubsub.publish("engineUpdate", engine);
    });
  pubsub.publish("systemsUpdate", App.systems);
});
App.on("addHeat", ({ id, heat, force }) => {
  heat = Math.min(1, Math.max(0, heat));
  const sys = App.systems.find(s => s.id === id);
  if (sys && sys.heat !== heat) {
    sys.setHeat(heat);
  }
  sendUpdate(sys)(sys);
});
App.on("addCoolant", ({ id, coolant }) => {
  coolant = Math.min(1, Math.max(0, coolant));
  const sys = App.systems.find(s => s.id === id);
  if (sys && sys.coolant !== coolant) {
    sys.setCoolant(coolant);
  }
  sendUpdate(sys)(sys);
});
App.on("setHeatRate", ({ id, rate }) => {
  const sys = App.systems.find(s => s.id === id);
  if (sys && sys.rate !== rate) {
    sys.setRate(rate);
    pubsub.publish("systemsUpdate", App.systems);
  }
});
App.on("engineCool", ({ id, state }) => {
  const engine = App.systems.find(s => s.id === id);
  engine && engine.cool(state);
});
App.on("setEngineSpeeds", ({ id, speeds }) => {
  App.systems.find(s => s.id === id).setSpeeds(speeds);
});
App.on("applyCoolant", ({ id }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.setCoolant(Math.min(1, Math.max(0, sys.coolant - 0.005)));
  sys.setHeat(Math.min(1, Math.max(0, sys.heat - 0.01)));
  if ((sys.coolant === 0 || sys.heat === 0) && sys.cool) sys.cool(false);
  pubsub.publish("heatChange", sys);
});
App.on("setEngineAcceleration", ({ id, acceleration }) => {
  const engine = App.systems.find(s => s.id === id);
  const engines = App.systems.filter(s => s.simulatorId === engine.simulatorId);
  const sim = App.simulators.find(s => s.id === engine.simulatorId);
  engines.forEach(e => {
    e.on = false;
  });
  engine.on = true;
  if (engine.useAcceleration) {
    engine.setAcceleration(acceleration);
  } else {
    // Set the simulator's velocity to the correct level
    sim.ship.speed = (
      engine.speeds[
        Math.floor(acceleration * (engine.speeds.length + 1)) - 1
      ] || { velocity: 0 }
    ).velocity;
    if (sim.ship.speed === 0) {
      engine.on = false;
    }
  }
  pubsub.publish("engineUpdate", engine);
});
App.on("setEngineUseAcceleration", ({ id, useAcceleration }) => {
  const engine = App.systems.find(s => s.id === id);
  engine.toggleAcceleration(useAcceleration);
  //pubsub.publish("engineUpdate", App.systems.find(s => s.type === "Engine"));
});
App.on("setEngineSpeedFactor", ({ id, speedFactor }) => {
  const engine = App.systems.find(s => s.id === id);
  engine.setSpeedFactor(speedFactor);
  //pubsub.publish("engineUpdate", App.systems.find(s => s.type === "Engine"));
});
