import App from '../../app.js';
import { pubsub } from '../subscriptionManager.js';

export const ThrustersQueries = {
  thrusters(root, { simulatorId }) {
    return App.systems.filter(system => {
      return system.type === 'Thruster' && system.simulatorId === simulatorId;
    });
  },
};

export const ThrustersMutations = {
  rotationUpdate(root, { id, rotation, on }) {
    App.systems.forEach((system) => {
      if (system.id === id) {
        system.updateRotation(rotation, on);
      }
    });
    return '';
  },
  rotationSet(root, { id, rotation }) {
    App.systems.forEach((system) => {
      if (system.id === id) {
        system.setRotation(rotation);
        pubsub.publish('rotationChange', system);
      }
    });
  },
  directionUpdate(root, { id, direction }) {
    App.systems.forEach((system) => {
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
