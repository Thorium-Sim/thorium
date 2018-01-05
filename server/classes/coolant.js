// @flow
import { System } from "./generic";

// Gotta have a place to store coolant for now
// Eventually this will be handled by coolant in the
// Coolant Tank room

export default class Coolant extends System {
  class: string;
  type: string;
  coolant: number;
  coolantRate: number;
  transfer: ?mixed;
  constructor(params: {
    coolant: number,
    coolantRate: number,
    transfer: ?mixed
  }) {
    params = params || {};
    super(params);
    this.name = params.name || "Coolant";
    this.class = "Coolant";
    this.type = "Coolant";
    this.coolant = params.coolant || 1;
    this.coolantRate = params.coolantRate || 0.2; // Effectively 5 times as much coolant in the tank than in a system
    this.transfer = params.transfer || null;
  }
  get power(): mixed {
    return {};
  }
  set power(a: mixed) {
    return;
  }
  setCoolant(coolant: number) {
    this.coolant = Math.min(1, Math.max(0, coolant));
  }
  setCoolantRate(coolantRate: number) {
    this.coolantRate = coolantRate;
  }
  transferCoolant(sysId: string, which: string) {
    let sign = 1;
    if (which === "tank") {
      // Into the tank
      sign = -1;
    }
    this.transfer = { sysId, sign };
  }
  cancelTransfer() {
    this.transfer = null;
  }
}
