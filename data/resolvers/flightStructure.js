import App from '../../app.js';

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
    App.handleEvent(args, 'createMission', 'createdMission');
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
    App.handleEvent(args, 'startFlight', 'startedFlight');
  },


  // Simulator
  createSimulator(root, args) {
    App.handleEvent(args, 'createTemplateSimulator', 'createdTemplateSimulator');
  },
  removeSimulator(root, args) {
    App.handleEvent(args, 'removeTemplateSimulator', 'removedTemplateSimulator');
  },


  // Timeline
  addTimelineStep(root, args) {
    App.handleEvent(args, 'addTimelineStep', 'addedTimelineStep');
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
    App.handleEvent(args, 'addTimelineItemToTimelineStep', 'addedTimelineItemToTimelineStep');
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
  addStationToStationSet(root, args) {
    App.handleEvent(args, 'addStationToStationSet', 'addedStationToStationSet');
  },
  removeStationFromStationSet(root, args) {
    App.handleEvent(args, 'removeStationFromStationSet', 'removedStationFromStationSet');
  },
  /*editStationInStationSet(root, args) {
    App.handleEvent(args, 'editStationInStationSet', 'editedStationInStationSet');
  },*/
  addCardToStation(root, args) {
    App.handleEvent(args, 'addCardToStation', 'addedCardToStation');
  },
  removeCardFromStation(root, args) {
    App.handleEvent(args, 'removeCardFromStation', 'removedCardFromStation');
  },
  /*editCardInStationSet(root, args) {
    App.handleEvent(args, 'editCardInStationSet', 'editedCardInStationSet');
  },*/
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
};

export const FlightStructureTypes = {
  Mission: {
    simulators(rootValue) {
      return rootValue.simulators.map(sId => App.simulators.find(s => s.id === sId));
    },
    timeline(rootValue) {
      return Object.keys(rootValue.timeline).sort().map(k => {
        const value = rootValue.timeline[k];
        value.order = k;
        return value;
      });
    },
  },
};
