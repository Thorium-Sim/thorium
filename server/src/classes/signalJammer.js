import uuid from "uuid";
import { System } from "./generic";

class Signal {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.type = params.type || "comm";
    this.level = params.level || Math.random();
    this.power = params.power || Math.random() / Math.sqrt(2) + 0.3;
  }
  flux() {
    this.level = Math.random();
    this.power = Math.random() / Math.sqrt(2) + 0.3;
  }
}

export default class SignalJammer extends System {
  constructor(params = {}) {
    super(params);
    this.name = params.name || "Signal Jammer";
    this.class = "SignalJammer";
    this.type = "SignalJammer";
    this.active = params.active || false;
    this.level = params.level || 0.5;
    this.strength = params.strength || 0.1;
    this.signals = (params.signals || []).map(s => new Signal(s));
  }
  get stealthFactor() {
    return this.active ? this.strength : 0.1;
  }
  break(report, destroyed, which) {
    this.active = false;
    super.break(report, destroyed, which);
  }
  setPower(powerLevel) {
    if (
      this.power.powerLevels.length &&
      powerLevel < this.power.powerLevels[0]
    ) {
      this.active = false;
    }
    super.setPower(powerLevel);
  }
  trainingMode() {
    this.addSignal({});
  }
  update({ level, strength, active }) {
    if (level && level >= 0) this.level = level;
    if (strength && strength >= 0) this.strength = strength;
    if (active || active === false) this.active = active;
  }
  addSignal(params) {
    this.signals.push(new Signal(params));
  }
  removeSignal(id) {
    this.signals = this.signals.filter(s => s.id !== id);
  }
  fluxSignals() {
    this.signals.forEach(s => s.flux());
  }
}
