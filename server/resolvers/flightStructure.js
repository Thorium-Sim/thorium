import App from '../../app';
import uuid from 'uuid';

export const FlightStructureQueries = {
  simulators: (root, { template, id }) => {
    let returnVal = App.simulators;
    if (id) returnVal = returnVal.filter(s => s.id === id);
    if (template) returnVal = returnVal.filter(s => s.template);
    return returnVal;
  },
  flights() {
    return App.flights;
  },
  stations() {
    return App.stationSets;
  },
  missions() {
    return App.missions;
  },
};

export const FlightStructureMutations = {
  test(root, args) {
    App.test(args);
    return '';
  },


  // Mission
  createMission(root, args) {
    App.handleEvent(Object.assign(args,{id: uuid.v4()}), 'createMission', 'createdMission');
  },
  removeMission(root, args) {
    App.handleEvent(args, 'removeMission', 'removedMission');
  },
  editMission(root, args) {
    App.handleEvent(args, 'editMission', 'editedMission');
  },
  addSimulatorToMission(root, args) {
    App.handleEvent(args, 'addSimulatorToMission', 'addedSimulatorToMission');
  },
  removeSimulatorFromMission(root, args) {
    App.handleEvent(args, 'removeSimulatorToMission', 'removedSimulatorToMission');
  },


  // Flight
  startFlight(root, args) {
    App.handleEvent(Object.assign(args,{flightId: uuid.v4()}), 'startFlight', 'startedFlight');
  },


  // Simulator
  createSimulator(root, args) {
    App.handleEvent(Object.assign(args,{id: uuid.v4()}), 'createSimulator', 'createdSimulator');
  },
  removeSimulator(root, args) {
    App.handleEvent(args, 'removeSimulator', 'removedSimulator');
  },
  renameSimulator(root, args) {
    App.handleEvent(args, 'renameSimulator', 'renamedSimulator');
  },
  changeSimulatorLayout(root, args) {
    App.handleEvent(args, 'changeSimulatorLayout', 'changedSimulatorLayout');
  },
  changeSimulatorAlertLevel(root, args) {
    App.handleEvent(args, 'changeSimulatorAlertLevel', 'changedSimulatorAlertLevel');
  },
  changeSimulatorCrewCount(root, args) {
    App.handleEvent(args, 'changeSimulatorCrewCount', 'changedSimulatorCrewCount');
  },


  // Timeline
  addTimelineStep(root, args) {
    App.handleEvent(Object.assign(args,{timelineStepId: uuid.v4()}), 'addTimelineStep', 'addedTimelineStep');
  },
  removeTimelineStep(root, args) {
    App.handleEvent(args, 'removeTimelineStep', 'removedTimelineStep');
  },
  reorderTimelineStep(root, args) {
    App.handleEvent(args, 'reorderTimelineStep', 'reorderedTimelineStep');
  },
  updateTimelineStep(root, args) {
    App.handleEvent(args, 'updateTimelineStep', 'updatedTimelineStep');
  },
  addTimelineItemToTimelineStep(root, args) {
    App.handleEvent(Object.assign(args,{timelineItemId: uuid.v4()}), 'addTimelineItemToTimelineStep', 'addedTimelineItemToTimelineStep');
  },
  removeTimelineStepItem(root, args) {
    App.handleEvent(args, 'removeTimelineStepItem', 'removedTimelineStepItem');
  },
  updateTimelineStepItem(root, args) {
    App.handleEvent(args, 'updateTimelineStepItem', 'updatedTimelineStepItem');
  },


  // Station
  createStationSet(root, args) {
    App.handleEvent(args, 'createStationSet', 'createdStationSet');
  },
  removeStationSet(root, args) {
    App.handleEvent(args, 'removeStationSet', 'removedStationSet');
  },
  renameStationSet(root, args) {
    App.handleEvent(args, 'renameStationSet', 'renamedStationSet');
  },
  addStationToStationSet(root, args) {
    App.handleEvent(args, 'addStationToStationSet', 'addedStationToStationSet');
  },
  removeStationFromStationSet(root, args) {
    App.handleEvent(args, 'removeStationFromStationSet', 'removedStationFromStationSet');
  },
  editStationInStationSet(root, args) {
    App.handleEvent(args, 'editStationInStationSet', 'editedStationInStationSet');
  },
  addCardToStation(root, args) {
    App.handleEvent(args, 'addCardToStation', 'addedCardToStation');
  },
  removeCardFromStation(root, args) {
    App.handleEvent(args, 'removeCardFromStation', 'removedCardFromStation');
  },
  editCardInStationSet(root, args) {
    App.handleEvent(args, 'editCardInStationSet', 'editedCardInStationSet');
  },
  addSystem: (root, args) => {
    App.handleEvent(args, 'addSystem', 'addedSystem');
  },
};

export const FlightStructureSubscriptions = {
  stationSetUpdate: (rootValue) => {
    return rootValue;
  },
  missionsUpdate: (rootValue) => {
    return rootValue;
  },
  simulatorsUpdate: (rootValue, { template }) => {
    if (template) return rootValue.filter(s => s.template);
    return rootValue;
  },
  flightsUpdate: (rootValue) => {
    return rootValue;
  },
};

export const FlightStructureTypes = {
  Simulator: {
    decks(rootValue) {
      return App.decks.filter(d => d.simulatorId === rootValue.id);
    },
    rooms(rootValue) {
      return App.rooms.filter(r => r.simulatorId === rootValue.id);
    },
  },
  Flight: {
    mission(rootValue) {
      return App.missions.find(m => m.id === rootValue.mission);
    },
    simulators(rootValue) {
      return rootValue.simulators.map((s) => {
        const simulator = App.simulators.find(sId => sId.id === s.id);
        simulator.stations = App.stationSets.find(sId => sId.id === s.stationSet).stations;
        return simulator;
      });
    },
  },
  Mission: {
    simulators(rootValue) {
      return rootValue.simulators.map(sId => App.simulators.find(s => s.id === sId));
    },
    timeline(rootValue) {
      return Object.keys(rootValue.timeline).sort().map((k) => {
        const value = rootValue.timeline[k];
        value.order = k;
        return value;
      });
    },
  },
};
