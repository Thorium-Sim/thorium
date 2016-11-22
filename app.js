import Shield from './data/classes/shield';
import Engine from './data/classes/engine';
import Simulator from './data/classes/simulator';
import Thruster from './data/classes/thruster';
import { AssetFolder } from './data/classes/assets';

export const simulators = [];
export const clients = [];
export const systems = [];
export const assets = {
  folders: [new AssetFolder({
    id: 'c7235894-5917-4c7d-bff9-095c8d5f523c',
    folderPath: '',
    fullPath: '/',
    name: '/',
  })],
  containers: [],
  objects: [],
};

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

systems.push(new Thruster({
  simulatorId: 'test',
}));
