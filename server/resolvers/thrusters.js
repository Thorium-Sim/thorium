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
    App.handleEvent(params, 'rotationUpdate', context);
  },
  rotationSet(root, params, context) {
    App.handleEvent(params, 'rotationSet', context);
  },
  directionUpdate(root, params, context) {
    App.handleEvent(params, 'directionUpdate', context);
  },
  requiredRotationSet(root, params, context) {
    App.handleEvent(params, 'requiredRotationSet', context);
  },
};

export const ThrustersSubscriptions = {
  rotationChange(root) {
    return root;
  },
};
