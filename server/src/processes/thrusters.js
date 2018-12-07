import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

function getMovementDirection(direction, movement) {
  if (movement === "up") return Math.abs(direction.z < 0 ? direction.z : 0);
  if (movement === "down") return Math.abs(direction.z > 0 ? direction.z : 0);
  if (movement === "fore") return Math.abs(direction.y < 0 ? direction.y : 0);
  if (movement === "reverse")
    return Math.abs(direction.y > 0 ? direction.y : 0);
  if (movement === "starboard")
    return Math.abs(direction.x < 0 ? direction.x : 0);
  if (movement === "port") return Math.abs(direction.x > 0 ? direction.x : 0);
  return 0;
}

function rotate(x, y, angle) {
  var radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * x - sin * y,
    ny = cos * y + sin * x;
  return { x: nx, y: ny };
}

const updateThrusters = () => {
  let updateNeeded = false;

  App.systems.forEach(sys => {
    const rotationAdd = Object.assign({}, sys.rotation);
    if (sys.type === "Thrusters" && sys.thrusting === true) {
      rotationAdd.yaw += sys.rotationDelta.yaw * sys.rotationSpeed;
      rotationAdd.pitch += sys.rotationDelta.pitch * sys.rotationSpeed;
      rotationAdd.roll += sys.rotationDelta.roll * sys.rotationSpeed;
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
          x: sys.direction.x / -(10 / sys.movementSpeed),
          y: sys.direction.y / (10 / sys.movementSpeed),
          z: sys.direction.z / (10 / sys.movementSpeed)
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

      // Also update the tactical map icons
      // This is a lazy implementation. Any simulator can control the movements of the
      // contacts. It should be scoped to a specific simulator, but I want to keep
      // it simple for now.

      // Gotta get the flight
      const flight = App.flights.find(
        f => f.simulators.indexOf(sys.simulatorId) > -1
      );
      if (!flight) return;

      App.tacticalMaps
        .filter(
          t =>
            t.template === false &&
            t.frozen === false &&
            t.flightId === flight.id
        )
        .forEach(map => {
          map.layers.filter(l => l.type === "objects").forEach(layer => {
            layer.items.forEach(item => {
              // Rotation
              if (item.thrusterControls.rotation === "yaw") {
                const rotation =
                  sys.rotationDelta.yaw *
                  sys.rotationSpeed *
                  (item.thrusterControls.reversed ? -1 : 1);
                if (rotation !== 0) {
                  item.rotation += rotation;
                  updateNeeded = true;
                }
              }
              if (item.thrusterControls.rotation === "pitch") {
                const rotation =
                  sys.rotationDelta.pitch *
                  sys.rotationSpeed *
                  (item.thrusterControls.reversed ? -1 : 1);
                if (rotation !== 0) {
                  item.rotation += rotation;
                  updateNeeded = true;
                }
              }
              if (item.thrusterControls.rotation === "roll") {
                const rotation =
                  sys.rotationDelta.roll *
                  sys.rotationSpeed *
                  (item.thrusterControls.reversed ? -1 : 1);
                if (rotation !== 0) {
                  item.rotation += rotation;
                  updateNeeded = true;
                }
              }
              // Movement
              const distance = 0.01;
              const ratio = 16 / 9;
              const movement = {
                x:
                  (getMovementDirection(
                    sys.direction,
                    item.thrusterControls.left
                  ) -
                    getMovementDirection(
                      sys.direction,
                      item.thrusterControls.right
                    )) *
                  distance *
                  item.speed,
                y:
                  (getMovementDirection(
                    sys.direction,
                    item.thrusterControls.down
                  ) -
                    getMovementDirection(
                      sys.direction,
                      item.thrusterControls.up
                    )) *
                  distance *
                  item.speed *
                  -1
              };
              if (movement.x || movement.y) {
                updateNeeded = true;
              }
              // If we are honoring the rotation, rotate the movement around
              // the rotation axis
              if (item.thrusterControls.matchRotation) {
                const rotated = rotate(movement.x, movement.y, item.rotation);
                item.destination.x += rotated.x;
                item.destination.y += rotated.y;
                item.location.x += rotated.x;
                item.location.y += rotated.y;
              } else {
                item.destination.x += movement.x;
                item.destination.y += movement.y;
                item.location.x += movement.x;
                item.location.y += movement.y;
              }
            });
          });
        });
    }
  });
  if (updateNeeded) pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
  setTimeout(updateThrusters, 100);
};

updateThrusters();
