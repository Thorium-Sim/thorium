import { System } from './generic';

export default class Engine extends System {
  constructor(params = {}) {
    super(params);
    this.class = 'Engine';
    this.type = 'Engine';
    this.on = params.on || false;
    this.speeds = params.speeds || [];
    this.speed = params.speed || -1;
    this.heat = params.heat || 0;
    this.heatRate = params.heatRate || 1;
    this.coolant = params.coolant || 0;
  }
  get stealthFactor() {
    const topSpeed = this.speeds.reduce((prev, next) => {
      return next.number > prev ? next.number : prev;
    },0);
    const currentSpeed = this.speeds[this.speed] ? this.speeds[this.speed].number : 0;
    return currentSpeed / topSpeed;
  }
  break(report) {
    this.on = false;
    this.speed = -1;
    super.break(report);
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

