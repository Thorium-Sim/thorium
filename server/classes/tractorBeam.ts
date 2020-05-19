import {System} from "./generic";
import uuid from "uuid";

class Beam {
  id: string;
  state: boolean;
  target: boolean;
  targetLabel: string;
  strength: number;
  stress: number;
  scanning: boolean;
  constructor(params: Partial<Beam> = {}) {
    this.id = params.id || uuid.v4();
    this.state = params.state || false;
    this.target = params.target || false;
    this.targetLabel = params.targetLabel || "";
    this.strength = params.strength || 0.0;
    this.stress = params.stress || 0.15;
    this.scanning = params.scanning || false;
  }
  setState(tf: boolean) {
    this.state = tf;
  }
  setTarget(tf: boolean) {
    this.target = tf;
  }
  setTargetLabel(label: string) {
    this.targetLabel = label;
  }
  setStrength(percent: number) {
    this.strength = Math.min(1, Math.max(0, percent));
  }
  setStress(percent: number) {
    this.stress = Math.min(1, Math.max(0, percent));
  }
  setScanning(scanning: boolean) {
    this.scanning = scanning;
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
      : [new Beam({...params, id: null})];
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
    this.beams?.[0].setTarget(true);
    this.beams?.[0].setTargetLabel("Training Target");
  }

  break(report, destroyed, which) {
    this.beams.forEach(b => b.setState(false));
    super.break(report, destroyed, which);
  }
  setPower(powerLevel) {
    if (
      this.power.powerLevels.length &&
      powerLevel < this.power.powerLevels[0]
    ) {
      this.beams.forEach(b => b.setState(false));
    }
    super.setPower(powerLevel);
  }
  setBeamCount(count: number) {
    if (count > 4 || count <= 0 || count === 3) return;
    if (this.beams.length < count) {
      const needed = count - this.beams.length;
      for (let i = 0; i < needed; i++) {
        this.beams.push(new Beam({}));
      }
    } else if (this.beams.length > count) {
      this.beams = this.beams.slice(0, count);
    }
  }
  setState(beam: string, tf: boolean) {
    this.beams.find(b => b.id === beam).setState(tf);
  }
  setTarget(beam: string, tf: boolean) {
    this.beams.find(b => b.id === beam).setTarget(tf);
  }
  setTargetLabel(beam: string, label: string) {
    this.beams.find(b => b.id === beam).setTargetLabel(label);
  }
  setStrength(beam: string, percent: number) {
    this.beams.find(b => b.id === beam).setStrength(percent);
  }
  setStress(beam: string, percent: number) {
    this.beams.find(b => b.id === beam).setStress(percent);
  }
  setScanning(beam: string, scanning: boolean) {
    this.beams.find(b => b.id === beam).setScanning(scanning);
  }
}
