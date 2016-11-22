import Engine from '../classes/engine';
import { systems } from '../../app.js';
import { pubsub } from '../subscriptionManager.js';
import { es } from '../../store.js';

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



es.init(() => {
  es.getEventStream('simulator', (err, stream) => {
    const history = stream.events;
    history.forEach(({ payload }) => {
      processPayload(payload);
    });
  });
});


es.getEventStream('simulator', (err, stream) => {
  stream.addEvent({
    eventType: 'engineAdded',
    simulatorId: 'test',
    name: 'Impulse',
    type: 'Engine',
    on: false,
    speeds: [{ text: '1/4 Impulse', number: 0.25 }, { text: '1/2 Impulse', number: 0.5 }, { text: '3/4 Impulse', number: 0.75 }, { text: 'Full Impulse', number: 1 }, { text: 'Destructive Impulse', number: 1.25 }],
    speed: -1,
    heat: 0,
    heatRate: 0.005,
    coolant: 0,
  });
  stream.commit();
});


es.useEventPublisher((evt, callback) => {
  console.log('Speed Changed:', evt);
  processPayload(evt);
  callback();
});

export const EngineQueries = {
  engines(root, { simulatorId }) {
    return systems.filter(system => {
      return system.type === 'Engine' && system.simulatorId === simulatorId;
    });
  },
};

export const EngineMutations = {
  setSpeed(root, { id, speed, on }) {
    console.log('Speed Changed:', speed);
    es.getEventStream('simulator', (err, stream) => {
      stream.addEvent({
        eventType: 'speedChanged',
        id,
        speed,
        on,
      });
      stream.commit();
    });
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
