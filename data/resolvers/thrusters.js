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
  rotationUpdate(root, { id, rotation, on }) {
    systems.forEach((system) => {
      if (system.id === id) {
        system.updateRotation(rotation, on);
      }
    });
    return '';
  },
  rotationSet(root, { id, rotation }) {
    systems.forEach((system) => {
      if (system.id === id) {
        system.setRotation(rotation);
        pubsub.publish('rotationChange', system);
      }
    });
  },
  directionUpdate(root, { id, direction }) {
    systems.forEach((system) => {
      if (system.id === id) {
        system.updateDirection(direction);
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
