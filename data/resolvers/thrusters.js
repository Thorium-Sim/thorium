import { systems } from '../../app.js';
import { pubsub } from '../subscriptionManager.js';

export const ThrustersQueries = {
  thrusters(root, { simulatorId }) {
    return systems.filter(system => {
      return system.type === 'Thruster' && system.simulatorId === simulatorId;
    });
  },
};

export const ThrustersMutations = {
  rotationUpdate(root, { id, rotation }) {
    systems.forEach((system) => {
      if (system.id === id) {
        system.updateRotation(rotation);
        pubsub.publish('rotationChange', system);
      }
    });
    return '';
  },
};

export const ThrustersSubscriptions = {
  rotationChange(root) {
    return root;
  },
};
