import uuid from "uuid";

export class StationSet {
  id: string;
  class: string;
  name: string;
  simulatorId: string;
  crewCount: number;
  stations: Station[];
  constructor({id, name, simulatorId, crewCount, stations = []}: StationSet) {
    this.class = "StationSet";
    this.id = id || uuid.v4();
    this.simulatorId = simulatorId || null;
    this.name = name || "StationSet";
    this.crewCount = crewCount || 14;
    this.stations = [];
    stations.forEach(station => {
      this.addStation(station);
    });
  }
  rename(name: string) {
    this.name = name;
  }
  addStation(station: Station) {
    this.stations.push(new Station(station));
  }
  removeStation(stationName: string) {
    this.stations = this.stations.filter(s => s.name !== stationName);
  }
  renameStation(station: string, newName: string) {
    const renameStation = this.stations.find(s => s.name === station);
    renameStation.rename(newName);
  }
  setCrewCount(crewCount: string) {
    const count = parseInt(crewCount, 10) || 14;
    this.crewCount = count;
  }
  addStationCard(station: string, card: Card) {
    const cardStation = this.stations.find(s => s.name === station);
    cardStation.addCard(card);
  }
  removeStationCard(station: string, cardName: string) {
    const cardStation = this.stations.find(s => s.name === station);
    cardStation.removeCard(cardName);
  }
  editStationCard(station: string, cardName: string, cardUpdate: Card) {
    const cardStation = this.stations.find(s => s.name === station);
    cardStation.updateCard(cardName, cardUpdate);
  }
  setStationMessageGroup(station: string, group: string, state: boolean) {
    this.stations.find(s => s.name === station).setMessageGroup(group, state);
  }
  setStationLogin(station: string, login: boolean) {
    this.stations.find(s => s.name === station).setLogin(login);
  }
  setStationExecutive(station: string, exec: boolean) {
    this.stations.find(s => s.name === station).setExec(exec);
  }
  setStationWidget(station: string, widget: string, state: boolean) {
    this.stations.find(s => s.name === station).setWidgets(widget, state);
  }
  setStationLayout(station: string, layout: string) {
    this.stations.find(s => s.name === station).setLayout(layout);
  }
  setDescription(station: string, description: string) {
    this.stations.find(s => s.name === station).setDescription(description);
  }
  setTraining(station: string, training: string) {
    this.stations.find(s => s.name === station).setTraining(training);
  }
  setAmbiance(station: string, ambiance: string) {
    this.stations.find(s => s.name === station).setAmbiance(ambiance);
  }
  reorderWidgets(station: string, widget: string, order: number) {
    this.stations.find(s => s.name === station).reorderWidgets(widget, order);
  }
}

export class Station {
  name: string;
  class: string;
  cards: Card[];
  login: boolean;
  executive: boolean;
  messageGroups: string[];
  widgets: string[];
  description: string;
  training: string;
  ambiance: string;
  layout: string;
  constructor({
    name,
    cards = [],
    login = false,
    executive = false,
    messageGroups = [],
    widgets = [],
    description,
    training,
    ambiance,
    layout,
  }: Station) {
    this.class = "Station";
    this.name = name || "Station";
    this.description = description || "";
    this.training = training || "";
    this.ambiance = ambiance || "";
    this.login = login;
    this.executive = executive;
    this.messageGroups = messageGroups;
    this.widgets = widgets;
    this.layout = layout || null;
    this.cards = [];
    cards.forEach(card => {
      this.addCard(card);
    });
  }
  rename(name: string) {
    this.name = name;
  }
  setDescription(description: string) {
    this.description = description;
  }
  setTraining(training: string) {
    this.training = training;
  }
  setAmbiance(ambiance: string) {
    this.ambiance = ambiance;
  }
  addCard(card: Card) {
    this.cards.push(new Card(card));
  }
  removeCard(cardName: string) {
    this.cards = this.cards.filter((c: Card) => c.name !== cardName);
  }
  updateCard(cardName: string, cardUpdate: Card) {
    const card = this.cards.find((c: Card) => c.name === cardName);
    card.update(cardUpdate);
  }
  setMessageGroup(group: string, state: boolean) {
    if (state) {
      this.messageGroups = this.messageGroups
        .concat(group)
        .filter((g, i, arr) => arr.indexOf(g) === i);
    } else {
      this.messageGroups = this.messageGroups.filter(g => g !== group);
    }
  }
  setWidgets(widget: string, state: boolean) {
    if (state) {
      this.widgets = this.widgets
        .concat(widget)
        .filter((g, i, arr) => arr.indexOf(g) === i);
    } else {
      this.widgets = this.widgets.filter(w => w !== widget);
    }
  }
  setLogin(login: boolean) {
    this.login = login;
  }
  setLayout(layout: string) {
    this.layout = layout;
  }
  setExec(exec: boolean) {
    this.executive = exec;
  }
  reorderWidgets(widget: string, order: number) {
    function move(array: string[], old_index: number, new_index: number) {
      if (new_index >= array.length) {
        var k = new_index - array.length;
        while (k-- + 1) {
          array.push(undefined);
        }
      }
      array.splice(new_index, 0, array.splice(old_index, 1)[0]);
      return array; // for testing purposes
    }
    this.widgets = move(this.widgets, this.widgets.indexOf(widget), order);
  }
}

export class Card {
  name: string;
  icon: string | null;
  component: string;
  class: string;
  hidden: boolean;
  constructor(params: Card) {
    this.name = params.name || "Card";
    this.icon = params.icon || null;
    this.component = params.component || "Login";
    this.class = "Card";
    this.hidden = false;
  }
  update({name, icon, component}: Card) {
    if (name) this.name = name;
    if (icon) this.icon = icon;
    if (component) this.component = component;
  }
  hide() {
    this.hidden = true;
  }
  unhide() {
    this.hidden = false;
  }
}
