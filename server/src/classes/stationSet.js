import uuid from "uuid";

export class StationSet {
  constructor({ id, name, simulatorId, stations = [] }) {
    this.class = "StationSet";
    this.id = id || uuid.v4();
    this.simulatorId = simulatorId || null;
    this.name = name || "StationSet";
    this.stations = [];
    stations.forEach(station => {
      this.addStation(station);
    });
  }
  rename(name) {
    this.name = name;
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
  editStationCard(station, cardName, cardUpdate) {
    const cardStation = this.stations.find(s => s.name === station);
    cardStation.updateCard(cardName, cardUpdate);
  }
  setStationMessageGroup(station, group, state) {
    this.stations.find(s => s.name === station).setMessageGroup(group, state);
  }
  setStationLogin(station, login) {
    this.stations.find(s => s.name === station).setLogin(login);
  }
  setStationExecutive(station, exec) {
    this.stations.find(s => s.name === station).setExec(exec);
  }
  setStationWidget(station, widget, state) {
    this.stations.find(s => s.name === station).setWidgets(widget, state);
  }
  setDescription(station, description) {
    this.stations.find(s => s.name === station).setDescription(description);
  }
  setTraining(station, training) {
    this.stations.find(s => s.name === station).setTraining(training);
  }
}

export class Station {
  constructor({
    name,
    cards = [],
    login = false,
    executive = false,
    messageGroups = [],
    widgets = [],
    description,
    training
  }) {
    this.class = "Station";
    this.name = name || "Station";
    this.description = description || "";
    this.training = training || "";
    this.login = login;
    this.executive = executive;
    this.messageGroups = messageGroups;
    this.widgets = widgets;
    this.cards = [];
    cards.forEach(card => {
      this.addCard(card);
    });
  }
  rename(name) {
    this.name = name;
  }
  setDescription(description) {
    this.description = description;
  }
  setTraining(training) {
    this.training = training;
  }
  addCard(card) {
    this.cards.push(new Card(card));
  }
  removeCard(cardName) {
    this.cards = this.cards.filter(c => c.name !== cardName);
  }
  updateCard(cardName, cardUpdate) {
    const card = this.cards.find(c => c.name === cardName);
    card.update(cardUpdate);
  }
  setMessageGroup(group, state) {
    if (state) {
      this.messageGroups = this.messageGroups
        .concat(group)
        .filter((g, i, arr) => arr.indexOf(g) === i);
    } else {
      this.messageGroups = this.messageGroups.filter(g => g !== group);
    }
  }
  setWidgets(widget, state) {
    if (state) {
      this.widgets = this.widgets
        .concat(widget)
        .filter((g, i, arr) => arr.indexOf(g) === i);
    } else {
      this.widgets = this.widgets.filter(w => w !== widget);
    }
  }
  setLogin(login) {
    this.login = login;
  }
  setExec(exec) {
    this.executive = exec;
  }
}

export class Card {
  constructor(params) {
    this.name = params.name || "Card";
    this.icon = params.icon || null;
    this.component = params.component || "Login";
    this.class = "Card";
  }
  update({ name, icon, component }) {
    if (name) this.name = name;
    if (icon) this.icon = icon;
    if (component) this.component = component;
  }
}
