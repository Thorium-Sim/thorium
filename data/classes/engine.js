import uuid from 'uuid';

export default class Engine {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.on = params.on || false;
    this.type = params.type || null;
    this.speeds = params.speeds || [];
    this.speed = params.speed || -1;
    this.heat = params.heat || 0;
    this.heatRate = params.heatRate || 1;
    this.coolant = params.coolant || 0;
  }
}

