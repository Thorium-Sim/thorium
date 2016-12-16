import App from '../app';
import * as Classes from '../data/classes';

App.on('addedSimulator', (param) => {
  // TODO: Check to make sure the simulator doesn't exist
  App.simulators.push(new Classes.Simulator(param));
});
App.on('addedSystem', (param) => {
  // TODO: Check to make sure the system doesn't exist
  App.systems.push(new Classes[param.type](param));
});
