import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";
import throttle from "../helpers/throttle";

const sendUpdate = throttle(() => {
  pubsub.publish(
    "phasersUpdate",
    App.systems.filter(s => s.type === "Phasers")
  );
}, 60);

App.on("chargePhaserBeam", ({ id, beamId }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.updateBeamState(beamId, "charging");
  pubsub.publish(
    "phasersUpdate",
    App.systems.filter(s => s.type === "Phasers")
  );
});
App.on("dischargePhaserBeam", ({ id, beamId }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.updateBeamState(beamId, "discharging");
  pubsub.publish(
    "phasersUpdate",
    App.systems.filter(s => s.type === "Phasers")
  );
});
App.on("firePhaserBeam", ({ id, beamId }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.fireBeam(beamId);
  const beam = sys.beams.find(b => b.id === beamId);
  if (beam.charge > 0) {
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: sys.simulatorId,
      station: "Core",
      type: "Phasers",
      title: `Phasers Firing`,
      body: "",
      color: "info"
    });
  }
  pubsub.publish(
    "phasersUpdate",
    App.systems.filter(s => s.type === "Phasers")
  );
});
App.on("stopPhaserBeams", ({ id }) => {
  const sys = App.systems.find(s => s.id === id);
  sys && sys.stopBeams();
  pubsub.publish(
    "phasersUpdate",
    App.systems.filter(s => s.type === "Phasers")
  );
});
App.on("phaserArc", ({ id, beamId, arc }) => {
  App.systems.find(s => s.id === id).updateArc(arc);
  pubsub.publish(
    "phasersUpdate",
    App.systems.filter(s => s.type === "Phasers")
  );
});
App.on("setPhaserBeamCharge", ({ id, beamId, charge, noUpdate }) => {
  App.systems.find(s => s.id === id).updateBeamCharge(beamId, charge);
  sendUpdate();
});
App.on("setPhaserBeamHeat", ({ id, beamId, heat, noUpdate }) => {
  App.systems.find(s => s.id === id).updateBeamHeat(beamId, heat);
  sendUpdate();
});
App.on("coolPhaserBeam", ({ id, beamId }) => {
  const sys = App.systems.find(s => s.id === id);
  sys && sys.coolBeam(beamId);
  pubsub.publish(
    "phasersUpdate",
    App.systems.filter(s => s.type === "Phasers")
  );
});
App.on("applyPhaserCoolant", ({ id, beamId }) => {
  const phaser = App.systems.find(s => s.id === id);
  const beam = phaser.beams.find(b => b.id === beamId);
  if (phaser.coolant === 0 || beam.heat === 0) {
    phaser.coolBeam(null);
    pubsub.publish(
      "phasersUpdate",
      App.systems.filter(s => s.type === "Phasers")
  );
  }
  else{
    phaser.setCoolant(Math.min(1, Math.max(0, phaser.coolant - 0.005)));
    beam.setHeat(Math.min(1, Math.max(0, beam.heat - 0.01)));
  }
});
App.on("setPhaserBeamCount", ({ id, beamCount }) => {
  App.systems.find(s => s.id === id).setBeams(beamCount);
  pubsub.publish(
    "phasersUpdate",
    App.systems.filter(s => s.type === "Phasers")
  );
});

App.on("setPhaserHoldToCharge", ({ id, holdToCharge }) => {
  App.systems.find(s => s.id === id).setHoldToCharge(holdToCharge);
  pubsub.publish(
    "phasersUpdate",
    App.systems.filter(s => s.type === "Phasers")
  );
});

App.on("setPhaserChargeSpeed", ({ id, speed }) => {
  App.systems.find(s => s.id === id).setChargeSpeed(speed);
  pubsub.publish(
    "phasersUpdate",
    App.systems.filter(s => s.type === "Phasers")
  );
});

App.on("stopChargingPhasers", ({ id }) => {
  App.systems.find(s => s.id === id).stopCharging();
  pubsub.publish(
    "phasersUpdate",
    App.systems.filter(s => s.type === "Phasers")
  );
});
