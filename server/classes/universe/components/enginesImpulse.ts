import {registerComponent} from "../component";
import {immerable} from "immer";

export class EnginesImpulse {
  [immerable] = true;
  static class = "EnginesImpulse";
  class = "EnginesImpulse";
  maxSpeed: number;
  currentSpeed: number;
  velocity: number;
  heat: number;
  heatRate: number;
  coolant: number;
  cooling: boolean;
  constructor({
    maxSpeed = 1.25,
    currentSpeed = 0,
    velocity = 0,
    heat = 0,
    heatRate = 0,
    coolant = 0,
    cooling = false,
  }) {
    this.maxSpeed = maxSpeed;
    this.currentSpeed = currentSpeed;
    this.velocity = velocity;
    this.heat = heat;
    this.heatRate = heatRate;
    this.coolant = coolant;
    this.cooling = cooling;
  }
}

registerComponent(EnginesImpulse);
