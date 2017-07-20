import App from '../../app';
import * as THREE from 'three';
import { pubsub } from '../helpers/subscriptionManager.js';

const interval = 30; // 1/30 of a second
const updateInterval = 1000;
const pingInterval = 100;
function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

const moveSensorContact = () => {
  App.systems.forEach(sys => {
    if (sys.type === 'Sensors') {
      // Loop through all of the sensor contacts
      const sensors = sys;
      sensors.contacts = sensors.contacts.map(contact => {
        const { location, destination, speed } = contact;
        const newContact = contact;
        if (contact.speed > 100) {
          location.x = destination.x;
          location.y = destination.y;
          location.z = destination.z;
          newContact.location = location;
          newContact.velocity = { x: 0, y: 0, z: 0 };
          newContact.speed = 0;
        } else if (contact.speed > 0) {
          // Update the velocity
          const locationVector = new THREE.Vector3(
            location.x,
            location.y,
            location.z
          );
          const destinationVector = new THREE.Vector3(
            destination.x,
            destination.y,
            destination.z
          );

          const velocity = destinationVector
            .sub(locationVector)
            .normalize()
            .multiplyScalar(speed);

          velocity.x = velocity.x || 0;
          velocity.y = velocity.y || 0;
          velocity.z = velocity.z || 0;

          // Update the location
          location.x +=
            Math.round(velocity.x / (10000 / interval) * 10000) / 10000;
          location.y +=
            Math.round(velocity.y / (10000 / interval) * 10000) / 10000;
          location.z +=
            Math.round(velocity.z / (10000 / interval) * 10000) / 10000;

          // Why not clean up the destination while we're at it?
          destination.x = Math.round(destination.x * 10000) / 10000;
          destination.y = Math.round(destination.y * 10000) / 10000;
          destination.z = Math.round(destination.z * 10000) / 10000;

          // Check to see if it is close enough to the destination
          newContact.location = location;
          newContact.velocity = velocity;
          if (distance3d(destination, location) < 0.005) {
            // A magic number
            newContact.velocity = { x: 0, y: 0, z: 0 };
            newContact.speed = 0;
          }
        }
        contact.updateLocation(location);
        return newContact;
      });
      return sensors;
    }
    return sys;
  });
  setTimeout(moveSensorContact, interval);
};
const updateSensorGrids = () => {
  App.systems.forEach(sys => {
    if (sys.type === 'Sensors') {
      const sensors = sys;
      pubsub.publish('sensorContactUpdate', sensors.contacts);
    }
  });
  setTimeout(updateSensorGrids, updateInterval);
};

const activePingInterval = 6000;
const passivePingInterval = 15000;
const pingSensors = () => {
  App.systems.forEach(sys => {
    if (sys.type === 'Sensors' && sys.pings === true) {
      const sensors = sys;
      // Increment the timeSincePing
      sensors.timeSincePing = sensors.timeSincePing + pingInterval;
      if (
        (sensors.pingMode === 'active' &&
          sensors.timeSincePing >= activePingInterval) ||
        (sensors.pingMode === 'passive' &&
          sensors.timeSincePing >= passivePingInterval)
      ) {
        App.handleEvent({ id: sensors.id }, 'pingSensors', {});
      }
    }
  });
  setTimeout(pingSensors, pingInterval);
};

//updateSensorGrids();
moveSensorContact();
pingSensors();

export default moveSensorContact;
