import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../classes';

App.on('createEngine', (param) => {
  const engine = new Classes.Engine(param);
  App.systems.push(engine);
  pubsub.publish('engineChange', App.systems);
});
App.on('removeEngine', (param) => {
  App.systems = App.systems.filter((e) => {
    if (e.type === 'Engine') {
      if (param.id) {
        return e.id !== param.id;
      }
      if (param.simulatorId && param.name) {
        return (e.simulatorId !== param.simulatorId && e.name !== param.name);
      }
    }
    return true;
  });
  pubsub.publish('engineChange', App.engines);
})
App.on('speedChange', (param) => {
  const system = App.systems.find((sys) => sys.id === param.id);
  const engineIndex = App.systems.findIndex((sys) => sys.id === param.id) || -1;
  system.setSpeed(param.speed, param.on);
  pubsub.publish('speedChange', system);
  // Now stop the other engines
  // If speed is -1 (full stop), stop them all
  App.systems.forEach((engine, index) => {
    if (engine.simulatorId === App.systems[engineIndex].simulatorId && engine.type === 'Engine') {
      if (index < engineIndex) {
        if (param.speed === -1) {
          engine.setSpeed(-1, false);
        } else {
          engine.setSpeed(engine.speeds.length, false);
        }
        pubsub.publish('speedChange', engine);
      }
      if (index > engineIndex) {
        engine.setSpeed(-1, false);
        pubsub.publish('speedChange', engine);
      }
    }
  });
});
App.on('addHeat', ({ id, heat }) => {
  App.systems.forEach((system) => {
    if (system.id === id) {
      system.addHeat(heat);
      pubsub.publish('heatChange', system);
    }
  });
});
