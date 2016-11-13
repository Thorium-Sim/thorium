import { systems } from '../../app.js';
//import { pubsub } from '../subscriptionManager.js';

export const ThrustersQueries = {
  thrusters(root, { simulatorId }) {
    return systems.filter(system => {
      return system.type === 'Thruster' && system.simulatorId === simulatorId;
    });
  },
};

export const ThrustersMutations = {

};

export const ThrustersSubscriptions = {

};
