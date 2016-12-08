import uuid from 'uuid';

export default class SensorContact {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.class = 'SensorContact';
    this.name = params.name || 'Contact';
    this.size = params.size || 1; // Float - Scale percentage
    this.icon = params.icon || 'Default'; // Added to '/Sensor Contacts/'
    this.picture = params.picture || 'Default'; // Added to '/Sensor Pictures/'
    this.speed = params.speed || 0; // Float
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
  }

}
