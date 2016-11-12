import { simulators } from '../../app.js';
import { es } from '../../store.js';

export const SimulatorQueries = {
  simulators: (root, args, context, info) => {
    es.getEventStream('simulator', (err, stream) => {
      console.log(stream.events);
    });
    return simulators;
  },
  flights() {
    return [];
  },
  stations() {
    return [];
  },
};

export const SimulatorMutations = {
  addSimulator: (root, args) => {
    // simulators.push(new Simulator(args));
    es.getEventStream({
      aggregateId: 'myAggregateId',
      aggregate: 'person',          // optional
      context: 'hr',                // optional
    }, (err, stream) => {
      stream.addEvent({ my: 'event' });

      stream.commit();
    });
    return [];
    // return simulators;
  },
};

export const SimulatorSubscriptions = {
  simulator: () => {
    return 'Simulator Update';
  },
};
