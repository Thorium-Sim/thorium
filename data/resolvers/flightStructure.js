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
  /*addSimulator: (root, args) => {
    App.handleEvent(args, 'addSimulator', 'addedSimulator');
    return '';
  },*/
  addSystem: (root, args) => {
    App.handleEvent(args, 'addSystem', 'addedSystem');
  },
};

export const FlightStructureSubscriptions = {
};
