import uuid from 'uuid';

export default class Client {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.flightId = params.flightId || null;
    this.simulatorId = params.simulatorId || null;
    this.station = params.station || null;
    this.loginName = params.loginName || null;
    this.loginState = params.loginState || 'logout';
    this.sentPing = null;
    this.ping = null;
    this.connected = params.connected || false;
    this.class = 'Client';
  }
  connect() {
    this.connected = true;
  }
  disconnect() {
    this.connected = false;
  }
  setPing(ping) {
    this.sentPing = ping;
  }
}
