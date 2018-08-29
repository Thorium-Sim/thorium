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
  let sendUpdate = false;
  let targetingUpdate = false;
  App.systems.filter(sys => sys.type === "Sensors").forEach(sensors => {
    const { movement, thrusterMovement } = sensors;
    sensors.contacts = sensors.contacts.map(c => {
      // To start out, update the position, location, and destination based
      // on the sensors movement. Include thrusters, if applicable
      const x = c.locked ? 0 : (movement.x + thrusterMovement.x) / 100;
      const y = c.locked ? 0 : (movement.y + thrusterMovement.y) / 100;
      const z = c.locked ? 0 : (movement.z + thrusterMovement.z) / 100;
      const destination = {
        ...c.destination,
        x: c.destination.x + x,
        y: c.destination.y + y,
        z: c.destination.z + z
      };
      const location = {
        ...c.location,
        x: c.location.x + x,
        y: c.location.y + y,
        z: c.location.z + z
      };
      const position = {
        ...c.position,
        x: c.position.x + x,
        y: c.position.y + y,
        z: c.position.z + z
      };

      if (c.speed === 0) {
        c.destination = destination;
        c.location = location;
        c.position = position;
        return c;
      }
      const time = Date.now();
      if (c.speed > 100) {
        c.destination = destination;
        c.location = destination;
        c.position = destination;
        return c;
      } else if (c.speed > 0) {
        // Total movement time is the difference between the distance and location
        // Divided by the speed times one second (1000 ms)
        const currentTime = time - c.startTime;
        const endTime = c.endTime || c.startTime + 1000;
        // Location is a function of the current time and the end time.
        const newLoc = {
          ...location,
          x:
            location.x +
            ((destination.x - location.x) / (endTime - c.startTime)) *
              currentTime,
          y:
            location.y +
            ((destination.y - location.y) / (endTime - c.startTime)) *
              currentTime,
          z: 0
        };

        if (endTime < Date.now()) {
          c.destination = destination;
          c.location = destination;
          c.position = destination;

          // Projectile destruction
          if (c.type === "projectile" && !c.destroyed) {
            sensors.destroyContact({ id: c.id });
            sendUpdate = true;
          }
        } else {
          c.destination = destination;
          c.position = newLoc;
          c.location = location;
        }

        return c;
      }
    });
    sensors.contacts.forEach(c => {
      // Auto fire
      if (c.hostile && c.autoFire) {
        if (!c.fireTimeTarget) {
          c.fireTimeTarget = Math.round(Math.random() * 300 + 500);
          c.fireTime = 0;
        }
        c.fireTime += 1;
        if (c.fireTime >= c.fireTimeTarget) {
          App.handleEvent(
            {
              simulatorId: sensors.simulatorId,
              contactId: c.id,
              speed: sensors.defaultSpeed,
              hitpoints: sensors.defaultHitpoints
            },
            "sensorsFireProjectile"
          );
          c.fireTime = 0;
          c.fireTimeTarget = 0;
        }
      }

      // Auto-target
      const targeting = App.systems.find(
        s => s.simulatorId === sensors.simulatorId && s.class === "Targeting"
      );
      if (sensors.autoTarget) {
        if (distance3d({ x: 0, y: 0, z: 0 }, c.position) < targeting.range) {
          if (!targeting.classes.find(t => t.id === c.id)) {
            const target = {
              id: c.id,
              name: c.name,
              size: c.size,
              icon: c.icon,
              picture: c.picture,
              speed: c.speed || 1
            };
            targeting.addTargetClass(target);
            targeting.createTarget(c.id);
            targetingUpdate = true;
          }
        } else {
          if (targeting.classes.find(t => t.id === c.id)) {
            targeting.removeTargetClass(c.id);
            targetingUpdate = true;
          }
        }
      }
    });
  });
  if (targetingUpdate) {
    pubsub.publish(
      "targetingUpdate",
      App.systems.filter(s => s.type === "Targeting")
    );
  }
  if (sendUpdate) {
    App.systems.forEach(sys => {
      if (sys.type === "Sensors" && sys.domain === "external") {
        pubsub.publish("sensorContactUpdate", sys);
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
//sensorsAutoThrusters();
moveSensorContactTimed();
pingSensors();
//updateSensors();
