import { System } from "./generic";

export default class Shield extends System {
  constructor(params) {
    super(params);
    this.class = "Shield";
    this.type = "Shield";
    this.name = params.name || "Full";
    this.displayName =
      params.displayName ||
      (this.name === "Full" ? "Shields" : this.name + " Shields");
    // One of '0,1,2,3,4,5,6'
    this.position = params.position || 0;
    this.frequency = params.frequency || 260.5;
    this.state = params.state || false;
    this.integrity = params.integrity || 1;
  }
  get stealthFactor() {
    return this.state ? this.integrity : 0;
  }
  break(report, destroyed, which) {
    this.state = false;
    super.break(report, destroyed, which);
  }
  setPower(powerLevel) {
    if (
      this.power.powerLevels.length &&
      powerLevel < this.power.powerLevels[0]
    ) {
      this.state = false;
    }
    super.setPower(powerLevel);
  }
  shieldState(state) {
    if (!this.damage.damaged) {
      this.state = state;
    }
  }
  setIntegrity(integrity) {
    this.integrity = Math.min(1, Math.max(0, integrity));
    if (this.integrity === 0) {
      this.state = false;
    }
  }
  setFrequency(frequency) {
    this.frequency = frequency;
  }
}
