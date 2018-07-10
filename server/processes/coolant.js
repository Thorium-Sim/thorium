import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import throttle from "../helpers/throttle";

const sendUpdate = throttle(hasPhasers => {
  if (hasPhasers) {
    pubsub.publish(
      "phasersUpdate",
      App.systems.filter(s => s.type === "Phasers")
    );
  }
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
  pubsub.publish(
    "coolantUpdate",
    App.systems.filter(s => s.type === "Coolant")
  );
}, 300);
// No need for this to be a flight-specific loop.
const updateCoolant = () => {
  let hasPhasers = false;
  //Loop through all of the simulators to isolate the systems
  App.systems
    .filter(s => s.type === "Coolant" && s.transfer !== null)
    .forEach(s => {
      //Transfer the coolant to the other system
      const { sysId, sign } = s.transfer;
      const transferSystem = App.systems.find(ts => ts.id === sysId);
      // Trigger Events
      // Make sure that we don't have too much or too little coolant
      if (
        !(
          (sign === -1 && (transferSystem.coolant === 0 || s.coolant === 1)) ||
          (sign === 1 && (transferSystem.coolant === 1 || s.coolant === 0))
        )
      ) {
        const sysCoolant = Math.min(
          1,
          Math.max(0, transferSystem.coolant + 0.004 * sign)
        );
        const tankCoolant = Math.min(
          1,
          Math.max(0, s.coolant - 0.004 * sign * s.coolantRate)
        );
        if (
          sysCoolant === 0 ||
          tankCoolant === 0 ||
          sysCoolant === 1 ||
          tankCoolant === 1
        )
          s.transfer = null;

        s.setCoolant(tankCoolant);
        transferSystem.setCoolant(sysCoolant);
        if (transferSystem.type === "Phasers") hasPhasers = true;
      }
    });
  sendUpdate(hasPhasers);
  setTimeout(updateCoolant, 33); // 30 FPS
};
updateCoolant();
