import App from "../../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

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
  const engineIndex = App.systems.findIndex(sys => sys.id === param.id) || -1;
  const on = system.on;
  system.setSpeed(param.speed, param.on);
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
  }
  pubsub.publish("speedChange", system);
  // Now stop the other engines
  // If speed is -1 (full stop), stop them all
  App.systems.forEach((engine, index) => {
    if (
      engine.simulatorId === App.systems[engineIndex].simulatorId &&
      engine.type === "Engine"
    ) {
      if (index < engineIndex) {
        if (param.speed === -1) {
          engine.setSpeed(-1, false);
        } else {
          engine.setSpeed(engine.speeds.length, false);
        }
        pubsub.publish("speedChange", engine);
      }
      if (index > engineIndex) {
        engine.setSpeed(-1, false);
        pubsub.publish("speedChange", engine);
      }
    }
  });
  pubsub.publish("systemsUpdate", App.systems);
});
App.on("addHeat", ({ id, heat }) => {
  heat = Math.min(1, Math.max(0, heat));
  const sys = App.systems.find(s => s.id === id);
  if (sys && sys.heat !== heat) {
    sys.setHeat(heat);
    pubsub.publish("heatChange", sys);
    pubsub.publish("systemsUpdate", App.systems);
  }
});
App.on("engineCool", ({ id, state }) => {
  App.systems.find(s => s.id === id).cool(state);
});
App.on("setEngineSpeeds", ({ id, speeds }) => {
  App.systems.find(s => s.id === id).setSpeeds(speeds);
});
App.on("applyEngineCoolant", ({ id }) => {
  const engine = App.systems.find(s => s.id === id);
  engine.setCoolant(Math.min(1, Math.max(0, engine.coolant - 0.005)));
  engine.setHeat(Math.min(1, Math.max(0, engine.heat - 0.01)));
  if (engine.coolant === 0 || engine.heat === 0) engine.cool(false);
  pubsub.publish("heatChange", engine);
});
