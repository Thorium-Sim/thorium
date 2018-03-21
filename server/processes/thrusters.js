import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

const updateThrusters = () => {
  App.systems.forEach(sys => {
    if (sys.type === "Thrusters" && sys.thrusting === true) {
      const rotationAdd = Object.assign({}, sys.rotation);
      rotationAdd.yaw += sys.rotationDelta.yaw * 3;
      rotationAdd.pitch += sys.rotationDelta.pitch * 3;
      rotationAdd.roll += sys.rotationDelta.roll * 3;
      if (rotationAdd.yaw >= 360) rotationAdd.yaw -= 360;
      if (rotationAdd.pitch >= 360) rotationAdd.pitch -= 360;
      if (rotationAdd.roll >= 360) rotationAdd.roll -= 360;
      if (rotationAdd.yaw < 0) rotationAdd.yaw += 360;
      if (rotationAdd.pitch < 0) rotationAdd.pitch += 360;
      if (rotationAdd.roll < 0) rotationAdd.roll += 360;
      App.handleEvent({ id: sys.id, rotation: rotationAdd }, "rotationSet");
    }
    if (sys.type === "Thrusters") {
      // Update sensors with the thruster movement if applicable
      const sensors = App.systems.find(
        s =>
          s.autoThrusters &&
          s.domain === "external" &&
          s.simulatorId === sys.simulatorId &&
          s.type === "Sensors"
      );
      if (sensors) {
        const update = {
          x: sys.direction.x / -2,
          y: sys.direction.y / 2,
          z: sys.direction.z / 2
        };
        if (
          sensors.thrusterMovement.x !== update.x ||
          sensors.thrusterMovement.y !== update.y ||
          sensors.thrusterMovement.z !== update.z
        ) {
          sensors.thrusterMovement = update;
          pubsub.publish(
            "sensorsUpdate",
            App.systems.filter(s => s.type === "Sensors")
          );
        }
      }
    }
  });
  setTimeout(updateThrusters, 100);
};

updateThrusters();
