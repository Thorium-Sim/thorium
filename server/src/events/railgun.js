import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

function action(id, cb) {
  const sys = App.systems.find(s => s.id === id);
  cb(sys);
  pubsub.publish("railgunUpdate");
}
App.on("setRailgunAmmo", ({ id, ammo }) => {
  action(id, sys => sys.setAmmo(ammo));
});

App.on("setRailgunMaxAmmo", ({ id, ammo }) => {
  action(id, sys => sys.setMaxAmmo(ammo));
});

App.on("setRailgunAvailableAmmo", ({ id, ammo }) => {
  action(id, sys => sys.setAvailableAmmo(ammo));
});

App.on("fireRailgun", ({ id }) => {
  action(id, sys => sys.fire);
});
