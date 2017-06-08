import { System } from './generic';
// It's easier to manage power if there is just one phaser system with multiple beams than 
// If there are multiple phaser systems
export default class Phasers extends System {
  constructor(params) {
    super(params);
    this.class = 'Phasers';
    this.type = 'Phasers';
    this.name = params.name || 'Phaser';
    this.arc = params.arc || 0.5;
    this.beams = [];
    if (typeof params.beams === 'number'){
      // Creating it for the first time
      for (let i = 0; i < params.beams; i++){
        this.beams.push(new Beam({}));
      }
    } else {
      params.beams.forEach(b => this.beams.push(new Beam(b)));
    }
  }
  get stealthFactor() {
    const length = this.beams.length;
    return this.beams.map(b => b.charge + b.heat)
    .reduce((prev, next) => {
      return prev + next/length;
    }, 0)
  }
  updateBeamState(beamId, state){
    this.beams.find(b => b.id === beamId).updateState(state);
  }
  updateBeamCharge(beamId, charge){
    this.beams.find(b => b.id === beamId).updateCharge(charge);
  }
  updateBeamHeat(beamId, heat) {
    this.beams.find(b => b.id === beamId).updateHeat(heat);
  }
  fireBeam(beamId){
    this.beams.find(b => b.id === beamId).fire();
  }
  //TODO: Add functions for updating the power level for the beams themselves
  // As well as damaging individual beams.
  updateArc(arc){
    this.arc = Math.min(1, Math.max(0, arc));
  }
}

//Extend system so we have access to damage and power management
//Power for this is separate from systems proper.
class Beam extends System{
  constructor(params){
    super(params);
    this.state = params.state || 'idle';
    this.charge = params.charge || 0;
    this.heat = params.heat || 0;
    this.heatRate = params.heatRate || 0.1;
  }
  updateState(state){
    this.state = state;
  }
  updateCharge(charge){
    this.charge = Math.min(1, Math.max(0, charge));
  }
  updateHeat(heat) {
    this.heat = Math.min(1, Math.max(0, heat));
  }
  updateHeatRate(heatRate) {
    this.heatRate = heatRate;
  }
  fire(){
    if (this.heat > 0.9) return;
    if (this.charge > 0){
      this.charge = Math.min(1, Math.max(0, this.charge - 0.1));
      this.heat = Math.min(1, Math.max(0, this.heat + 0.5 * this.heatRate))
    }
    if (this.charge > 0){
      this.state = 'firing';
    } else {
      this.state = 'idle';
    }
  }
}