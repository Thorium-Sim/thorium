import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";

function performAction(id, action) {
  const sys = App.systems.find(s => s.id === id);
  if (!sys) return;
  action(sys);
  pubsub.publish("crmUpdate", sys);
}

function performFighterAction(id, clientId, action) {
  const sys = App.systems.find(s => s.id === id);
  if (!sys) return;
  const fighter = sys.fighters.find(c => c.clientId === clientId);
  if (!fighter) return;
  action(fighter);
  pubsub.publish("crmFighterUpdate", fighter);
}
App.on("crmSetActivated", ({ id, state }) => {
  performAction(id, sys => sys.setActivated(state));
});
App.on("crmSetPassword", ({ id, password, cb }) => {
  performAction(id, sys => sys.changePassword(password));
});
App.on("crmAddEnemy", ({ id }) => {
  performAction(id, sys => sys.addEnemy({}));
});
App.on("crmSetPhaserCharge", ({ id, clientId, phaser }) => {
  performFighterAction(id, clientId, f => f.setPhaserCharge(phaser));
});
App.on("crmSetVelocity", ({ id, clientId, velocity, cb }) => {
  performFighterAction(id, clientId, f => {
    f.setVelocity(velocity);
    cb && cb();
  });
});
App.on("crmSetShieldState", ({ id, clientId, shield }) => {
  performFighterAction(id, clientId, f => f.setShield(shield));
});
App.on("crmLoadTorpedo", ({ id, clientId }) => {
  performFighterAction(id, clientId, f => f.loadTorpedo());
});
App.on("crmFireTorpedo", ({ id, clientId, target }) => {
  performAction(id, sys => {
    sys.fireTorpedo(clientId, target);
    const fighter = sys.fighters.find(c => c.clientId === clientId);

    pubsub.publish("crmFighterUpdate", fighter);
  });
});

App.on("crmFirePhaser", ({ id, clientId, target }) => {
  performFighterAction(id, clientId, f => f.setPhaserTarget(target));
});
App.on("crmStopPhaser", ({ id, clientId }) => {
  performFighterAction(id, clientId, f => f.setPhaserTarget(null));
});
