import uuid from 'uuid';

export default class Sensors {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.type = 'Sensors';
    this.class = 'Sensors';
    this.scanResults = '';
    this.scanRequest = '';
    this.processedData = '';
  }

}
