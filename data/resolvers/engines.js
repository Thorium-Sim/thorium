import Engine from '../classes/engine';
import { systems, Events } from '../../app.js';
import { pubsub } from '../subscriptionManager.js';

function processPayload(payload) {
  const engines = systems.filter(sys => sys.type === 'Engine');
  const system = systems.find((sys) => sys.id === payload.id);
  const engineIndex = systems.findIndex((sys) => sys.id === payload.id) || -1;
  switch (payload.eventType) {
    case 'engineAdded':
    systems.push(new Engine(payload));
    break;
    case 'engineRemoved':
    systems.splice(systems.findIndex((sys) => sys.id === payload.id), 1);
    break;
    case 'speedChanged':
    system.setSpeed(payload.speed, payload.on);
    // Now stop the other engines
    // If speed is -1 (full stop), stop them all
    engines.forEach((engine, index) => {
      if (engine.simulatorId === systems[engineIndex].simulatorId) {
        if (index < engineIndex) {
          if (payload.speed === -1) {
            engine.setSpeed(-1, false);
          } else {
            engine.setSpeed(engine.speeds.length, false);
          }
          pubsub.publish('speedChange', engine);
        }
        if (index > engineIndex) {
          engine.setSpeed(-1, false);
          pubsub.publish('speedChange', engine);
        }
      }
    });
    break;
    default:
    break;
  }
}

export const EngineQueries = {
  engines(root, { simulatorId }) {
    return systems.filter(system => {
      return system.type === 'Engine' && system.simulatorId === simulatorId;
    });
  },
};

export const EngineMutations = {
  setSpeed(root, { id, speed, on }) {
    Events.speedChange({ id, speed, on });
    return '';
  },
  addHeat(root, { id, heat }) {
    systems.forEach((system) => {
      if (system.id === id) {
        system.addHeat(heat);
        pubsub.publish('heatChange', system);
      }
    });
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
