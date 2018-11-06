import { System } from "./generic";
import HeatMixin from "./generic/heatMixin";

// It's easier to manage power if there is just one phaser system with multiple beams than
// If there are multiple phaser systems
export default class Phasers extends HeatMixin(System) {
  constructor(params = {}) {
    super(params);
    this.class = "Phasers";
    this.type = "Phasers";
    this.name = params.name || "Phaser";
    this.arc = params.arc || 0.5;
    this.beams = [];
    const beamConfig = params.beams || 2;
    if (typeof beamConfig === "number") {
      // Creating it for the first time
      for (let i = 0; i < beamConfig; i++) {
        this.beams.push(new Beam({}));
      }
    } else {
      beamConfig.forEach(b => this.beams.push(new Beam(b)));
    }
    //The phaser which is being cooled
    this.cooling = params.cooling || null;

    this.holdToCharge = params.holdToCharge || false;
    this.chargeSpeed = params.chargeSpeed || 1;
  }
  get stealthFactor() {
    const length = this.beams.length;
    return this.beams.map(b => b.charge + b.heat).reduce((prev, next) => {
      return prev + next / length;
    }, 0);
  }
  setBeams(count = 0) {
    this.beams = [];
    for (let i = 0; i < count; i++) {
      this.beams.push(new Beam({}));
    }
  }
  updateBeamState(beamId, state) {
    this.beams.find(b => b.id === beamId).updateState(state);
  }
  updateBeamCharge(beamId, charge) {
    this.beams.find(b => b.id === beamId).updateCharge(charge);
  }
  updateBeamHeat(beamId, heat) {
    this.beams.find(b => b.id === beamId).setHeat(heat);
  }
  updateBeamCoolant(beamId, coolant) {
    this.beams.find(b => b.id === beamId).setCoolant(coolant);
  }
  fireBeam(beamId) {
    this.beams.find(b => b.id === beamId).fire();
  }
  chargeBeam(beamId) {
    if (this.holdToCharge) {
      this.beams.find(b => b.id === beamId).charge();
    } else {
      this.updateBeamCharge(beamId, 1);
    }
  }
  coolBeam(beamId) {
    this.cooling = beamId;
  }
  stopBeams() {
    this.beams.forEach(b => (b.state = "idle"));
  }
  //TODO: Add functions for updating the power level for the beams themselves
  // As well as damaging individual beams.
  updateArc(arc) {
    this.arc = Math.min(1, Math.max(0, arc));
  }
  break(report, destroyed, which) {
    this.beams.forEach(b => b.updateCharge(0));
    super.break(report, destroyed, which);
  }
  setPower(powerLevel) {
    if (
      this.power.powerLevels.length &&
      powerLevel < this.power.powerLevels[0]
    ) {
      this.beams.forEach(b => b.updateCharge(0));
    }
    super.setPower(powerLevel);
  }
  setHoldToCharge(htc) {
    this.holdToCharge = htc;
  }
  setChargeSpeed(chargeSpeed) {
    this.chargeSpeed = chargeSpeed;
  }
  stopCharging() {
    this.beams.forEach(b => {
      if (b.state === "charging") {
        b.updateState("idle");
      }
    });
  }
}

//Extend system so we have access to damage and power management
//Power for this is separate from systems proper.
class Beam extends System {
  constructor(params) {
    super(params);
    this.state = params.state || "idle";
    this.charge = params.charge || 0;
    this.heat = params.heat || 0;
    this.heatRate = 0.01;
  }
  updateState(state) {
    this.state = state;
  }
  updateCharge(charge) {
    this.charge = Math.min(1, Math.max(0, charge));
    if (charge <= 0 || charge >= 1) {
      // Set the beam to 'idle'
      this.state = "idle";
    }
  }
  updateHeat(heat) {
    this.heat = Math.min(1, Math.max(0, heat));
  }
  setHeat(heat) {
    this.heat = Math.min(1, Math.max(0, heat));
  }
  updateHeatRate(heatRate) {
    this.heatRate = heatRate;
  }
  charge() {
    this.state = "charging";
  }
  fire() {
    // Handle the rest of the functionality in the process
    this.state = "firing";
  }
}
