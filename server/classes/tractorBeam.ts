import {System} from "./generic";

class Beam {
  state: boolean;
  target: boolean;
  targetLabel: string;
  strength: number;
  stress: number;
  constructor(params: Partial<Beam> = {}) {
    this.state = params.state || false;
    this.target = params.target || false;
    this.targetLabel = params.targetLabel || "";
    this.strength = params.strength || 0.0;
    this.stress = params.stress || 0.15;
  }
}
export default class TractorBeam extends System {
  class: "TractorBeam" = "TractorBeam";
  type: "TractorBeam" = "TractorBeam";
  beams: Beam[];

  constructor(params: Partial<TractorBeam & Beam> = {}) {
    super(params);
    this.class = "TractorBeam";
    this.type = "TractorBeam";
    this.wing = params.wing || "right";

    this.name = params.name || "Tractor Beam";
    this.beams = params.beams
      ? params.beams.map(b => new Beam(b))
      : [new Beam(params)];
  }
  get stealthFactor() {
    const beamsRunning = this.beams.find(b => b.state);
    const strength = this.beams.reduce(
      (prev, next) => Math.max(prev, next.strength),
      0,
    );
    return beamsRunning ? strength / 5 + 0.8 : 0;
  }
  trainingMode() {
    this.setTarget(true);
    this.setTargetLabel("Training Target");
  }

  break(report, destroyed, which) {
    this.beams.forEach(b => (b.state = false));
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
    this.strength = Math.min(1, Math.max(0, perc));
  }
  setStress(perc) {
    this.stress = Math.min(1, Math.max(0, perc));
  }
  setScanning(scanning) {
    this.scanning = scanning;
  }
}
