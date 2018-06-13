import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

function performAction(id, action) {
  const sys = App.systems.find(s => s.id === id);
  if (sys) {
    action(sys);
  }
  pubsub.publish("thxUpdate", App.systems.filter(s => s.class === "Thx"));
}

App.on("chargeThx", ({ id, clientId, charge }) => {
  performAction(id, sys => sys.chargeClient(clientId, charge));
});

App.on("lockThx", ({ id, clientId }) => {
  performAction(id, sys => sys.lockClient(clientId));
  // Also black out the client.
  // const client = App.clients.find(c => c.id === clientId);
  // client.setOfflineState("blackout");
  // pubsub.publish("clientChanged", App.clients);
});

App.on("activateThx", ({ id }) => {
  performAction(id, sys => sys.activate());
});

App.on("deactivateThx", ({ id }) => {
  performAction(id, sys => sys.deactivate());
});

App.on("resetThx", ({ id }) => {
  performAction(id, sys => sys.reset());
});
