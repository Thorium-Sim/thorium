import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

function performAction(id, action) {
  const sys = App.systems.find(s => s.id === id);
  if (sys) {
    action(sys);
  }
  pubsub.publish("transwarpUpdate", [sys]);
}

App.on("setTranswarpActive", ({ id, active }) => {
  performAction(id, sys => sys.setActive(active));
});

App.on("fluxTranswarp", ({ id, quad, field }) => {
  performAction(id, sys => sys.flux(quad, field));
});

App.on("normalTranswarp", ({ id, quad, field }) => {
  performAction(id, sys => sys.normal(quad, field));
});

App.on("setTranswarpSectorValue", ({ id, quad, field, value }) => {
  performAction(id, sys => sys.setValue(quad, field, value));
});
