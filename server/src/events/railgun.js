import App from "../app";
import uuid from "uuid";
import { pubsub } from "../helpers/subscriptionManager.js";

function action(id, cb) {
  const sys = App.systems.find(s => s.id === id);
  cb(sys);
  pubsub.publish("railgunUpdate", App.systems.filter(s => s.id === id));
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

App.on("fireRailgun", ({ id, simulatorId, contactId }) => {
  action(id, sys => sys.fire());
  if (contactId) {
    const sensors = App.systems.find(
      s =>
        s.simulatorId === simulatorId &&
        s.class === "Sensors" &&
        s.domain === "external"
    );
    const contact = sensors.contacts.find(s => s.id === contactId);
    contact.updateHitpoints();
    if (contact.hitpoints <= 0) {
      sensors.destroyContact(contact);
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId: simulatorId,
        type: "Railgun",
        station: "Core",
        title: `Projectile Destroyed`,
        body: "",
        color: "warning"
      });
    }
    pubsub.publish("sensorContactUpdate", sensors);
  }
});
App.on("loadRailgun", ({ id }) => {
  action(id, sys => sys.load());
});
