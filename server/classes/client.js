import uuid from "uuid";
import App from "../../app";
// TODO: Add the ability to sort clients into groups

export default class Client {
  constructor(params) {
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
    this.training = params.training || false;
    this.caches = params.caches || [];
    this.class = "Client";
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
  setFlight(flightId) {
    this.flightId = flightId;
    const flight = App.flights.find(f => f.id === flightId);
    if (flight && flight.simulators.length === 1) {
      this.simulatorId = flight.simulators[0];
    }
    if (!this.flightId) {
      this.simulatorId = null;
      this.station = null;
    }
  }
  setSimulator(simulatorId) {
    this.simulatorId = simulatorId;
    if (!this.simulatorId) {
      this.station = null;
    }
  }
  setStation(station) {
    this.station = station;
  }
  login(name) {
    this.loginName = name;
    this.loginState = "login";
  }
  logout() {
    this.loginName = null;
    this.loginState = "logout";
  }
  setTraining(training) {
    this.training = training;
  }
  setOfflineState(state) {
    // Allow one of null, 'blackout', 'offline', 'power', 'lockdown', and 'maintenance'
    this.offlineState = state;
  }
  addCache(cacheItem) {
    this.caches.unshift(cacheItem);
    this.caches.splice(5);
  }
  removeCache(cacheItem) {
    this.caches = this.caches.filter(c => c !== cacheItem);
  }
  diagnostic() {}
  reset() {}
  lockScreen() {}
  unlockScreen() {}
}
