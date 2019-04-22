import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

function performAction(id, action) {
  const sys = App.systems.find(s => s.id === id);
  if (sys) {
    action(sys);
  }
  pubsub.publish(
    "subspaceFieldUpdate",
    App.systems.filter(s => s.class === "SubspaceField")
  );
}

App.on("fluxSubspaceField", ({ id, which, cb }) => {
  performAction(id, sys => sys.flux(which));
  cb && cb();
});

App.on("normalSubspaceField", ({ id, which, cb }) => {
  performAction(id, sys => sys.normal(which));
  cb && cb();
});

App.on("setSubspaceFieldSectorValue", ({ id, which, value, cb }) => {
  performAction(id, sys => sys.setValue(which, value));
  cb && cb();
});
