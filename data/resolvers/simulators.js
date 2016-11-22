import { simulators } from '../../app.js';

export const SimulatorQueries = {
  simulators: (root, args, context, info) => {
   
    return simulators;
  },
  flights() {
    return [];
  },
  stations() {
    return [];
  },
};

export const SimulatorMutations = {
  test:(root, args) => {
    simulators[0].test(args);
    return '';
  },
  addSimulator: (root, args) => {
    // simulators.push(new Simulator(args));
   
    return [];
    // return simulators;
  },
};

export const SimulatorSubscriptions = {
  simulator: () => {
    return 'Simulator Update';
  },
};
