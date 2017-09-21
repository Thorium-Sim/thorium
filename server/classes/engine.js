import { System, HeatMixin } from "./generic";

export default class Engine extends HeatMixin(System) {
  constructor(params = {}) {
    super(params);
    this.class = "Engine";
    this.type = "Engine";
    this.on = params.on || false;
    this.speeds = params.speeds || [];
    this.speed = params.speed || -1;
    this.cooling = false;
    this.displayName = params.displayName || this.name + " Engine";
  }
  get stealthFactor() {
    const topSpeed = this.speeds.reduce((prev, next) => {
      return next.number > prev ? next.number : prev;
    }, 0);
    const currentSpeed = this.speeds[this.speed]
      ? this.speeds[this.speed].number
      : 0;
    return currentSpeed / topSpeed;
  }
  setSpeeds(speeds) {
    this.speeds = speeds;
  }
  break(report) {
    this.on = false;
    this.speed = -1;
    super.break(report);
  }
  setPower(powerLevel) {
    // Override set power to change speed when power is changed
    if (this.on && this.power.powerLevels[this.speed - 1] > powerLevel) {
      this.speed = this.power.powerLevels.findIndex(p => p === powerLevel) + 1;
    }
    super.setPower(powerLevel);
  }
  setSpeed(speed = -1, on = false) {
    // Check power
    if (on && this.power.power < this.power.powerLevels[speed - 1]) {
      this.speed =
        this.power.powerLevels.findIndex(p => p === this.power.power) + 1;
      if (this.speed === 0 || this.speed === -1) {
        this.on = false;
      } else {
        this.on = true;
      }
      return;
    }
    this.speed = speed;
    this.on = on;
  }

  cool(state = true) {
    this.cooling = state;
  }
}
