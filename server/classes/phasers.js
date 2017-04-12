import { System } from './generic';
export default class Phasers extends System {
  constructor(params) {
    super(params);
    this.class = 'Phasers';
    this.type = 'Phasers';
    this.name = params.name || 'Phaser';
    this.state = params.state || 'idle';
    this.charge = params.charge || 0;
    this.arc = params.arc || 0.5;
  }
  updateState(state){
    this.state = state;
  }
  updateCharge(charge){
    this.charge = Math.min(1, Math.max(0, charge));
  }
  updateArc(arc){
    this.arc = Math.min(1, Math.max(0, arc));
  }
}