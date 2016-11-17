import Shield from './data/classes/shield';
import Engine from './data/classes/engine';
import Simulator from './data/classes/simulator';
import Thruster from './data/classes/thruster';

export const simulators = [];
export const clients = [];
export const systems = [];

/**
* DEFAULT VALUES
* USED FOR DEBUGGING ONLY
**/

simulators.push(new Simulator({
  id: 'test',
  name: 'Test',
  layout: 'LayoutCorners',
  alertLevel: 5,
  timeline: [],
}));

systems.push(new Shield({
  simulatorId: 'test',
  type: 'Shield',
  position: 'full',
  frequency: 257.4,
  state: false,
  integrity: 1,
}));

systems.push(new Engine({
  simulatorId: 'test',
  name: 'Impulse',
  type: 'Engine',
  on: false,
  speeds: [{ text: '1/4 Impulse', number: 0.25 }, { text: '1/2 Impulse', number: 0.5 }, { text: '3/4 Impulse', number: 0.75 }, { text: 'Full Impulse', number: 1 }, { text: 'Destructive Impulse', number: 1.25 }],
  speed: -1,
  heat: 0,
  heatRate: 0.005,
  coolant: 0,
}));

systems.push(new Engine({
  simulatorId: 'test',
  name: 'Warp',
  type: 'Engine',
  on: false,
  speeds: [{ text: 'Warp 1', number: 1 }, { text: 'Warp 2', number: 2 }, { text: 'Warp 3', number: 3 }, { text: 'Warp 4', number: 4 }, { text: 'Warp 5', number: 5 }, { text: 'Warp 6', number: 6 }, { text: 'Warp 7', number: 7 }, { text: 'Warp 8', number: 8 }, { text: 'Warp 9', number: 9 }, { text: 'Destructive Warp', number: 9.54 }],
  speed: -1,
  heat: 0,
  heatRate: 0.02,
  coolant: 0,
}));

systems.push(new Thruster({
  simulatorId: 'test',
}));
