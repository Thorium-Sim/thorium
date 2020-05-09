import {System} from "./generic";

export default class Shield extends System {
  constructor(params) {
    super({
      name: "Full",
      displayName:
        params.name === "Full" || params.name === "Shields"
          ? "Shields"
          : params.name + " Shields",
      ...params,
    });
    this.class = "Shield";
    this.type = "Shield";
    this.wing = params.wing || "left";

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
    const {currentStep} = this.damage;
    super.break(report || this.damage.report, destroyed, which);
    this.damage.currentStep = currentStep;
  }
  repair() {
    super.repair();
    this.integrity = 1;
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
    if (!state) {
      // Lower always works
      this.state = state;
      return true;
    }
    // Isn't damaged and has enough power.
    if (
      !this.damage.damaged &&
      this.power.powerLevels.length &&
      this.power.power >= this.power.powerLevels[0]
    ) {
      this.state = state;
      return true;
    }
    return false;
  }
  setIntegrity(integrity) {
    this.integrity = Math.min(1, Math.max(0, integrity));
    if (this.integrity === 0) {
      this.break();
    }
  }
  setFrequency(frequency) {
    this.frequency = frequency;
  }
}
