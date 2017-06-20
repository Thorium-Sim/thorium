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
  test(root, args, context) {
    App.test(args);
    return '';
  },


  // Mission
  createMission(root, args, context) {
    App.handleEvent(Object.assign(args,{id: uuid.v4()}), 'createMission', context.clientId);
  },
  removeMission(root, args, context) {
    App.handleEvent(args, 'removeMission', context.clientId);
  },
  editMission(root, args, context) {
    App.handleEvent(args, 'editMission', context.clientId);
  },
  addSimulatorToMission(root, args, context) {
    App.handleEvent(args, 'addSimulatorToMission', context.clientId);
  },
  removeSimulatorFromMission(root, args, context) {
    App.handleEvent(args, 'removeSimulatorToMission', context.clientId);
  },


  // Flight
  startFlight(root, args, context) {
    App.handleEvent(Object.assign(args,{flightId: uuid.v4()}), 'startFlight', context.clientId);
  },


  // Simulator
  createSimulator(root, args, context = {}) {
    App.handleEvent(Object.assign(args,{id: uuid.v4()}), 'createSimulator', context.clientId);
  },
  removeSimulator(root, args, context) {
    App.handleEvent(args, 'removeSimulator', context.clientId);
  },
  renameSimulator(root, args, context) {
    App.handleEvent(args, 'renameSimulator', context.clientId);
  },
  changeSimulatorLayout(root, args, context) {
    App.handleEvent(args, 'changeSimulatorLayout', context.clientId);
  },
  changeSimulatorAlertLevel(root, args, context) {
    App.handleEvent(args, 'changeSimulatorAlertLevel', context.clientId);
  },
  changeSimulatorCrewCount(root, args, context) {
    App.handleEvent(args, 'changeSimulatorCrewCount', context.clientId);
  },

  // Timeline
  addTimelineStep(root, args, context) {
    App.handleEvent(Object.assign(args,{timelineStepId: uuid.v4()}), 'addTimelineStep', context.clientId);
  },
  removeTimelineStep(root, args, context) {
    App.handleEvent(args, 'removeTimelineStep', context.clientId);
  },
  reorderTimelineStep(root, args, context) {
    App.handleEvent(args, 'reorderTimelineStep', context.clientId);
  },
  updateTimelineStep(root, args, context) {
    App.handleEvent(args, 'updateTimelineStep', context.clientId);
  },
  addTimelineItemToTimelineStep(root, args, context) {
    App.handleEvent(Object.assign(args,{timelineItemId: uuid.v4()}), 'addTimelineItemToTimelineStep', context.clientId);
  },
  removeTimelineStepItem(root, args, context) {
    App.handleEvent(args, 'removeTimelineStepItem', context.clientId);
  },
  updateTimelineStepItem(root, args, context) {
    App.handleEvent(args, 'updateTimelineStepItem', context.clientId);
  },


  // Station
  createStationSet(root, args, context) {
    App.handleEvent(args, 'createStationSet', context.clientId);
  },
  removeStationSet(root, args, context) {
    App.handleEvent(args, 'removeStationSet', context.clientId);
  },
  renameStationSet(root, args, context) {
    App.handleEvent(args, 'renameStationSet', context.clientId);
  },
  addStationToStationSet(root, args, context) {
    App.handleEvent(args, 'addStationToStationSet', context.clientId);
  },
  removeStationFromStationSet(root, args, context) {
    App.handleEvent(args, 'removeStationFromStationSet', context.clientId);
  },
  editStationInStationSet(root, args, context) {
    App.handleEvent(args, 'editStationInStationSet', context.clientId);
  },
  addCardToStation(root, args, context) {
    App.handleEvent(args, 'addCardToStation', context.clientId);
  },
  removeCardFromStation(root, args, context) {
    App.handleEvent(args, 'removeCardFromStation', context.clientId);
  },
  editCardInStationSet(root, args, context) {
    App.handleEvent(args, 'editCardInStationSet', context.clientId);
  },
  addSystem: (root, args, context) => {
    App.handleEvent(args, 'addSystem', context.clientId);
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
