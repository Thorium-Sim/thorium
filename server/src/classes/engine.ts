import App from "../app";
import {System} from "./generic";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";
export default class Engine extends System {
  class: "Engine";
  type: string;
  wing: "left" | "right";
  on: boolean;
  speeds: {optimal?: boolean; number: number}[];
  speed: number;
  previousSpeed: number;
  useAcceleration: boolean;
  speedFactor: number;
  acceleration: number;
  heat: number;
  heatRate: number;
  coolant: number;
  cooling: boolean;
  constructor(params: Partial<Engine & System> = {}) {
    super({displayName: params.name + " Engine", ...params});
    this.class = "Engine";
    this.type = "Engine";
    this.wing = params.wing || "left";

    this.on = params.on || false;
    this.speeds = params.speeds || [];
    this.speed = params.speed || -1;
    this.previousSpeed = params.speed || 0;
    this.useAcceleration = params.useAcceleration || false; // useAcceleration requires negative speed to stop.
    this.speedFactor = params.speedFactor || 1250;
    this.acceleration = params.acceleration || 0;
    this.cooling = false;
    this.heat = params.heat || 0;
    this.heatRate = params.heatRate || 1;
    this.coolant = params.coolant || 1;
  }
  setHeat(heat) {
    this.heat = Math.min(1, Math.max(0, heat));
  }
  setCoolant(coolant) {
    this.coolant = Math.min(1, Math.max(0, coolant));
  }
  setRate(rate) {
    this.heatRate = rate;
  }
  applyCoolant() {
    this.coolant = this.coolant - 0.037;
    this.heat = this.heat - 0.89;
  }
  cool(state = true) {
    this.cooling = state;
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
    if (this.on) {
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId: this.simulatorId,
        station: "Core",
        type: "Engines",
        title: `Speed Change Full Stop`,
        body: ``,
        color: "info",
      });
      App.handleEvent(
        {
          simulatorId: this.simulatorId,
          title: `Speed Change Full Stop`,
          component: "EngineControlCore",
          body: null,
          color: "info",
        },
        "addCoreFeed",
      );
    }
    this.setSpeed();

    super.break(report, destroyed, which);
  }
  setPower(powerLevel) {
    if (!this.power) return;
    // Override set power to change speed when power is changed
    if (this.on && this.power.powerLevels[this.speed - 1] > powerLevel) {
      this.speed = this.power.powerLevels.findIndex(p => p === powerLevel) + 1;
      if (this.speed === 0) {
        if (this.on) {
          pubsub.publish("notify", {
            id: uuid.v4(),
            simulatorId: this.simulatorId,
            station: "Core",
            type: "Engines",
            title: `Speed Change Full Stop`,
            body: ``,
            color: "info",
          });
          App.handleEvent(
            {
              simulatorId: this.simulatorId,
              title: `Speed Change Full Stop`,
              component: "EngineControlCore",
              body: null,
              color: "info",
            },
            "addCoreFeed",
          );
        }
        this.setSpeed();
      }
    }
    super.setPower(powerLevel);
  }
  setSpeed(speed = -1, on = false) {
    if (!this.power) return;
    // Check power
    this.previousSpeed = this.speed;
    if (on && this.power.power < this.power.powerLevels[speed - 1]) {
      this.speed =
        this.power.powerLevels.findIndex(p => p === this.power?.power) + 1;
      if (this.speed === 0 || this.speed === -1) {
        this.on = false;
      } else {
        this.on = true;
      }
      return;
    }
    this.speed = speed;
    this.on = on;
    setTimeout(() => {
      this.previousSpeed = this.speed;
    }, 1000);
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
