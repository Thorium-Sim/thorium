import { pubsub } from '../../helpers/subscriptionManager.js';

export const ShieldQueries = {
  shields(root, { simulatorId }) {
    return systems.filter(system => {
      return system.type === 'Shield' && system.simulatorId === simulatorId;
    });
  },
};

export const ShieldMutations = {
  shieldRaised(root, { id }) {
    systems.forEach((system) => {
      if (system.id === id) {
        system.shieldState(true);
        pubsub.publish('shieldRaised', system);
      }
    });
    return '';
  },
  shieldLowered(root, { id }) {
    systems.forEach((system) => {
      if (system.id === id) {
        system.shieldState(false);
        pubsub.publish('shieldLowered', system);
      }
    });
    return '';
  },
  shieldIntegritySet(root, { id, integrity }) {
    systems.forEach((system) => {
      if (system.id === id) {
        system.setIntegrity(integrity);
        pubsub.publish('shieldIntegrity', system);
      }
    });
    return '';
  },
  shieldFrequencySet(root, { id, frequency }) {
    systems.forEach((system) => {
      if (system.id === id) {
        system.setFrequency(frequency);
        pubsub.publish('shieldFrequency', system);
      }
    });
    return '';
  },
};

export const ShieldSubscriptions = {
  shieldRaised(rootValue) {
    return rootValue;
  },
  shieldLowered(rootValue) {
    return rootValue;
  },
};
