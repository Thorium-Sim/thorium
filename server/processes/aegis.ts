import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import Aegis, {AEGIS_FULL_COVERAGE} from "../classes/aegis";

// Seconds to fabricate a batch of drones
const FABRICATION_TIME = 45;
// Drones produced per completed fabrication cycle
const BATCH_SIZE = 10;
// Average seconds before a deployed swarm loses one drone to attrition
const ATTRITION_TIME = 180;
// Structural integrity restored per second by a full repair swarm:
// base rate plus up to this much more at maximum effort
const REPAIR_RATE_BASE = 0.0005;
const REPAIR_RATE_EFFORT = 0.002;

// Working the drones harder (ECM output, repair effort) wears them out faster
function attritionMultiplier(aegis: Aegis) {
  if (aegis.mode === "ecm") {
    return 0.5 + aegis.ecmIntensity * 2.5;
  }
  if (aegis.mode === "repair") {
    return 0.75 + aegis.repairEffort * 1.5;
  }
  return 1;
}

function processAegis() {
  App.flights
    .filter(f => f.running === true)
    .forEach(f => {
      f.simulators.forEach((id: string) => {
        const aegis: Aegis = App.systems.find(
          sys => sys.simulatorId === id && sys.class === "Aegis",
        );
        if (!aegis) {
          return;
        }

        let changed = false;

        // Fabricate drones one batch at a time
        const hasPower =
          aegis.power.powerLevels.length === 0 ||
          aegis.power.power >= aegis.power.powerLevels[0];
        if (
          aegis.fabricating &&
          !aegis.fabricationPaused &&
          !aegis.damage.damaged &&
          hasPower &&
          aegis.droneCount < aegis.maxDrones
        ) {
          aegis.fabricationProgress = Math.min(
            1,
            aegis.fabricationProgress + 1 / FABRICATION_TIME,
          );
          if (aegis.fabricationProgress >= 1) {
            aegis.droneCount = Math.min(
              aegis.maxDrones,
              aegis.droneCount + BATCH_SIZE,
            );
            aegis.fabricationProgress = 0;
            if (aegis.droneCount >= aegis.maxDrones) {
              aegis.fabricating = false;
            }
          }
          changed = true;
        }

        // Deployed drones slowly succumb to wear and enemy fire
        if (aegis.deployed && aegis.attritionEnabled) {
          if (Math.random() < attritionMultiplier(aegis) / ATTRITION_TIME) {
            aegis.destroyDrone();
            changed = true;
          }
        }

        // Repair swarm restores structural integrity
        if (
          aegis.deployed &&
          aegis.mode === "repair" &&
          aegis.droneCount > 0 &&
          aegis.structuralIntegrity < 1
        ) {
          const previous = aegis.structuralIntegrity;
          const rate =
            (REPAIR_RATE_BASE + aegis.repairEffort * REPAIR_RATE_EFFORT) *
            Math.min(1, aegis.droneCount / AEGIS_FULL_COVERAGE);
          aegis.setStructuralIntegrity(aegis.structuralIntegrity + rate);
          if (
            Math.floor(aegis.structuralIntegrity * 10) >
            Math.floor(previous * 10)
          ) {
            aegis.addLog(
              "repair",
              `Repair swarm restored structural integrity to ${
                Math.floor(aegis.structuralIntegrity * 10) * 10
              }%.`,
            );
          }
          changed = true;
        }

        if (changed) {
          pubsub.publish("aegisUpdate", aegis);
        }
      });
    });
  setTimeout(processAegis, 1000);
}

processAegis();
