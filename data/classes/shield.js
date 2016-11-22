import uuid from 'uuid';

export default class Shield {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
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
