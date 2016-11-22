import * as Classes from './data/classes';
import { AssetFolder } from './data/classes/assets';
import { Entity } from 'sourced';
import { pubsub } from './data/subscriptionManager.js';

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

class EventEntity extends Entity {
  test(param) {
    this.digest('test', param);
    this.emit('tested', param, this);
  }
  addSimulator(param) {
    simulators.push(new Classes.Simulator(param));
    this.digest('addSimulator', param);
    this.emit('addedSimulator', param, this);
  }
  addSystem(param) {
    systems.push(new Classes[param.type](param));
    this.digest('addSystem', param);
    this.emit('addedSystem', param, this);
  }
  speedChange(param) {
    const system = systems.find((sys) => sys.id === param.id);
    const engineIndex = systems.findIndex((sys) => sys.id === param.id) || -1;
    system.setSpeed(param.speed, param.on);
    pubsub.publish('speedChange', system);
    // Now stop the other engines
    // If speed is -1 (full stop), stop them all
    systems.forEach((system, index) => {
      if (system.simulatorId === systems[engineIndex].simulatorId && system.type === 'Engine') {
        if (index < engineIndex) {
          if (param.speed === -1) {
            system.setSpeed(-1, false);
          } else {
            system.setSpeed(system.speeds.length, false);
          }
          pubsub.publish('speedChange', system);
        }
        if (index > engineIndex) {
          system.setSpeed(-1, false);
          pubsub.publish('speedChange', system);
        }
      }
    });
    this.digest('speedChange', param);
    this.emit('speedChanged', param, this);
  }
}
export const Events = new EventEntity(); // Entity({Snapshot},[Events]);
/**
* DEFAULT VALUES
* USED FOR DEBUGGING ONLY
**/

Events.addSimulator({
  id: 'test',
  name: 'Test',
  layout: 'LayoutCorners',
  alertLevel: 5,
  timeline: [],
});
Events.addSystem({
  simulatorId: 'test',
  type: 'Shield',
  position: 'full',
  frequency: 257.4,
  state: false,
  integrity: 1,
});
Events.addSystem({
  simulatorId: 'test',
  type: 'Thruster',
});
Events.addSystem({
  simulatorId: 'test',
  id: 'test-engine-impulse',
  name: 'Impulse',
  type: 'Engine',
  on: false,
  speeds: [{ text: '1/4 Impulse', number: 0.25 }, { text: '1/2 Impulse', number: 0.5 }, { text: '3/4 Impulse', number: 0.75 }, { text: 'Full Impulse', number: 1 }, { text: 'Destructive Impulse', number: 1.25 }],
  speed: -1,
  heat: 0,
  heatRate: 0.005,
  coolant: 0,
});
Events.addSystem({
  simulatorId: 'test',
  id: 'test-engine-warp',
  name: 'Warp',
  type: 'Engine',
  on: false,
  speeds: [{ text: 'Warp 1', number: 1 }, { text: 'Warp 2', number: 2 }, { text: 'Warp 3', number: 3 }, { text: 'Warp 4', number: 4 }, { text: 'Warp 5', number: 5 }, { text: 'Warp 6', number: 6 }, { text: 'Warp 7', number: 7 }, { text: 'Warp 8', number: 8 }, { text: 'Warp 9', number: 9 }, { text: 'Destructive Warp', number: 9.54 }],
  speed: -1,
  heat: 0,
  heatRate: 0.02,
  coolant: 0,
});
/*
simulators.push(MySim);


systems.push(new Thruster({
  simulatorId: 'test',
}));
*/
Events.test('Awesome');
Events.test('Great');
console.log('EVENTS',Events.newEvents);
console.log(Object.keys(Events));
console.log(Events.eventsToEmit)
console.log(Events._events)
console.log(Events.snapshot());