import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";

App.on("reactorEject", ({ id, tf = true }) => {
  const system = App.systems.find(sys => sys.id === id);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    type: "Reactor",
    station: "Core",
    title: `Reactor Ejected`,
    body: "",
    color: "info"
  });

  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      title: `Reactor Ejected`,
      component: "ReactorControlCore",
      body: null,
      color: "danger"
    },
    "addCoreFeed"
  );
  system.eject(tf);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor")
  );
});
App.on("reactorChangeModel", ({ id, model }) => {
  const system = App.systems.find(sys => sys.id === id);
  system && system.changeModel(model);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor")
  );
});
App.on("reactorChangeOutput", ({ id, output }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.changeOutput(output);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor")
  );
});
App.on("reactorChangeEfficiency", ({ id, efficiency }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.changeEfficiency(efficiency);
  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      title: `Reactor Efficiency Changed`,
      component: "ReactorControlCore",
      body: efficiency,
      color: "info"
    },
    "addCoreFeed"
  );
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor")
  );
});
App.on("reactorBatteryChargeLevel", ({ id, level }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.changeBatteryChargeLevel(level);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor")
  );
});
App.on("reactorBatteryChargeRate", ({ id, rate }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.changeBatteryChargeRate(rate);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor")
  );
});

App.on(
  "updateDilithiumStress",
  ({ id, alphaLevel, betaLevel, alphaTarget, betaTarget }) => {
    const system = App.systems.find(sys => sys.id === id);
    system.updateDilithiumStress({
      alphaLevel,
      betaLevel,
      alphaTarget,
      betaTarget
    });
    pubsub.publish(
      "reactorUpdate",
      App.systems.filter(s => s.type === "Reactor")
    );
  }
);

App.on("fluxDilithiumStress", ({ id }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.updateDilithiumStress({
    alphaTarget: Math.round(Math.random() * 100),
    betaTarget: Math.round(Math.random() * 100)
  });
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor")
  );
});

App.on("setReactorEffciciencies", ({ id, efficiencies }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.updateEfficiencies(efficiencies);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor")
  );
});

App.on("setDilithiumStressRate", ({ id, rate }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.setDilithiumRate(rate);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor")
  );
});

App.on("reactorRequireBalance", ({ id, balance }) => {
  const system = App.systems.find(sys => sys.id === id);
  system.setRequireBalance(balance);
  pubsub.publish(
    "reactorUpdate",
    App.systems.filter(s => s.type === "Reactor")
  );
});
