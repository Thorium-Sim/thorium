import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

const updatePhasers = () => {
  //Loop through all of the simulators to isolate the systems
  const phaserChargeRate = 1 / 5;
  const phaserFireRate = -0.5 / 5;
  const phaserDischargeRate = -0.7 / 5;
  App.systems.filter(p => p.type === "Phasers").forEach(sys => {
    // Apply Coolant
    if (sys.cooling) {
      App.handleEvent(
        { id: sys.id, beamId: sys.cooling },
        "applyPhaserCoolant"
      );
      pubsub.publish(
        "coolantSystemUpdate",
        App.systems
          .filter(s => (s.coolant || s.coolant === 0) && s.type !== "Coolant")
          .map(s => {
            return {
              systemId: s.id,
              simulatorId: s.simulatorId,
              name: s.name,
              coolant: s.coolant
            };
          })
      );
    }
    sys.beams.filter(b => b.state !== "idle").forEach(beam => {
      let rate = phaserChargeRate;
      if (beam.state === "discharging") rate = phaserDischargeRate;
      if (beam.state === "firing") rate = phaserFireRate;
      // Handle the heat if firing
      if (beam.state === "firing") {
        if (beam.charge > 0) {
          beam.heat = Math.min(1, Math.max(0, beam.heat + 0.5 * beam.heatRate));
        }
        if (beam.charge > 0) {
          beam.state = "firing";
        } else {
          beam.state = "idle";
        }
        if (beam.heat > 0.9) {
          beam.state = "idle";
        }
      }
      const charge = beam.charge + rate * 0.1;
      App.handleEvent(
        { id: sys.id, beamId: beam.id, charge },
        "setPhaserBeamCharge"
      );
    });
  });
  setTimeout(updatePhasers, 33); // 30 FPS
};
updatePhasers();

const phaserCool = () => {
  App.systems.filter(p => p.type === "Phasers").forEach(sys => {
    sys.beams.filter(b => b.heat > 0).forEach(beam => {
      App.handleEvent(
        { id: sys.id, beamId: beam.id, heat: beam.heat - 0.005 },
        "setPhaserBeamHeat"
      );
    });
  });
  setTimeout(phaserCool, 500);
};
phaserCool();
