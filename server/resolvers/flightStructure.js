import App from '../../app';
import uuid from 'uuid';

export const FlightStructureQueries = {
  simulators: (root, { template, id }) => {
    let returnVal = App.simulators;
    if (id) returnVal = returnVal.filter(s => s.id === id);
    if (template) returnVal = returnVal.filter(s => s.template);
    return returnVal;
  },
  flights(root, {running}) {
    if (running) {
      return App.flights.filter(f => running);
    }
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
    App.handleEvent(Object.assign(args,{id: uuid.v4()}), 'createMission', context);
  },
  removeMission(root, args, context) {
    App.handleEvent(args, 'removeMission', context);
  },
  editMission(root, args, context) {
    App.handleEvent(args, 'editMission', context);
  },


  // Flight
  startFlight(root, args, context) {
    const flightId = uuid.v4();
    App.handleEvent(Object.assign(args, {id: flightId}), 'startFlight', context);
    return flightId;
  },


  // Simulator
  createSimulator(root, args, context = {}) {
    App.handleEvent(Object.assign(args,{id: uuid.v4()}), 'createSimulator', context);
  },
  removeSimulator(root, args, context) {
    App.handleEvent(args, 'removeSimulator', context);
  },
  renameSimulator(root, args, context) {
    App.handleEvent(args, 'renameSimulator', context);
  },
  changeSimulatorLayout(root, args, context) {
    App.handleEvent(args, 'changeSimulatorLayout', context);
  },
  changeSimulatorAlertLevel(root, args, context) {
    App.handleEvent(args, 'changeSimulatorAlertLevel', context);
  },
  changeSimulatorCrewCount(root, args, context) {
    App.handleEvent(args, 'changeSimulatorCrewCount', context);
  },

  // Timeline
  addTimelineStep(root, args, context) {
    App.handleEvent(Object.assign(args,{timelineStepId: uuid.v4()}), 'addTimelineStep', context);
  },
  removeTimelineStep(root, args, context) {
    App.handleEvent(args, 'removeTimelineStep', context);
  },
  reorderTimelineStep(root, args, context) {
    App.handleEvent(args, 'reorderTimelineStep', context);
  },
  updateTimelineStep(root, args, context) {
    App.handleEvent(args, 'updateTimelineStep', context);
  },
  addTimelineItemToTimelineStep(root, args, context) {
    App.handleEvent(Object.assign(args,{timelineItemId: uuid.v4()}), 'addTimelineItemToTimelineStep', context);
  },
  removeTimelineStepItem(root, args, context) {
    App.handleEvent(args, 'removeTimelineStepItem', context);
  },
  updateTimelineStepItem(root, args, context) {
    App.handleEvent(args, 'updateTimelineStepItem', context);
  },


  // Station
  createStationSet(root, args, context) {
    App.handleEvent(args, 'createStationSet', context);
  },
  removeStationSet(root, args, context) {
    App.handleEvent(args, 'removeStationSet', context);
  },
  renameStationSet(root, args, context) {
    App.handleEvent(args, 'renameStationSet', context);
  },
  addStationToStationSet(root, args, context) {
    App.handleEvent(args, 'addStationToStationSet', context);
  },
  removeStationFromStationSet(root, args, context) {
    App.handleEvent(args, 'removeStationFromStationSet', context);
  },
  editStationInStationSet(root, args, context) {
    App.handleEvent(args, 'editStationInStationSet', context);
  },
  addCardToStation(root, args, context) {
    App.handleEvent(args, 'addCardToStation', context);
  },
  removeCardFromStation(root, args, context) {
    App.handleEvent(args, 'removeCardFromStation', context);
  },
  editCardInStationSet(root, args, context) {
    App.handleEvent(args, 'editCardInStationSet', context);
  },
  addSystem: (root, args, context) => {
    App.handleEvent(args, 'addSystem', context);
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
    },
    stations(rootValue) {
      const stations = App.stationSets.find(s => s.id === rootValue.stationSet);
      if (stations) {
        return stations.stations;
      }
      return [];
    },
    stationSets(rootValue) {
      return App.stationSets.filter(s => s.simulatorId === rootValue.id);
    }
  },
  Stationset: {
    simulator(rootValue) {
      return App.simulators.find(s => s.id === rootValue.simulatorId);
    }
  },
  Flight: {
    date(rootValue) {
      const date = new Date(rootValue.date);
      return date.toISOString();
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
