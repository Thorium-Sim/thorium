import uuid from 'uuid';

export default class Shield {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.type = params.type || null;
    this.position = params.position || null;
    this.frequency = params.frequency || false;
    this.state = params.state || false;
    this.integrity = params.integrity || false;
  }
}
