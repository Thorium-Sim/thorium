import App from '../../app.js';

export const FlightStructureQueries = {
  simulators: (root, args) => {
    return App.simulators;
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
  createMission(root, args) {
    App.handleEvent(args, 'createMission', 'createdMission');
  },
  removeMission(root, args) {
    App.handleEvent(args, 'removeMission', 'removedMission');
  },
  editMission(root, args) {
    App.handleEvent(args, 'editMission', 'editedMission');
  },
  startFlight(root, args) {
    App.handleEvent(args, 'startFlight', 'startedFlight');
  },
  createTemplateSimulator(root, args) {
    App.handleEvent(args, 'createTemplateSimulator', 'createdTemplateSimulator');
  },
  addTimelineStepToSimulator(root, args) {
    App.handleEvent(args, 'addTimelineStepToSimulator', 'addedTimelineStepToSimulator');
  },
  addTimelineItemToTimelineStep(root, args) {
    App.handleEvent(args, 'addTimelineItemToTimelineStep', 'addedTimelineItemToTimelineStep');
  },
  removeTemplateSimulator(root, args) {
    App.handleEvent(args, 'removeTemplateSimulator', 'removedTemplateSimulator');
  },
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
};
