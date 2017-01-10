import uuid from 'uuid';
import { System } from './generic';

export default class Shield extends System {
  constructor(params) {
    super(params);
    this.class = 'Shield';
    this.type = 'Shield';
    this.position = params.position || null;
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
