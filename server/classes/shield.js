import { System } from './generic';

export default class Shield extends System {
  constructor(params) {
    super(params);
    this.class = 'Shield';
    this.type = 'Shield';
    this.name = params.name || 'Full';
    // One of '0,1,2,3,4,5,6'
    this.position = params.position || 0;
    this.frequency = params.frequency || 260.5;
    this.state = params.state || false;
    this.integrity = params.integrity || 1;
  }
  break(report) {
    this.state = false;
    super.break(report);
  }
  shieldState(state) {
    if (!this.damage.damaged){
      this.state = state;
    }
  }
  setIntegrity(integrity) {
    this.integrity = integrity;
  }
  setFrequency(frequency) {
    this.frequency = frequency;
  }
}
