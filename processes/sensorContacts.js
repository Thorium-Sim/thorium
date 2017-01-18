import App from '../app';
import * as THREE from 'three';

const interval = 100; // 1 tenth of a second

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

const moveSensorContact = () => {
  App.systems.forEach((sys) => {
    if (sys.type === 'Sensors') {
      // Loop through all of the sensor contacts
      const sensors = sys;
      sensors.contacts = sensors.contacts.map((contact) => {
        const { location, destination, speed } = contact;
        const newContact = contact;
        if (contact.speed > 0) {
          // Update the velocity
          const locationVector = new THREE.Vector3(location.x, location.y, location.z);
          const destinationVector = new THREE.Vector3(destination.x, destination.y, destination.z);
          const velocity = destinationVector.sub(locationVector).normalize().multiplyScalar(speed);

          // Update the location
          location.x += Math.round(velocity.x / (10000 / interval) * 10000) / 10000;
          location.y += Math.round(velocity.y / (10000 / interval) * 10000) / 10000;
          location.z += Math.round(velocity.z / (10000 / interval) * 10000) / 10000;

          // Why not clean up the destination while we're at it?
          destination.x = Math.round(destination.x * 10000) / 10000;
          destination.y = Math.round(destination.y * 10000) / 10000;
          destination.z = Math.round(destination.z * 10000) / 10000;

          // Check to see if it is close enough to the destination
          newContact.location = location;
          newContact.velocity = velocity;
          if (distance3d(destination, location) < 0.005) { // A magic number
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
moveSensorContact();

export default moveSensorContact;
