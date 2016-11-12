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
    systems.forEach((system) => {
      if (system.id === id) {
        system.setSpeed(speed, on);
        pubsub.publish('speedChange', system);
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
