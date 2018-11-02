import uuid from "uuid";

export class Deck {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Deck";
    this.simulatorId = params.simulatorId || null;
    this.number = params.number || 1;
    this.svgPath = params.svgPath || "";
    this.doors = params.doors || false;
    this.evac = params.evac || false;

    // There needs to be a delay before
    // crew start evacuating. That's what
    // this value is
    this.actualEvac = params.actualEvac || false;

    this.hallway = params.hallway || "";
  }
  updateSvg(svg) {
    this.svgPath = svg;
  }
  setDoors(doors) {
    this.doors = doors;
  }
  setEvac(evac) {
    this.evac = evac;
    setTimeout(() => {
      this.actualEvac = evac;
    }, 5000);
  }
  updateHallwaySvg(hallway) {
    this.hallway = hallway;
  }
}

export class Room {
  constructor(params) {
    if (!params.deckId) return false;
    this.class = "Room";
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.deckId = params.deckId;
    this.name = params.name || "Vic's Lounge";
    this.gas = params.gas || false;
    this.svgPath = params.svgPath || "";
    this.metadata = params.metadata || {};
    this.roles = params.roles || [];
  }
  setGas(gas) {
    this.gas = gas;
  }
  rename(name) {
    this.name = name;
  }
  updateSvg(svg) {
    this.svgPath = svg;
  }
  updateMetadata(metadata) {
    this.metadata = metadata;
  }
  updateRoles(roles) {
    this.roles = roles;
  }
  setDeck(deckId) {
    this.deckId = deckId;
  }
}

export class InventoryItem {
  constructor(params) {
    this.class = "InventoryItem";
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || "Generic Cargo";
    this.roomCount = {};
    this.crewCount = {};
    if (Array.isArray(params.roomCount)) {
      params.roomCount.forEach(r => {
        this.roomCount[r.room] = r.count;
      });
    } else {
      this.roomCount = params.roomCount || {};
    }
    if (Array.isArray(params.crewCount)) {
      params.crewCount.forEach(r => {
        this.crewCount[r.crew] = r.count;
      });
    } else {
      this.crewCount = params.crewCount || {};
    }
    this.metadata = params.metadata || {};
  }
  move(fromRoom, toRoom, count, toSimulator) {
    if (this.roomCount[fromRoom] >= count) {
      if (!this.roomCount[toRoom]) this.roomCount[toRoom] = 0;
      this.roomCount[fromRoom] -= count;
      this.roomCount[toRoom] += count;
    }
  }
  moveToCrew(fromRoom, toCrew, count) {
    if (!fromRoom) {
      this.crewCount[toCrew] = count;
    }
    if (this.roomCount[fromRoom] >= count) {
      if (!this.crewCount[toCrew]) this.crewCount[toCrew] = 0;
      this.roomCount[fromRoom] -= count;
      this.crewCount[toCrew] += count;
    }
  }
  moveFromCrew(fromCrew, toRoom, count) {
    if (this.crewCount[fromCrew] >= count) {
      if (!this.roomCount[toRoom]) this.roomCount[toRoom] = 0;
      this.crewCount[fromCrew] -= count;
      this.roomCount[toRoom] += count;
    }
  }
  updateCount(room, count) {
    this.roomCount[room] = Math.max(0, count);
  }
  updateMetadata(metadata) {
    this.metadata = metadata;
  }
}
