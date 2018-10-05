import uuid from "uuid";
import App from "../app";

class Keypad {
  constructor(params = {}, clientId) {
    this.id = clientId;
    this.code =
      params.code ||
      Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10));
    this.enteredCode = params.enteredCode || [];
    this.codeLength = params.codeLength || 4;
    this.giveHints = params.giveHints || true;
    this.allowedAttempts = params.allowedAttempts || 0; // Default - infinte
    this.attempts = params.attempts || 0;
    this.locked = params.locked || false;
  }
  setCode(code) {
    if (code && code.length > 0) {
      const codeArr = code.slice(0, 8);
      this.code = codeArr;
    } else {
      this.code = Array(this.codeLength)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10));
    }
  }
  setEnteredCode(code) {
    this.attempts += 1;
    if (this.attempts <= this.allowedAttempts || this.allowedAttempts === 0) {
      this.enteredCode = code || [];
    } else {
      this.locked = true;
    }
  }
  reset() {
    this.enteredCode = [];
    this.attempts = 0;
    this.locked = false;
  }
  setHint(hint) {
    this.giveHints = hint;
  }
  setCodeLength(length) {
    this.codeLength = Math.min(8, Math.max(1, length));
  }
  setAllowedAttempts(a) {
    this.allowedAttempts = Math.max(0, a);
  }
  setLocked(locked) {
    this.locked = locked;
  }
}

export default class Client {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.class = "Client";
    this.flightId = params.flightId || null;
    this.simulatorId = params.simulatorId || null;
    this.station = params.station || null;
    this.loginName = params.loginName || null;
    this.loginState = params.loginState || "logout";
    this.sentPing = null;
    this.ping = null;
    this.connected = params.connected || false;
    this.offlineState = params.offlineState || null;
    this.movie = params.move || null;
    this.hypercard = params.hypercard || null;
    this.training = params.training || false;
    this.overlay = params.overlay || false;
    this.caches = params.caches || [];

    // For the mobile app
    this.mobile = params.mobile || false;
    this.cards = params.cards || [];

    // Keypad
    this.keypad = new Keypad(params.keypad, this.id);
  }
  connect({ mobile, cards }) {
    this.connected = true;
    this.mobile = mobile;
    this.cards = cards || [];
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
    this.simulatorId = null;
    this.station = null;
    this.hypercard = null;
    if (flight && flight.simulators.length === 1) {
      this.simulatorId = flight.simulators[0];
    }
  }
  setSimulator(simulatorId) {
    this.simulatorId = simulatorId;
    this.station = null;
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
  setHypercard(card) {
    if (!card) {
      this.hypercard = null;
      return;
    }
    this.hypercard = card;
  }
  setMovie(movie) {
    this.movie = movie;
    this.offlineState = "movie";
  }
  setOfflineState(state) {
    // Clear the movie
    this.movie = null;
    // Allow one of null, 'blackout', 'offline', 'power', 'lockdown', 'maintenance'
    this.offlineState = state;
  }
  addCache(cacheItem) {
    const container = App.assetContainers.find(a => a.fullPath === cacheItem);
    if (!container) return;
    const object =
      App.assetObjects.find(
        obj =>
          obj.containerId === container.id &&
          obj.simulatorId === this.simulatorId
      ) ||
      App.assetObjects.find(
        obj => obj.containerId === container.id && obj.simulatorId === "default"
      );
    if (this.caches.indexOf(object.url) === -1) {
      this.caches.unshift(object.url);
      this.caches.splice(5);
    }
  }
  removeCache(cacheItem) {
    this.caches = this.caches.filter(c => c !== cacheItem);
  }
  setOverlay(overlay) {
    this.overlay = overlay;
  }
  diagnostic() {}
  reset() {}
  lockScreen() {}
  unlockScreen() {}
}
