import App from '../../app.js';

export const SimulatorQueries = {
  simulators: (root, args) => {
    return App.simulators;
  },
  flights() {
    return [];
  },
  stations() {
    return [];
  },
};

export const SimulatorMutations = {
  test(root, args) {
    App.test(args);
    return '';
  },
  addSimulator: (root, args) => {
    App.handleEvent(args, 'addSimulator', 'addedSimulator');
    return '';
  },
  addSystem: (root, args) => {
    App.handleEvent(args, 'addSystem', 'addedSystem');
  },
};

export const SimulatorSubscriptions = {
  simulator: () => {
    return 'Simulator Update';
  },
};
