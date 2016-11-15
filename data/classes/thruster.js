import uuid from 'uuid';

export default class Thrusters {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.type = 'Thruster';
    this.direction = params.direction || { x: 0, y: 0, z: 0 };
    this.rotation = params.rotation || { yaw: 0, pitch: 0, roll: 0 };
    this.rotationDelta = params.rotationDelta || { yaw: 0, pitch: 0, roll: 0 };
    this.rotationRequired = params.rotationRequired || { yaw: 0, pitch: 0, roll: 0 };
    this.manualThrusters = params.manualThrusters || false;
  }
  updateRotation(rotation) {
    this.rotation = rotation;
  }
}
