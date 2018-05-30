import uuid from "uuid";
import { System } from "./generic";
import Crew from "./crew";

class Bunk {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.scanRequest = params.scanRequest || "";
    this.scanResults = params.scanResults || "";
    this.scanning = params.scanning || false;
    this.patient = params.patient || null;
  }
  scan(request) {
    this.scanRequest = request;
    this.scanning = false;
  }
  cancelScan() {
    this.scanning = false;
  }
  scanResponse(response) {
    this.scanning = false;
    this.scanResults = response;
  }
  assign(crewId) {
    this.patient = crewId;
  }
  discharge() {
    this.patient = null;
  }
}

export default class Sickbay extends System {
  constructor(params) {
    super(params);
    this.id = params.id || uuid.v4();
    this.class = "Sickbay";
    this.simulatorId = params.simulatorId || null;
    this.sickbayRoster = [];
    (params.sickbayRoster || []).forEach(r =>
      this.sickbayRoster.push(new Crew(r))
    );
    this.bunks = [];
    (params.bunks || []).forEach(b => this.bunks.push(new Bunk(b)));
  }
  addRoster(crew) {
    this.sickbayRoster.push(new Crew(crew));
  }
  updateRoster(id, crew) {
    const crewObj = this.sickbayRoster.find(s => s.id === id);
    crewObj && crewObj.update(crew);
  }
  removeRoster(id) {
    this.sickbayRoster.filter(s => s.id !== id);
  }
  setBunkCount(count) {
    if (this.bunks.length === count) return;
    if (this.bunks.length > count) {
      this.bunks = this.bunks.filter((b, i) => i <= count);
    }
    if (this.bunks.length < count) {
      for (let i = 0; i < count - this.bunks.length; i++) {
        this.bunks.push(new Bunk({}));
      }
    }
  }
  assignBunk(id, crewId) {
    const bunk = this.bunks.find(b => b.id === id);
    bunk && bunk.assign(crewId);
  }
  dischargeBunk(id) {
    const bunk = this.bunks.find(b => b.id === id);
    bunk && bunk.discharge();
  }
  scanBunk(id, request) {
    const bunk = this.bunks.find(b => b.id === id);
    bunk && bunk.scan(request);
  }
  cancelBunkScan(id) {
    const bunk = this.bunks.find(b => b.id === id);
    bunk && bunk.cancelScan();
  }
  bunkScanResponse(id, response) {
    const bunk = this.bunks.find(b => b.id === id);
    bunk && bunk.scanResponse(response);
  }
}
