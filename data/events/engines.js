import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';

App.on('speedChanged', (param) => {
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
App.on('addedHeat', ({ id, heat }) => {
  App.systems.forEach((system) => {
    if (system.id === id) {
      system.addHeat(heat);
      pubsub.publish('heatChange', system);
    }
  });
});
