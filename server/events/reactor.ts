import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";
import {Reactor} from "../classes";

App.on("reactorEject", ({id, tf = true}) => {
  const system = App.systems.find(sys => sys.id === id);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    type: "Reactor",
    station: "Core",
    title: `Reactor Ejected`,
    body: "",
    color: "info",
  });

  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      title: `Reactor Ejected`,
      component: "ReactorControlCore",
      body: null,
      color: "danger",
    },
    "addCoreFeed",
  );
  system.eject(tf);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor"),
  );
});
App.on("reactorChangeModel", ({id, model, cb}) => {
  const system = App.systems.find(sys => sys.id === id);
  system && system.changeModel(model);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor"),
  );
  cb && cb();
});
App.on("reactorChangeOutput", ({id, output}) => {
  const system = App.systems.find(sys => sys.id === id);
  system.changeOutput(output);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor"),
  );
});
App.on("reactorChangeEfficiency", ({id, efficiency, simulatorId}) => {
  const system = App.systems.find(
    sys =>
      sys.id === id ||
      (sys.simulatorId === simulatorId &&
        sys.class === "Reactor" &&
        sys.model === "reactor"),
  );
  system.changeEfficiency(efficiency);
  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      title: `Reactor Efficiency Changed`,
      component: "ReactorControlCore",
      body: efficiency,
      color: "info",
    },
    "addCoreFeed",
  );
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor"),
  );
});
App.on("reactorBatteryChargeLevel", ({id, level}) => {
  const system = App.systems.find(sys => sys.id === id);
  system.changeBatteryChargeLevel(level);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor"),
  );
});
App.on("reactorBatteryChargeRate", ({id, rate}) => {
  const system = App.systems.find(sys => sys.id === id);
  system.changeBatteryChargeRate(rate);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor"),
  );
});

App.on(
  "updateDilithiumStress",
  ({id, alphaLevel, betaLevel, alphaTarget, betaTarget}) => {
    const system = App.systems.find(sys => sys.id === id);
    system.updateDilithiumStress({
      alphaLevel,
      betaLevel,
      alphaTarget,
      betaTarget,
    });
    pubsub.publish(
      "reactorUpdate",
      App.systems.filter(s => s.type === "Reactor"),
    );
  },
);

App.on("fluxDilithiumStress", ({id}) => {
  const system = App.systems.find(sys => sys.id === id);
  system.updateDilithiumStress({
    alphaTarget: Math.round(Math.random() * 100),
    betaTarget: Math.round(Math.random() * 100),
  });
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor"),
  );
});

App.on("setReactorEffciciencies", ({id, efficiencies, cb}) => {
  const system = App.systems.find(sys => sys.id === id);
  system.updateEfficiencies(efficiencies);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor"),
  );
  cb && cb();
});

App.on("setDilithiumStressRate", ({id, rate}) => {
  const system = App.systems.find(sys => sys.id === id);
  system.setDilithiumRate(rate);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor"),
  );
});

App.on("reactorRequireBalance", ({id, balance, cb}) => {
  const system = App.systems.find(sys => sys.id === id);
  system.setRequireBalance(balance);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor"),
  );
  cb && cb();
});

App.on("reactorSetHasWings", ({id, hasWings, cb}) => {
  const system: Reactor = App.systems.find(sys => sys.id === id);
  system.setHasWings(hasWings);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor"),
  );
  cb && cb();
});
App.on("reactorSetWingPower", ({id, wing, power, cb}) => {
  const system: Reactor = App.systems.find(sys => sys.id === id);
  system.setWingPower(wing, power);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor"),
  );
  cb && cb();
});
App.on("reactorRequestWingPower", ({id, wing, power, cb}) => {
  const system: Reactor = App.systems.find(sys => sys.id === id);
  system.requestWingPower(wing, power);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor"),
  );
  cb && cb();
});
App.on("reactorAckWingRequest", ({id, wing, ack, cb}) => {
  const system: Reactor = App.systems.find(sys => sys.id === id);
  system.ackWingRequest(wing, ack);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor"),
  );
  cb && cb();
});
