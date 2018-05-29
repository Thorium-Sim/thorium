import uuid from "uuid";
import { System } from "./generic";

class Bunk {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.scanRequest = params.scanRequest || "";
    this.scanResults = params.scanResults || "";
    this.scanning = params.scanning || false;
  }
}

export default class Sickbay extends System {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Sickbay";
    this.simulatorId = params.simulatorId || null;
    this.roster = [];
    this.defaultBunks = params.defaultBunks || 3;
    this.bunks = [];
  }
}
