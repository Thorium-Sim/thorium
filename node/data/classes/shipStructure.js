import uuid from 'uuid';

export class Deck {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = 'Deck';
    this.simulatorId = params.simulatorId || null;
    this.number = params.number || 1;
    this.svgPath = params.svgPath || '';
    this.doors = params.doors || false;
    this.evac = params.evac || false;
    this.hallway = params.hallway || '';
  }
  updateSvg(svg) {
    this.svgPath = svg;
  }
  setDoors(doors) {
    this.doors = doors;
  }
  setEvac(evac) {
    this.evac = evac;
  }
  updateHallwaySvg(hallway) {
    this.hallway = hallway;
  }
}

export class Room {
  constructor(params) {
    if (!params.deck) return false;
    this.class = 'Room';
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.deck = params.deck;
    this.name = params.name || 'Vic\'s Lounge';
    this.svgPath = params.svgPath || '';
  }
  rename(name) {
    this.name = name;
  }
  updateSvg(svg) {
    this.svgPath = svg;
  }
}
