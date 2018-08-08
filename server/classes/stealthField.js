import { System } from "./generic";

export default class StealthField extends System {
  constructor(params) {
    super(params);
    this.class = "StealthField";
    this.type = "StealthField";
    this.name = params.name || "Stealth Field";
    this.charge = params.charge || false;
    this.activated = params.activated || true;
    this.state = params.state || !this.activated;
    this.quadrants = params.quadrants || {
      fore: 0,
      aft: 0,
      port: 0,
      starboard: 0
    };
  }
  setActivated(tf) {
    this.activated = tf;
    this.state = !tf;
  }
  setCharge(tf) {
    this.charge = tf;
  }
  activate() {
    if (this.charge) {
      if (
        this.quadrants.fore !== 0.5 ||
        this.quadrants.aft !== 0.5 ||
        this.quadrants.starboard !== 0.5 ||
        this.quadrants.port !== 0.5
      ) {
        return;
      }
    }
    this.state = true;
  }
  deactivate() {
    this.state = false;
  }
  setQuadrant(which, value) {
    this.quadrants[which] = value;
  }
  fluxQuadrants() {
    this.quadrants.fore = Math.round(Math.random() * 20) / 20;
    this.quadrants.aft = Math.round(Math.random() * 20) / 20;
    this.quadrants.starboard = Math.round(Math.random() * 20) / 20;
    this.quadrants.port = Math.round(Math.random() * 20) / 20;
  }
  break(report, destroyed, which) {
    this.deactivate();
    super.break(report, destroyed, which);
  }
  setPower(powerLevel) {
    if (
      this.power.powerLevels.length &&
      powerLevel < this.power.powerLevels[0]
    ) {
      this.deactivate();
    }
    super.setPower(powerLevel);
  }
}
