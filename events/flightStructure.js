import App from '../app.js';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../data/classes';

function getTimelineObject(simulatorId, missionId) {
  let object;
  if (simulatorId) object = App.simulators.find(s => s.id === simulatorId);
  if (missionId) object = App.missions.find(m => m.id === missionId);
  return object;
}
// Mission
App.on('createdMission', ({ name }) => {
  const mission = new Classes.Mission({ name });
  App.missions.push(mission);
  pubsub.publish('missionsUpdate', App.missions);
});
App.on('removedMission', ({ missionId }) => {
  App.missions = App.missions.filter(m => m.id !== missionId);
  pubsub.publish('missionsUpdate', App.missions);
});
App.on('editedMission', ({ missionId, name, description, simulators }) => {
  const mission = App.missions.find(m => m.id === missionId);
  mission.update({ name, description, simulators });
  pubsub.publish('missionsUpdate', App.missions);
});
App.on('addedSimulatorToMission', ({ missionId, simulatorName }) => {
  const mission = App.missions.find(m => m.id === missionId);
  const simulator = new Classes.Simulator({ name: `${mission.name} : ${simulatorName}` });
  mission.addSimulator(simulator.id);
  App.simulators.push(simulator);
  pubsub.publish('missionsUpdate', App.missions);
});
App.on('removedSimulatorToMission', ({ missionId, simulatorId }) => {
  const mission = App.missions.find(m => m.id === missionId);
  mission.removeSimulator(simulatorId);
  App.simulators = App.simulators.filter(s => s.id !== simulatorId);
  pubsub.publish('missionsUpdate', App.missions);
});


// Flight
App.on('startedFlight', ({ missionID, stationSets, templateSimulators }) => {

});


// Simulator
App.on('createdSimulator', ({ name }) => {

});
App.on('removedSimulator', ({ simulatorId }) => {

});


// Timeline
App.on('addedTimelineStep', ({ simulatorId, missionId, name, description }) => {
  const object = getTimelineObject(simulatorId, missionId);
  object.addTimelineStep({ name, description });
  pubsub.publish('missionsUpdate', App.missions);
});
App.on('removedTimelineStep', ({ simulatorId, missionId, timelineStepId }) => {
  const object = getTimelineObject(simulatorId, missionId);
  object.removeTimelineStep(timelineStepId);
  pubsub.publish('missionsUpdate', App.missions);
});
App.on('reorderedTimelineStep', ({ simulatorId, missionId, timelineStepId, order }) => {
 const object = getTimelineObject(simulatorId, missionId);
 object.reorderTimelineStep(timelineStepId, order);
 pubsub.publish('missionsUpdate', App.missions);
});
App.on('updatedTimelineStep', ({ simulatorId, missionId, timelineStepId, name, description }) => {
  const object = getTimelineObject(simulatorId, missionId);
  object.updateTimelineStep(timelineStepId, { name, description });
  pubsub.publish('missionsUpdate', App.missions);
});
App.on('addedTimelineItemToTimelineStep', ({ simulatorId, missionId, timelineStepId, timelineItem }) => {
  const object = getTimelineObject(simulatorId, missionId);
  object.addTimelineStepItem(timelineStepId, timelineItem);
  pubsub.publish('missionsUpdate', App.missions);
});
App.on('removedTimelineStepItem', ({ simulatorId, missionId, timelineStepId, timelineItemId }) => {
  const object = getTimelineObject(simulatorId, missionId);
  object.removeTimelineStepItem(timelineStepId, timelineItemId);
  pubsub.publish('missionsUpdate', App.missions);
});
App.on('updatedTimelineStepItem', ({ simulatorId, missionId, timelineStepId, timelineItemId, updateTimelineItem }) => {
  const object = getTimelineObject(simulatorId, missionId);
  object.updateTimelineStepItem(timelineStepId, timelineItemId, updateTimelineItem);
  pubsub.publish('missionsUpdate', App.missions);
});


// StationSet
App.on('createdStationSet', ({ name }) => {
  const station = new Classes.StationSet({ name });
  App.stationSets.push(station);
  pubsub.publish('stationSetUpdate', App.stationSets);
});
App.on('removedStationSet', ({ stationSetID }) => {
  App.stationSets = App.stationSets.filter(s => s.id !== stationSetID);
  pubsub.publish('stationSetUpdate', App.stationSets);
});
App.on('renamedStationSet', ({ stationSetID, name }) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  stationSet.rename(name);
  pubsub.publish('stationSetUpdate', App.stationSets);
});
App.on('addedStationToStationSet', ({ stationSetID, stationName }) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  stationSet.addStation({ name: stationName });
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
