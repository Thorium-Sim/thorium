import uuid from "uuid";
import App from "../app";

class Keypad {
  constructor(params = {}, clientId, label) {
    this.id = clientId;
    this.label = label;
    this.enteredCode = params.enteredCode || [];
    this.giveHints = params.giveHints || true;
    this.allowedAttempts = params.allowedAttempts || 0; // Default - infinte
    this.attempts = params.attempts || 0;
    this.locked = params.locked || false;

    if (params.codeLength) {
      this.setCodeLength(params.codeLength);
    } else {
      this.codeLength = 4;
    }

    this.setCode(params.code);
    // code.length will override codeLength if both are present
    this.codeLength = this.code.length;
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
    this.codeLength = this.code.length;
  }
  setEnteredCode(code) {
    this.attempts += 1;
    this.enteredCode = code || [];
    if (this.attempts >= this.allowedAttempts && this.allowedAttempts !== 0) {
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

class Scanner {
  constructor(params = {}, clientId, label) {
    this.id = clientId;
    this.label = label;
    this.scanRequest = params.scanRequest || "";
    this.scanResults = params.scanResults || "";
    this.scanning = params.scanning || false;
  }
  scan(request) {
    this.scanRequest = request;
    this.scanning = true;
  }
  cancelScan() {
    this.scanning = false;
  }
  scanResponse(response) {
    this.scanning = false;
    this.scanResults = response;
  }
}

export default class Client {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.clientLabel = params.label || "";
    this.class = "Client";
    this.flightId = params.flightId || null;
    this.simulatorId = params.simulatorId || null;
    this.station = params.station || null;
    this.loginName = params.loginName || null;
    this.loginState = params.loginState || "logout";
    // If we're logged in with Space EdVentures, don't logout on reset.
    this.isSpaceEdventures = params.isSpaceEdventures || false;
    this.connected = params.connected || false;
    this.offlineState = params.offlineState || null;
    this.movie = params.movie || null;
    this.hypercard = params.hypercard || null;
    this.training = params.training || false;
    this.overlay = params.overlay || false;
    this.soundPlayer = params.soundPlayer || false;
    this.caches = params.caches || [];
    this.cracked = params.cracked || false;
    // For the mobile app
    this.mobile = params.mobile || false;
    this.cards = params.cards || [];

    // Keypad
    this.keypad = new Keypad(params.keypad, this.id, this.label);
    this.scanner = new Scanner(params.scanner, this.id, this.label);
  }
  get label() {
    return this.clientLabel || this.id;
  }
  set label(l) {
    this.clientLabel = l;
  }
  connect({ mobile, cards }) {
    this.connected = true;
    this.mobile = mobile;
    this.cards = cards || [];
  }
  disconnect() {
    this.connected = false;
  }

  setFlight(flightId) {
    this.flightId = flightId;
    const flight = App.flights.find(f => f.id === flightId);
    this.simulatorId = null;
    this.station = null;
    this.hypercard = null;
    this.logout();
    if (flight && flight.simulators.length === 1) {
      this.simulatorId = flight.simulators[0];
    }
  }
  setSimulator(simulatorId) {
    this.simulatorId = simulatorId;
    this.station = null;
    this.logout();
  }
  setStation(station) {
    this.station = station;
  }
  login(name, isSpaceEdventures) {
    this.loginName = name;
    this.loginState = "login";
    this.isSpaceEdventures = isSpaceEdventures;
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
    // Clear the hypercard
    this.hypercard = null;
    // Allow one of null, 'blackout', 'offline', 'power', 'lockdown', 'maintenance', 'spaceEdventuresToken
    this.offlineState = state;
  }
  setSoundPlayer(tf) {
    this.soundPlayer = tf;
  }
  addCache(cacheItem) {
    const url = `/assets${cacheItem}`;
    if (this.caches.indexOf(url) === -1) {
      this.caches.unshift(url);
      this.caches.splice(5);
    }
  }
  removeCache(cacheItem) {
    this.caches = this.caches.filter(c => c !== cacheItem);
  }
  setOverlay(overlay) {
    this.overlay = overlay;
  }
  reset(hardReset) {
    this.setTraining(false);
    if (!this.isSpaceEdventures) {
      this.logout();
    }
    this.setOfflineState(null);
    this.setHypercard(null);
    if (hardReset) {
      this.isSpaceEdventures = false;
      this.logout();
      this.setFlight(null);
      this.setSoundPlayer(false);
    }
  }
  crack() {
    this.cracked = true;
  }
  uncrack() {
    this.cracked = false;
  }
  diagnostic() {}
  lockScreen() {}
  unlockScreen() {}
}
