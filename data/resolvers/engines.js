import { systems } from '../../app.js';
import { pubsub } from '../subscriptionManager.js';

export const EngineQueries = {
  engines(root, { simulatorId }) {
    return systems.filter(system => {
      return system.type === 'Engine' && system.simulatorId === simulatorId;
    });
  },
};

export const EngineMutations = {
  setSpeed(root, { id, speed, on }) {
    let engineIndex = -1;
    const engines = systems.filter(sys => sys.type === 'Engine');
    engines.forEach((system, index) => {
      if (system.id === id) {
        console.log('working');
        engineIndex = index;
        system.setSpeed(speed, on);
        pubsub.publish('speedChange', system);
      }
    });
    // Now stop the other engines
    // If speed is -1 (full stop), stop them all
    engines.forEach((system, index) => {
      if (system.simulatorId === systems[engineIndex].simulatorId) {
        if (index < engineIndex) {
          if (speed === -1) {
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
    return '';
  },
  addHeat(root, { id, heat }) {
    systems.forEach((system) => {
      if (system.id === id) {
        system.addHeat(heat);
        pubsub.publish('heatChange', system);
      }
    });
    return '';
  },
};

export const EngineSubscriptions = {
  speedChange(rootValue) {
    return rootValue;
  },
  heatChange(rootValue) {
    return rootValue;
  },
};
