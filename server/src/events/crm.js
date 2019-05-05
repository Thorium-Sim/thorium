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
App.on("crmSetAcceleration", ({ id, clientId, acceleration, cb }) => {
  performFighterAction(id, clientId, f => {
    f.setAcceleration(acceleration);
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
App.on("crmSetFighterDocked", ({ id, clientId, docked }) => {
  performFighterAction(id, clientId, f => (docked ? f.dock() : f.undock()));
  // Just update the CRM for core status update
  performAction(id, f => {});
});
App.on("crmRestockTorpedos", ({ id, clientId }) => {
  performFighterAction(id, clientId, f => f.restockTorpedos());
});
App.on("crmSetAttacking", ({ id, attacking }) => {
  performAction(id, f => {
    f.setAttacking(attacking);
  });
});
App.on("crmSetFighterImage", ({ id, image }) => {
  performAction(id, f => {
    f.setFighterImage(image);
    f.fighters.forEach(f => {
      pubsub.publish("crmFighterUpdate", f);
    });
  });
});
App.on("crmSetFighterIcon", ({ id, image }) => {
  performAction(id, f => {
    f.setFighterIcon(image);
  });
});
App.on("crmSetEnemyIcon", ({ id, image }) => {
  performAction(id, f => {
    f.setEnemyIcon(image);
  });
});
App.on("crmSetEnemyCount", ({ id, count }) => {
  performAction(id, f => {
    f.setEnemyCount(count);
  });
});
App.on("crmRestoreFighter", ({ id, clientId }) => {
  performFighterAction(id, clientId, f => f.restore());
  performAction(id, f => {});
});
App.on("crmDestroyUndockedFighters", ({ id }) => {
  performAction(id, f => {
    f.destroyUndocked();
    f.fighters.forEach(f => {
      pubsub.publish("crmFighterUpdate", f);
    });
  });
});
App.on("crmRestoreFighters", ({ id }) => {
  performAction(id, f => {
    f.restoreAll();
    f.fighters.forEach(f => {
      pubsub.publish("crmFighterUpdate", f);
    });
  });
});
App.on("crmSetFighterStrength", ({ id, strength }) => {
  performAction(id, crm => crm.setFighterStrength(strength));
});
App.on("crmSetEnemyStrength", ({ id, strength }) => {
  performAction(id, crm => crm.setEnemyStrength(strength));
});
