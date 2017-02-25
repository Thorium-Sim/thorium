import uuid from 'uuid';
import { System } from './generic';

export default class Shield extends System {
  constructor(params) {
    super(params);
    this.id = params.id || uuid.v4();
    this.class = 'Shield';
    this.type = 'Shield';
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || 'Full';
    // One of '0,1,2,3,4,5,6'
    this.position = params.position || 0;
    this.frequency = params.frequency || 260.5;
    this.state = params.state || false;
    this.integrity = params.integrity || 1;
  }
  shieldState(state) {
    this.state = state;
  }
  setIntegrity(integrity) {
    this.integrity = integrity;
  }
  setFrequency(frequency) {
    this.frequency = frequency;
  }
}
