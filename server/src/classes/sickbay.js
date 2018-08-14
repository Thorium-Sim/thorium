import uuid from "uuid";
import { System } from "./generic";
import Crew from "./crew";

class Bunk {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.sickbayId = params.sickbayId;
    this.scanRequest = params.scanRequest || "";
    this.scanResults = params.scanResults || "";
    this.scanning = params.scanning || false;
    this.patient = params.patient || null;
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
    this.name = params.name || "Sickbay";
    this.type = "Sickbay";
    this.displayName = params.displayName || "Sickbay";
    this.deconProgram = params.deconProgram || null;
    this.deconLocation = params.deconLocation || null;
    this.deconActive = params.deconActive || false;
    this.deconOffset = params.deconOffset || 0;
    this.autoFinishDecon = params.autoFinishDecon || false;

    this.sickbayRoster = [];
    (params.sickbayRoster || []).forEach(r =>
      this.sickbayRoster.push(new Crew(r))
    );
    this.bunks = [];
    (params.bunks || []).forEach(b =>
      this.bunks.push(new Bunk({ ...b, sickbayId: this.id }))
    );
  }
  startDeconProgram(program, location) {
    this.deconActive = true;
    this.deconProgram = program;
    this.deconLocation = location;
  }
  updateDeconOffset(offset) {
    this.deconOffset = offset;
  }
  endDeconProgram() {
    this.deconActive = false;
    this.deconProgram = null;
    this.deconLocation = null;
    this.deconOffset = 0;
  }
  setDeconAutoFinish(tf) {
    this.autoFinishDecon = tf;
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
      this.bunks = this.bunks.filter((b, i) => i <= count - 1);
    }
    const length = this.bunks.length;
    if (length < count) {
      for (let i = 0; i < count - length; i++) {
        this.bunks.push(new Bunk({ sickbayId: this.id }));
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
