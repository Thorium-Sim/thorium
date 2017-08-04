// @flow
import uuid from "uuid";

// TODO: Add the ability to sort clients into groups

export default class Client {
  id: string;
  flightId: ?string;
  simulatorId: ?string;
  station: ?string;
  loginName: ?string;
  loginState: string;
  sentPing: ?boolean;
  ping: ?string;
  connected: ?boolean;
  offlineState: ?string;
  class: string;
  constructor(params: {
    id: ?string,
    flightId: ?string,
    simulatorId: ?string,
    station: ?string,
    loginName: ?string,
    loginState: ?string,
    sentPing: ?boolean,
    ping: ?string,
    connected: ?boolean,
    offlineState: ?string
  }) {
    params = params || {};
    this.id = params.id || uuid.v4();
    this.flightId = params.flightId || null;
    this.simulatorId = params.simulatorId || null;
    this.station = params.station || null;
    this.loginName = params.loginName || null;
    this.loginState = params.loginState || "logout";
    this.sentPing = null;
    this.ping = null;
    this.connected = params.connected || false;
    this.offlineState = params.offlineState || null;
    this.class = "Client";
  }
  connect() {
    this.connected = true;
  }
  disconnect() {
    this.connected = false;
  }
  setPing(ping: boolean) {
    this.sentPing = ping;
  }
  setFlight(flightId: string) {
    this.flightId = flightId;
  }
  setSimulator(simulatorId: string) {
    this.simulatorId = simulatorId;
  }
  setStation(station: string) {
    this.station = station;
  }
  login(name: string) {
    this.loginName = name;
    this.loginState = "login";
  }
  logout() {
    this.loginName = null;
    this.loginState = "logout";
  }
  setOfflineState(state: string) {
    // Allow one of null, 'blackout', 'offline', 'power', 'lockdown', and 'maintenance'
    this.offlineState = state;
  }
  diagnostic() {}
  reset() {}
  lockScreen() {}
  unlockScreen() {}
}
