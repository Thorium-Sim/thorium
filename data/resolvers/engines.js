import App from '../../app.js';

export const EngineQueries = {
  engines(root, { simulatorId }) {
    return App.systems.filter(system => {
      return system.type === 'Engine' && system.simulatorId === simulatorId;
    });
  },
};

export const EngineMutations = {
  setSpeed(root, { id, speed, on }) {
    App.handleEvent({ id, speed, on }, 'speedChange', 'speedChanged');
    return '';
  },
  // This mutation applies to all systems
  addHeat(root, { id, heat }) {
    App.handleEvent({ id, heat }, 'addHeat', 'addedHeat');
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
