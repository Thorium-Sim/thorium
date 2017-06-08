import { System, HeatMixin } from './generic';

export default class Engine extends HeatMixin(System) {
  constructor(params = {}) {
    super(params);
    this.class = 'Engine';
    this.type = 'Engine';
    this.on = params.on || false;
    this.speeds = params.speeds || [];
    this.speed = params.speed || -1;
    this.cooling = false;
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
  cool(state = true) {
    this.cooling = state;
  } 
}

