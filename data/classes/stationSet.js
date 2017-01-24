import uuid from 'uuid';

export class StationSet {
  constructor(params) {
    this.class = 'StationSet';
    this.id = params.id || uuid.v4();
    this.name = params.name || 'StationSet';
    this.stations = [];
    params.stations.forEach((station) => {
      this.addStation(station);
    });
  }
  addStation(station) {
    this.stations.push(new Station(station));
  }
  removeStation(stationName) {
    this.stations = this.stations.filter(s => s.name !== stationName);
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
