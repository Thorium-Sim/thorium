import App from "../../app";
import { pubsub } from "../helpers/subscriptionManager.js";

const updateCoolant = () => {
  //Loop through all of the simulators to isolate the systems
  App.systems
    .filter(s => s.type === "Coolant" && s.transfer !== null)
    .forEach(s => {
      //Transfer the coolant to the other system
      const { sysId, sign } = s.transfer;
      const transferSystem = App.systems.find(ts => ts.id === sysId);
      // Trigger Events
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
      App.handleEvent({ systemId: sysId, coolant: sysCoolant }, "setCoolant");
      App.handleEvent({ systemId: s.id, coolant: tankCoolant }, "setCoolant");
      console.log(transferSystem.name);
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
    });
  setTimeout(updateCoolant, 33); // 30 FPS
};
updateCoolant();
