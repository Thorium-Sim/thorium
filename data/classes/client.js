import uuid from 'uuid';

export default class Client {
  constructor(params) {
    console.log('Params', params);
    this.id = params.id || uuid.v4();
    this.flightId = params.flightId || null;
    this.simulatorId = params.simulatorId || null;
    this.station = params.station || null;
    this.loginName = params.loginName || null;
    this.loginState = params.loginState || false;
  }
}
