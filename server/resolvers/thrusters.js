import App from '../../app.js';

export const ThrustersQueries = {
  thrusters(root, { simulatorId }) {
    return App.systems.filter(system => {
      return system.type === 'Thrusters' && system.simulatorId === simulatorId;
    });
  },
};

export const ThrustersMutations = {
  rotationUpdate(root, params, context) {
    App.handleEvent(params, 'rotationUpdate', context.clientId);
  },
  rotationSet(root, params, context) {
    App.handleEvent(params, 'rotationSet', context.clientId);
  },
  directionUpdate(root, params, context) {
    App.handleEvent(params, 'directionUpdate', context.clientId);
  },
};

export const ThrustersSubscriptions = {
  rotationChange(root) {
    return root;
  },
};
