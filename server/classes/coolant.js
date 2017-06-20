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
    this.transfer = params.transfer || null;
  }
  get power () {
    return {};
  }
  set power (a) {
    return;
  }
  setCoolant(coolant) {
    this.coolant = Math.min(1, Math.max(0, coolant));
  }
  setCoolantRate(coolantRate) {
    this.coolantRate = coolantRate;
  }
  transferCoolant(sysId, which) {
    let sign = 1;
    if (which === "tank") {
      // Into the tank
      sign = -1;
    }
    this.transfer = {sysId, sign}
  }
  cancelTransfer() {
    this.transfer = null;
  }
}