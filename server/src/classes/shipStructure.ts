import uuid from "uuid";
import Environment from "./environment";
export class Deck {
  id: string;
  class = "Deck";
  simulatorId: string;
  number: number;
  svgPath: string;
  doors: boolean;
  evac: boolean;
  actualEvac: boolean;
  hallway: string;
  environment: Environment;
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
    this.environment = new Environment(params.environment || {});
  }
  updateSvg(svg: string) {
    this.svgPath = svg;
  }
  setDoors(doors: boolean) {
    this.doors = doors;
  }
  setEvac(evac: boolean) {
    this.evac = evac;
    setTimeout(() => {
      this.actualEvac = evac;
    }, 5000);
  }
  updateHallwaySvg(hallway: string) {
    this.hallway = hallway;
  }
}

export class Room {
  class = "Room";
  id: string;
  simulatorId: string | null;
  deckId: string | null;
  name: string;
  gas: boolean;
  svgPath: string;
  metadata: Record<string, any>;
  roles: string[];
  constructor(params: Partial<Room>) {
    if (!params.deckId) throw new Error("deckId is required");
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
  class = "InventoryItem";
  id: string;
  simulatorId: string | null;
  name: string;
  roomCount: Record<string, number>;
  crewCount: Record<string, number>;
  metadata: Record<string, any>;
  constructor(params: Partial<InventoryItem>) {
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
  move(fromRoom: string, toRoom: string, count: number, toSimulator) {
    if (this.roomCount[fromRoom] >= count) {
      if (!this.roomCount[toRoom]) this.roomCount[toRoom] = 0;
      this.roomCount[fromRoom] -= count;
      this.roomCount[toRoom] += count;
    }
  }
  moveToCrew(fromRoom: string, toCrew: string, count: number) {
    if (!fromRoom) {
      this.crewCount[toCrew] = count;
    }
    if (this.roomCount[fromRoom] >= count) {
      if (!this.crewCount[toCrew]) this.crewCount[toCrew] = 0;
      this.roomCount[fromRoom] -= count;
      this.crewCount[toCrew] += count;
    }
  }
  moveFromCrew(fromCrew: string, toRoom: string, count: number) {
    if (this.crewCount[fromCrew] >= count) {
      if (!this.roomCount[toRoom]) this.roomCount[toRoom] = 0;
      this.crewCount[fromCrew] -= count;
      this.roomCount[toRoom] += count;
    }
  }
  updateCount(room: string, count: number) {
    this.roomCount[room] = Math.max(0, count);
  }
  updateMetadata(metadata: Record<string, any>) {
    this.metadata = metadata;
  }
}
