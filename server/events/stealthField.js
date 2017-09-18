import App from "../../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";

App.on("setStealthActivated", ({ id, state }) => {
  App.systems.find(s => s.id === id).setActivated(state);
  pubsub.publish(
    "stealthFieldUpdate",
    App.systems.filter(s => s.type === "StealthField")
  );
});
App.on("setStealthCharge", ({ id, state }) => {
  App.systems.find(s => s.id === id).setCharge(state);
  pubsub.publish(
    "stealthFieldUpdate",
    App.systems.filter(s => s.type === "StealthField")
  );
});
App.on("activateStealth", ({ id }) => {
  const system = App.systems.find(s => s.id === id);
  system.activate();
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    station: "Core",
    title: `Stealth Activated`,
    body: "",
    color: "info"
  });
  pubsub.publish(
    "stealthFieldUpdate",
    App.systems.filter(s => s.type === "StealthField")
  );
});
App.on("deactivateStealth", ({ id }) => {
  const system = App.systems.find(s => s.id === id);
  system.deactivate();
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    station: "Core",
    title: `Stealth Deactivated`,
    body: "",
    color: "info"
  });
  pubsub.publish(
    "stealthFieldUpdate",
    App.systems.filter(s => s.type === "StealthField")
  );
});
App.on("setStealthQuadrant", ({ id, which, value }) => {
  App.systems.find(s => s.id === id).setQuadrant(which, value);
  pubsub.publish(
    "stealthFieldUpdate",
    App.systems.filter(s => s.type === "StealthField")
  );
});
App.on("fluxStealthQuadrants", ({ id }) => {
  App.systems.find(s => s.id === id).fluxQuadrants();
  pubsub.publish(
    "stealthFieldUpdate",
    App.systems.filter(s => s.type === "StealthField")
  );
});
