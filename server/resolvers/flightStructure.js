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
    App.handleEvent(Object.assign(args,{id: uuid.v4()}), 'createMission');
  },
  removeMission(root, args) {
    App.handleEvent(args, 'removeMission');
  },
  editMission(root, args) {
    App.handleEvent(args, 'editMission');
  },
  addSimulatorToMission(root, args) {
    App.handleEvent(args, 'addSimulatorToMission');
  },
  removeSimulatorFromMission(root, args) {
    App.handleEvent(args, 'removeSimulatorToMission');
  },


  // Flight
  startFlight(root, args) {
    App.handleEvent(Object.assign(args,{flightId: uuid.v4()}), 'startFlight');
  },


  // Simulator
  createSimulator(root, args) {
    App.handleEvent(Object.assign(args,{id: uuid.v4()}), 'createSimulator');
  },
  removeSimulator(root, args) {
    App.handleEvent(args, 'removeSimulator');
  },
  renameSimulator(root, args) {
    App.handleEvent(args, 'renameSimulator');
  },
  changeSimulatorLayout(root, args) {
    App.handleEvent(args, 'changeSimulatorLayout');
  },
  changeSimulatorAlertLevel(root, args) {
    App.handleEvent(args, 'changeSimulatorAlertLevel');
  },
  changeSimulatorCrewCount(root, args) {
    App.handleEvent(args, 'changeSimulatorCrewCount');
  },
  shipDockingChange(root, args) {
    App.handleEvent(args, 'shipDockingChange');
  },
  remoteAccessSendCode(root, args) {
    App.handleEvent(args, 'remoteAccessSendCode');
  },
  remoteAccessUpdateCode(root, args) {
    App.handleEvent(args, 'remoteAccessUpdateCode');
  },
  // Timeline
  addTimelineStep(root, args) {
    App.handleEvent(Object.assign(args,{timelineStepId: uuid.v4()}), 'addTimelineStep');
  },
  removeTimelineStep(root, args) {
    App.handleEvent(args, 'removeTimelineStep');
  },
  reorderTimelineStep(root, args) {
    App.handleEvent(args, 'reorderTimelineStep');
  },
  updateTimelineStep(root, args) {
    App.handleEvent(args, 'updateTimelineStep');
  },
  addTimelineItemToTimelineStep(root, args) {
    App.handleEvent(Object.assign(args,{timelineItemId: uuid.v4()}), 'addTimelineItemToTimelineStep');
  },
  removeTimelineStepItem(root, args) {
    App.handleEvent(args, 'removeTimelineStepItem');
  },
  updateTimelineStepItem(root, args) {
    App.handleEvent(args, 'updateTimelineStepItem');
  },


  // Station
  createStationSet(root, args) {
    App.handleEvent(args, 'createStationSet');
  },
  removeStationSet(root, args) {
    App.handleEvent(args, 'removeStationSet');
  },
  renameStationSet(root, args) {
    App.handleEvent(args, 'renameStationSet');
  },
  addStationToStationSet(root, args) {
    App.handleEvent(args, 'addStationToStationSet');
  },
  removeStationFromStationSet(root, args) {
    App.handleEvent(args, 'removeStationFromStationSet');
  },
  editStationInStationSet(root, args) {
    App.handleEvent(args, 'editStationInStationSet');
  },
  addCardToStation(root, args) {
    App.handleEvent(args, 'addCardToStation');
  },
  removeCardFromStation(root, args) {
    App.handleEvent(args, 'removeCardFromStation');
  },
  editCardInStationSet(root, args) {
    App.handleEvent(args, 'editCardInStationSet');
  },
  addSystem: (root, args) => {
    App.handleEvent(args, 'addSystem');
  },
};

export const FlightStructureSubscriptions = {
  stationSetUpdate: (rootValue) => {
    return rootValue;
  },
  missionsUpdate: (rootValue) => {
    return rootValue;
  },
  simulatorsUpdate: (rootValue, { simulatorId, template }) => {
    let returnVal = rootValue;
    if (template) returnVal = returnVal.filter(s => s.template);
    if (simulatorId) returnVal = returnVal.filter(s => s.id === simulatorId);
    return returnVal;
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
    systems(rootValue) {
      return App.systems.filter(s => s.simulatorId === rootValue.id);
    }
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
