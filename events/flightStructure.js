import App from '../app.js';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../data/classes';

App.on('createdMission', ({ name }) => {

});
App.on('removedMission', ({ missionId }) => {

});
App.on('editedMission', ({ missionId, name, description, simulators }) => {

});
App.on('startedFlight', ({ missionID, stationSets }) => {

});
App.on('createdTemplateSimulator', ({ name }) => {

});
App.on('addedTimelineStepToSimulator', ({ simulatorId, name, description }) => {

});
App.on('addedTimelineItemToTimelineStep', ({ simulatorId, timelineStepID, timelineItem }) => {

});
App.on('removedTemplateSimulator', ({ simulatorId }) => {

});
App.on('createdStationSet', ({ name }) => {
  const station = new Classes.StationSet({ name });
  App.stationSets.push(station);
  pubsub.publish('stationSetUpdate', App.stationSets);
});
App.on('removedStationSet', ({ stationSetID }) => {
  App.stationSets = App.stationSets.filter(s => s.id !== stationSetID);
  pubsub.publish('stationSetUpdate', App.stationSets);
});
App.on('addedStationToStationSet', ({ stationSetID, stationName }) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  stationSet.addStation({ name: stationName });
  console.log(App.stationSets);
  pubsub.publish('stationSetUpdate', App.stationSets);
});
App.on('removedStationFromStationSet', ({ stationSetID, stationName }) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  stationSet.removeStation(stationName);
  pubsub.publish('stationSetUpdate', App.stationSets);
});
App.on('editedStationInStationSet', ({ stationSetID, stationName, newStationName }) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  stationSet.renameStation(stationName, newStationName);
  pubsub.publish('stationSetUpdate', App.stationSets);
});
App.on('addedCardToStation', ({ stationSetID, stationName, cardName, cardComponent, cardIcon }) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  stationSet.addStationCard(stationName, { name: cardName, icon: cardIcon, component: cardComponent });
  pubsub.publish('stationSetUpdate', App.stationSets);
});
App.on('removedCardFromStation', ({ stationSetID, stationName, cardName }) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  stationSet.removeStationCard(stationName, cardName);
  pubsub.publish('stationSetUpdate', App.stationSets);
});
App.on('editedCardInStationSet', ({ stationSetID, stationName, cardName, newCardName, cardComponent, cardIcon }) => {

});
App.on('addedSystem', ({}) => {

});
