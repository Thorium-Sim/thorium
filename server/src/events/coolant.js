import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

App.on("setCoolantTank", ({ id, coolant }) => {
  App.systems.find(s => s.id === id).setCoolant(coolant);
  pubsub.publish(
    "coolantUpdate",
    App.systems.filter(s => s.type === "Coolant")
  );
});
App.on("transferCoolant", ({ coolantId, systemId, which }) => {
  const coolant = App.systems.find(s => s.id === coolantId);
  coolant.transferCoolant(systemId, which);
  pubsub.publish(
    "coolantUpdate",
    App.systems.filter(s => s.type === "Coolant")
  );
});
App.on("cancelCoolantTransfer", ({ coolantId }) => {
  const coolant = App.systems.find(s => s.id === coolantId);
  coolant && coolant.cancelTransfer();
  pubsub.publish(
    "coolantUpdate",
    App.systems.filter(s => s.type === "Coolant")
  );
});
