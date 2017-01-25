import uuid from 'uuid';

export class StationSet {
  constructor({ id, name, stations = [] }) {
    this.class = 'StationSet';
    this.id = id || uuid.v4();
    this.name = name || 'StationSet';
    this.stations = [];
    stations.forEach((station) => {
      this.addStation(station);
    });
  }
  addStation(station) {
    this.stations.push(new Station(station));
  }
  removeStation(stationName) {
    this.stations = this.stations.filter(s => s.name !== stationName);
  }
  renameStation(station, newName) {
    const renameStation = this.stations.find(s => s.name === station);
    renameStation.rename(newName);
  }
  addStationCard(station, card) {
    const cardStation = this.stations.find(s => s.name === station);
    cardStation.addCard(card);
  }
  removeStationCard(station, cardName) {
    const cardStation = this.stations.find(s => s.name === station);
    cardStation.removeCard(cardName);
  }
}

export class Station {
  constructor(params) {
    this.class = 'Station';
    this.name = params.name || 'Station';
    this.cards = [];
    params.cards.forEach((card) => {
      this.addCard(card);
    });
    this.cards = params.cards || [];
  }
  rename(name) {
    this.name = name;
  }
  addCard(card) {
    this.cards.push(new Card(card));
  }
  removeCard(cardName) {
    this.cards = this.cards.filter(c => c.name !== cardName);
  }
}

export class Card {
  constructor(params) {
    this.name = params.name || 'Card';
    this.icon = params.icon || null;
    this.component = params.component || 'Login';
    this.class = 'Card';
  }
}
