import { simulators, clients, systems } from '../../app.js';
import Simulator from '../classes/simulator';
import Client from '../classes/client';
import Shield from '../classes/shield';
import Engine from '../classes/engine';
import { es } from '../../store.js';
import { pubsub } from '../subscriptionManager.js';

systems.push(new Shield({
  simulatorId: 'test',
  type: 'Shield',
  position: 'full',
  frequency: 257.4,
  state: false,
  integrity: 1,
}));

systems.push(new Engine({
  simulatorId: 'test',
  name: 'Impulse',
  type: 'Engine',
  speeds: [{ text: '1/4 Impulse', number: 0.25 }, { text: '1/2 Impulse', number: 0.5 }, { text: '3/4 Impulse', number: 0.75 }, { text: 'Full Impulse', number: 1 }, { text: 'Destructive Impulse', number: 1.25 }],
  speed: -1,
  heat: 0,
  coolant: 0,
}));

systems.push(new Engine({
  simulatorId: 'test',
  name: 'Warp',
  type: 'Engine',
  speeds: [{ text: 'Warp 1', number: 1 }, { text: 'Warp 2', number: 2 }, { text: 'Warp 3', number: 3 }, { text: 'Warp 4', number: 4 }, { text: 'Warp 5', number: 5 }, { text: 'Warp 6', number: 6 }, { text: 'Warp 7', number: 7 }, { text: 'Warp 8', number: 8 }, { text: 'Warp 9', number: 9 }, { text: 'Destructive Warp', number: 9.54 }],
  speed: -1,
  heat: 0,
  coolant: 0,
}));

const queryMap = {
  clients: (root, args, context) => {
    return clients;
  },
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
  shields(root, { simulatorId }) {
    return systems.filter(system => {
      return system.type === 'Shield' && system.simulatorId === simulatorId;
    });
  },
  engines(root, { simulatorId }) {
    return systems.filter(system => {
      return system.type === 'Engine' && system.simulatorId === simulatorId;
    });
  },
};

const mutationMap = {
  clientConnect: (root, args, context) => {
    // Skip the event stream for now - just connect the client.
    const newClient = new Client(args);
    if (!clients.find((client) => client.id === args.id)) {
      clients.push(newClient);
      pubsub.publish('clientChanged', clients);
    }
    return '';
  },
  clientDisconnect: (root, args, context) => {
    // Skip the event stream for now - just connect the client.
    const index = clients.findIndex((client) => client.id === args.id);
    clients.splice(index, 1);
    pubsub.publish('clientChanged', clients);
    return '';
  },
  addSimulator: (root, args, context, info) => {
    // simulators.push(new Simulator(args));
    es.getEventStream({
      aggregateId: 'myAggregateId',
      aggregate: 'person',          // optional
      context: 'hr'                 // optional
    }, (err, stream) => {
      stream.addEvent({ my: 'event' });

      stream.commit();
    });
    return [];
    // return simulators;
  },
  shieldRaised(root, { id }) {
    let outerIndex = 0;
    systems.forEach((system, index) => {
      if (system.id === id) {
        outerIndex = index;
      }
    });
    systems[outerIndex].state = true;
    pubsub.publish('shieldRaised', systems[outerIndex]);
    return '';
  },
  shieldLowered(root, { id }) {
    let outerIndex = 0;
    systems.forEach((system, index) => {
      if (system.id === id) {
        outerIndex = index;
      }
    });
    systems[outerIndex].state = false;
    pubsub.publish('shieldLowered', systems[outerIndex]);
    return '';
  },
  shieldIntegritySet(root, { id, integrity }){
    return '';
  },
  shieldFrequencySet(root, { id, frequency }){
    return '';
  },
};

const subscriptionMap = {
  simulator: () => {
    return 'Simulator Update';
  },
  clientConnect(rootValue) {
    return rootValue;
  },
  clientDisconnect(rootValue) {
    return rootValue;
  },
  clientChanged: () => {
    console.log('Client Subscription', clients);
    return clients;
  },
  postUpvoted: () => {
    return 'Post Upvoted';
  },
  shieldRaised(rootValue) {
    return rootValue;
  },
  shieldLowered(rootValue) {
    return rootValue;
  },
};

export default {
  Query: queryMap,
  Mutation: mutationMap,
  Subscription: subscriptionMap,
};
