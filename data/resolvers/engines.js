import App from '../../app.js';
import { pubsub } from '../subscriptionManager.js';

export const EngineQueries = {
  engines(root, { simulatorId }) {
    return App.systems.filter(system => {
      return system.type === 'Engine' && system.simulatorId === simulatorId;
    });
  },
};

export const EngineMutations = {
  setSpeed(root, { id, speed, on }) {
    App.speedChange({ id, speed, on });
    return '';
  },
  // This mutation applies to all systems
  addHeat(root, { id, heat }) {
    App.addHeat({ id, heat });
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
