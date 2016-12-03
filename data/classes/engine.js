import uuid from 'uuid';

export default class Engine {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || null;
    this.on = params.on || false;
    this.type = 'Engine';
    this.speeds = params.speeds || [];
    this.speed = params.speed || -1;
    this.heat = params.heat || 0;
    this.heatRate = params.heatRate || 1;
    this.coolant = params.coolant || 0;
    this.class = 'Engine';
  }
  setSpeed(speed, on) {
    this.speed = speed;
    this.on = on;
  }
  addHeat(heat) {
    this.heat += heat;
    if (this.heat < 0) this.heat = 0;
    if (this.heat >= 100) this.heat = 100;
  }
}
