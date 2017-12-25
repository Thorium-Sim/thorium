import { System } from "./generic";

export default class TractorBeam extends System {
  constructor(params) {
    super(params);
    this.class = "TractorBeam";
    this.type = "TractorBeam";
    this.name = params.name || "Tractor Beam";
    this.state = params.state || false;
    this.target = params.target || false;
    this.targetLabel = params.targetLabel || "";
    this.strength = params.strength || 0.0;
    this.stress = params.stress || 0.15;
    this.scanning = params.scanning || false;
  }
  get stealthFactor() {
    return this.state ? this.stress / 5 + 0.8 : 0;
  }
  break(report) {
    this.state = false;
    super.break(report);
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
  setState(tf) {
    this.state = tf;
  }
  setTarget(tf) {
    this.target = tf;
  }
  setTargetLabel(label) {
    this.targetLabel = label;
  }
  setStrength(perc) {
    this.strength = perc;
  }
  setStress(perc) {
    this.stress = perc;
  }
  setScanning(scanning) {
    this.scanning = scanning;
  }
}
