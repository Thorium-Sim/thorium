import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

const interval = 1000 / 30; // 1/30 of a second
const pingInterval = 100;
const updateInterval = 1000;
function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

const moveSensorContactTimed = () => {
  const time = Date.now();
  let sendUpdate = false;
  App.systems.filter(sys => sys.type === "Sensors").forEach(sensors => {
    const { movement } = sensors;
    sensors.contacts = sensors.contacts.map(contact => {
      // To start out, update the position, location, and destination based
      // on the sensors movement
      if (
        Math.abs(movement.x) > 0 &&
        Math.abs(movement.y) > 0 &&
        Math.abs(movement.z) > 0
      ) {
        contact.location = {
          x: contact.location.x + movement.x,
          y: contact.location.y + movement.y,
          z: contact.location.z + movement.z
        };
        contact.position = {
          x: contact.position.x + movement.x,
          y: contact.position.y + movement.y,
          z: contact.position.z + movement.z
        };
        contact.destination = {
          x: contact.destination.x + movement.x,
          y: contact.destination.y + movement.y,
          z: contact.destination.z + movement.z
        };
      }
      if (contact.speed === 0) return contact;
      const {
        location,
        position,
        destination,
        speed,
        startTime,
        endTime
      } = contact;
      if (speed > 100) {
        contact.position = Object.assign({}, contact.destination);
        contact.location = Object.assign({}, contact.destination);
        contact.speed = 0;
      } else if (speed > 0) {
        // Total movement time is the difference between the distance and location
        // Divided by the speed times one second (1000 ms)
        const currentTime = time - startTime;
        // Location is a function of the current time and the end time.
        const newLoc = {
          x:
            location.x +
            (destination.x - location.x) / (endTime - startTime) * currentTime,
          y:
            location.y +
            (destination.y - location.y) / (endTime - startTime) * currentTime,
          z: 0
        };
        contact.position = newLoc;

        // Auto-target
        const targeting = App.systems.find(
          s => s.simulatorId === sensors.simulatorId && s.class === "Targeting"
        );
        if (sensors.autoTarget) {
          if (distance3d({ x: 0, y: 0, z: 0 }, newLoc) < 0.33) {
            if (!targeting.classes.find(t => t.id === contact.id)) {
              const target = {
                id: contact.id,
                name: contact.name,
                size: contact.size,
                icon: contact.icon,
                picture: contact.picture,
                speed: contact.speed || 1
              };
              targeting.addTargetClass(target);
              targeting.createTarget(contact.id);
              pubsub.publish(
                "targetingUpdate",
                App.systems.filter(s => s.type === "Targeting")
              );
            }
          } else {
            if (targeting.classes.find(t => t.id === contact.id)) {
              targeting.removeTargetClass(contact.id);
              pubsub.publish(
                "targetingUpdate",
                App.systems.filter(s => s.type === "Targeting")
              );
            }
          }
        }

        // Reached Destination
        if (distance3d(destination, position) < 0.01) {
          contact.speed = 0;
          contact.position = Object.assign({}, contact.destination);
          contact.location = Object.assign({}, contact.destination);
          sendUpdate = true;
        }
      }
      return contact;
    });
  });
  if (sendUpdate) {
    App.systems.forEach(sys => {
      if (sys.type === "Sensors") {
        const sensors = sys;
        pubsub.publish("sensorContactUpdate", sensors);
      }
    });
  }
  setTimeout(moveSensorContactTimed, interval);
};

const updateSensors = () => {
  App.systems.forEach(sys => {
    if (sys.type === "Sensors") {
      const sensors = sys;
      pubsub.publish("sensorContactUpdate", sensors);
    }
  });
  setTimeout(updateSensors, updateInterval);
};

const activePingInterval = 6500;
const passivePingInterval = 15000;
const pingSensors = () => {
  App.systems.forEach(sys => {
    if (sys.type === "Sensors" && sys.pings === true) {
      const sensors = sys;
      // Increment the timeSincePing
      sensors.timeSincePing = sensors.timeSincePing + pingInterval;
      if (
        (sensors.pingMode === "active" &&
          sensors.timeSincePing >= activePingInterval) ||
        (sensors.pingMode === "passive" &&
          sensors.timeSincePing >= passivePingInterval)
      ) {
        App.handleEvent({ id: sensors.id }, "pingSensors", {});
      }
    }
  });
  setTimeout(pingSensors, pingInterval);
};
const sensorsAutoThrusters = () => {
  App.systems.forEach(sys => {
    if (sys.type === "Sensors" && sys.autoThrusters === true) {
      const sensors = sys;
      const thrusters = App.systems.find(
        s => s.class === "Thrusters" && s.simulatorId === sensors.simulatorId
      );
      if (thrusters) {
        sensors.nudgeContacts(
          {
            x: thrusters.direction.x / -50,
            y: thrusters.direction.z / 50,
            z: thrusters.direction.y / 50
          },
          0.3,
          0
        );
        pubsub.publish(
          "sensorContactUpdate",
          Object.assign({}, sensors, {
            contacts: sensors.contacts.map(c =>
              Object.assign({}, c, { forceUpdate: true })
            )
          })
        );
        // Reset the force update after a second.
        setTimeout(() => pubsub.publish("sensorContactUpdate", sensors), 500);
      }
    }
  });
  setTimeout(sensorsAutoThrusters, 500);
};
sensorsAutoThrusters();
moveSensorContactTimed();
pingSensors();
//updateSensors();
