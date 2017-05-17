import App from '../../app.js';

export const ThrustersQueries = {
  thrusters(root, { simulatorId }) {
    return App.systems.filter(system => {
      return system.type === 'Thrusters' && system.simulatorId === simulatorId;
    });
  },
};

export const ThrustersMutations = {
  rotationUpdate(root, params) {
    App.handleEvent(params, 'rotationUpdate');
  },
  rotationSet(root, params) {
    App.handleEvent(params, 'rotationSet');
  },
  directionUpdate(root, params) {
    App.handleEvent(params, 'directionUpdate');
  },
};

export const ThrustersSubscriptions = {
  rotationChange(root) {
    return root;
  },
};
