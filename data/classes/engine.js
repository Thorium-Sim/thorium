import uuid from 'uuid';

export default class Shield {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.type = params.type || null;
    this.speeds = params.speeds || [];
    this.speed = params.speed || -1;
    this.heat = params.heat || 0;
    this.coolant = params.coolant || 0;
  }
}
