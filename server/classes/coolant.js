import { System } from './generic';

// Gotta have a place to store coolant for now
// Eventually this will be handled by coolant in the
// Coolant Tank room

export default class Coolant extends System {
  constructor(params = {}) {
    super(params);
    this.class = "Coolant";
    this.type = "Coolant";
    this.coolant = params.coolant || 1;
    this.coolantRate = params.coolantRate || 0.2; // Effectively 5 times as much coolant in the tank than in a system
  }
  setCoolant(coolant) {
    this.coolant = Math.min(1, Math.max(0, coolant));
  }
  setCoolantRate(coolantRate) {
    this.coolantRate = coolantRate;
  }
}