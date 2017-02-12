import uuid from 'uuid';
import * as THREE from 'three';
// TODO: Extend this with different types of sensor contacts
// Ex: Ship has crew count, weapons, etc.

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

export default class SensorContact {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.sensorId = params.sensorId || null;
    this.class = 'SensorContact';
    this.name = params.name || 'Contact';
    this.size = params.size || 1; // Float - Scale percentage
    this.icon = params.icon || 'Default'; // Added to '/Sensor Contacts/'
    this.picture = params.picture || 'Default'; // Added to '/Sensor Pictures/'
    this.speed = params.speed || 0; // Float
    this.velocity = params.velocity || { x: 0, y: 0, z: 0 };
    this.location = params.location || {
      x: 0,
      y: 0,
      z: 0,
    };
    this.destination = params.destination || {
      x: 0,
      y: 0,
      z: 0,
    };
    this.infrared = params.infrared || false;
    this.cloaked = params.cloaked || false;
    this.destroyed = false;
  }
  move(coordinates, speed, stop) {
    this.speed = stop ? 0 : speed;
    this.destination = coordinates;
    const locationVector = new THREE.Vector3(this.location.x, this.location.y, this.location.z);
    const destinationVector = new THREE.Vector3(coordinates.x, coordinates.y, coordinates.z);
    this.velocity = destinationVector.sub(locationVector).normalize().multiplyScalar(speed);
    if (stop) { this.destination = this.location; }
  }
  updateLocation(coordinates) {
    this.location = coordinates;
    // Reset the velocity and speed if it is at it's destination
    if (distance3d(this.destination, this.location) < 0.005) { // A magic number
      this.velocity = { x: 0, y: 0, z: 0 };
      this.speed = 0;
    }
  }
  updateInfrared(tf) {
    this.infrared = tf;
  }
  updateIcon(icon) {
    this.icon = icon;
  }
  updateName(name) {
    this.name = name;
  }
  updateSize(size) {
    this.size = size;
  }
  updatePicture(picture) {
    this.picture = picture;
  }
}
