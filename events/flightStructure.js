import App from '../app.js';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../data/classes';
import uuid from 'uuid';

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
  mission.addSimulator(simulator.id, simulatorName);
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
App.on('startedFlight', ({ missionId, simulators }) => {
  // First things first, clone the mission object.
  const mission = new Classes.Mission(App.missions.find(m => m.id === missionId));
  // Construct the flights timeline.
  const flightId = uuid.v4();

  const missionTimeline = mission.timeline;
  simulators.forEach(s => {
    const init = missionTimeline[0].timelineItems.find(t => t.id === s.missionSim);
    const args = JSON.parse(init.args);
    const missionSim = Object.assign(App.simulators.find(sim => sim.id === s.missionSim));
    // We only worry about the first timeline item of the template sim.
    const templateSim = Object.assign(App.simulators.find(sim => sim.id === s.simulator));
    const templateInit = templateSim.timeline[0].timelineItems;
    const missionSimTimeline = missionSim.timeline;
    missionSimTimeline[0].timelineItems = [].concat(templateInit, missionSimTimeline[0].timelineItems);
    // Update the args to include the timeline for the simulator.
    args.timeline = missionSimTimeline;
    args.flightId = flightId;
    args.stationSet = s.stationSet;

    init.update({ args: JSON.stringify(args) });
  });

  const flight = new Classes.Flight({
    id: flightId,
    mission: missionId,
    name: mission.name,
    timeline: missionTimeline,
  });
  App.flights.push(flight);
  flight.nextTimeline();
  pubsub.publish('flightsUpdate', App.flights);
});


// Simulator
App.on('createdSimulator', ({ name, template, flightId, timeline, stationSet }) => {
  const simulator = new Classes.Simulator({ name, template, timeline });
  if (flightId) {
    const flight = App.flights.find(f => f.id === flightId);
    flight.addSimulator(simulator, stationSet);
  }
  App.simulators.push(simulator);
  // Initialize the simulator.
  simulator.nextTimeline();
  pubsub.publish('simulatorsUpdate', App.simulators);
});
App.on('removedSimulator', ({ simulatorId }) => {
  App.simulators = App.simulators.filter(s => s.id !== simulatorId);
  pubsub.publish('simulatorsUpdate', App.simulators);
});
App.on('renamedSimulator', ({ simulatorId, name }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  simulator.rename(name);
  pubsub.publish('simulatorsUpdate', App.simulators);
});
App.on('changedSimulatorLayout', ({ simulatorId, layout }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.setLayout(layout);
  }
  pubsub.publish('simulatorsUpdate', App.simulators);
});
App.on('changedSimulatorAlertLevel', ({ simulatorId, alertLevel }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.setAlertLevel(alertLevel);
  }
  pubsub.publish('simulatorsUpdate', App.simulators);
});
App.on('changedSimulatorCrewCount', ({ simulatorId, crewCount }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.setCrewCount(crewCount);
  }
  pubsub.publish('simulatorsUpdate', App.simulators);
});


// Timeline
App.on('addedTimelineStep', ({ simulatorId, missionId, name, description }) => {
  const object = getTimelineObject(simulatorId, missionId);
  object.addTimelineStep({ name, description });
  pubsub.publish('missionsUpdate', App.missions);
  pubsub.publish('simulatorsUpdate', App.simulators);
});
App.on('removedTimelineStep', ({ simulatorId, missionId, timelineStepId }) => {
  const object = getTimelineObject(simulatorId, missionId);
  object.removeTimelineStep(timelineStepId);
  pubsub.publish('missionsUpdate', App.missions);
  pubsub.publish('simulatorsUpdate', App.simulators);
});
App.on('reorderedTimelineStep', ({ simulatorId, missionId, timelineStepId, order }) => {
 const object = getTimelineObject(simulatorId, missionId);
 object.reorderTimelineStep(timelineStepId, order);
 pubsub.publish('missionsUpdate', App.missions);
 pubsub.publish('simulatorsUpdate', App.simulators);
});
App.on('updatedTimelineStep', ({ simulatorId, missionId, timelineStepId, name, description }) => {
  const object = getTimelineObject(simulatorId, missionId);
  object.updateTimelineStep(timelineStepId, { name, description });
  pubsub.publish('missionsUpdate', App.missions);
  pubsub.publish('simulatorsUpdate', App.simulators);
});
App.on('addedTimelineItemToTimelineStep', ({ simulatorId, missionId, timelineStepId, timelineItem }) => {
  const object = getTimelineObject(simulatorId, missionId);
  object.addTimelineStepItem(timelineStepId, timelineItem);
  pubsub.publish('missionsUpdate', App.missions);
  pubsub.publish('simulatorsUpdate', App.simulators);
});
App.on('removedTimelineStepItem', ({ simulatorId, missionId, timelineStepId, timelineItemId }) => {
  const object = getTimelineObject(simulatorId, missionId);
  object.removeTimelineStepItem(timelineStepId, timelineItemId);
  pubsub.publish('missionsUpdate', App.missions);
  pubsub.publish('simulatorsUpdate', App.simulators);
});
App.on('updatedTimelineStepItem', ({ simulatorId, missionId, timelineStepId, timelineItemId, updateTimelineItem }) => {
  const object = getTimelineObject(simulatorId, missionId);
  object.updateTimelineStepItem(timelineStepId, timelineItemId, updateTimelineItem);
  pubsub.publish('missionsUpdate', App.missions);
  pubsub.publish('simulatorsUpdate', App.simulators);
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
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  stationSet.editStationCard(stationName, cardName, { name: newCardName, component: cardComponent, icon: cardIcon });
  pubsub.publish('stationSetUpdate', App.stationSets);
});
App.on('addedSystem', ({}) => {

});
