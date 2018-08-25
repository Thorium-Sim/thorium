import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

// StationSet
App.on("createStationSet", ({ id, name, simulatorId }) => {
  const station = new Classes.StationSet({ id, name, simulatorId });
  App.stationSets.push(station);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("removeStationSet", ({ stationSetID }) => {
  App.stationSets = App.stationSets.filter(s => s.id !== stationSetID);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("renameStationSet", ({ stationSetID, name }) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  stationSet.rename(name);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("addStationToStationSet", ({ stationSetID, stationName }) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  stationSet.addStation({ name: stationName });
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("removeStationFromStationSet", ({ stationSetID, stationName }) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  stationSet.removeStation(stationName);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on(
  "editStationInStationSet",
  ({ stationSetID, stationName, newStationName }) => {
    const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
    stationSet.renameStation(stationName, newStationName);
    pubsub.publish("stationSetUpdate", App.stationSets);
  }
);
App.on(
  "addCardToStation",
  ({ stationSetID, stationName, cardName, cardComponent, cardIcon }) => {
    const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
    stationSet.addStationCard(stationName, {
      name: cardName,
      icon: cardIcon,
      component: cardComponent
    });
    pubsub.publish("stationSetUpdate", App.stationSets);
  }
);
App.on("removeCardFromStation", ({ stationSetID, stationName, cardName }) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  stationSet.removeStationCard(stationName, cardName);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on(
  "editCardInStationSet",
  ({
    stationSetID,
    stationName,
    cardName,
    newCardName,
    cardComponent,
    cardIcon
  }) => {
    const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
    stationSet.editStationCard(stationName, cardName, {
      name: newCardName,
      component: cardComponent,
      icon: cardIcon
    });
    pubsub.publish("stationSetUpdate", App.stationSets);
  }
);
App.on("setStationLogin", ({ stationSetID, stationName, login }) => {
  App.stationSets
    .find(s => s.id === stationSetID)
    .setStationLogin(stationName, login);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("setStationExecutive", ({ stationSetID, stationName, exec }) => {
  App.stationSets
    .find(s => s.id === stationSetID)
    .setStationExecutive(stationName, exec);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on(
  "toggleStationWidgets",
  ({ stationSetID, stationName, widget, state }) => {
    App.stationSets
      .find(s => s.id === stationSetID)
      .setStationWidget(stationName, widget, state);
    pubsub.publish("stationSetUpdate", App.stationSets);
  }
);
