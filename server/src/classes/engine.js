import App from "../app";
import { System } from "./generic";
import HeatMixin from "./generic/heatMixin";
import { pubsub } from "../helpers/subscriptionManager.js";

export default class Engine extends HeatMixin(System) {
  constructor(params = {}) {
    super(params);
    this.class = "Engine";
    this.type = "Engine";
    this.on = params.on || false;
    this.speeds = params.speeds || [];
    this.speed = params.speed || -1;
    this.useAcceleration = params.useAcceleration || false; // useAcceleration requires negative speed to stop.
    this.speedFactor = params.speedFactor || 1250;
    this.acceleration = params.acceleration || 0;
    this.cooling = false;
    this.displayName = params.displayName || this.name + " Engine";
  }
  get stealthFactor() {
    if (!this.on) return 0;
    const optimalSpeed = this.speeds.find(s => s.optimal);
    const optimalNumber = optimalSpeed ? optimalSpeed.number : 0;
    const topSpeed = this.speeds.reduce((prev, next) => {
      return next.number > prev ? next.number : prev;
    }, 0);
    const currentSpeed = this.speeds[this.speed - 1]
      ? this.speeds[this.speed - 1].number
      : 0;
    if (currentSpeed === optimalNumber) return 0;
    if (currentSpeed > optimalNumber || optimalNumber === 0) {
      return (currentSpeed - optimalNumber) / (topSpeed - optimalNumber);
    }
    if (currentSpeed < optimalNumber) {
      // A parabola peaking at 0.74, but at 0 at the optimal number
      return (
        (-1 / (optimalNumber * 2)) * Math.pow(currentSpeed, 2) +
        currentSpeed / 2
      );
    }
    return currentSpeed / topSpeed;
  }
  setSpeeds(speeds) {
    this.speeds = speeds;
  }
  break(report, destroyed, which) {
    // Stop all of the engines
    App.systems
      .filter(s => s.simulatorId === this.simulatorId && s.class === "Engine")
      .forEach(s => {
        if (s.id === this.id || s.speed <= 0) {
          s.setSpeed(); // By default it turns off engines
          pubsub.publish("engineUpdate", s);
        }
      });
    super.break(report, destroyed, which);
  }
  setPower(powerLevel) {
    // Override set power to change speed when power is changed
    if (this.on && this.power.powerLevels[this.speed - 1] > powerLevel) {
      this.speed = this.power.powerLevels.findIndex(p => p === powerLevel) + 1;
      if (this.speed === 0) {
        // Stop all of the engines that aren't going.
        App.systems
          .filter(
            s => s.simulatorId === this.simulatorId && s.class === "Engine"
          )
          .forEach(s => {
            if (s.id === this.id || s.speed <= 0) {
              s.setSpeed(); // By default it turns off engines
              pubsub.publish("engineUpdate", s);
            }
          });
      }
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
  setAcceleration(num) {
    this.acceleration = num;
  }
  setSpeedFactor(num) {
    this.speedFactor = num;
  }
  toggleAcceleration(tf) {
    this.useAcceleration = tf;
  }
}
