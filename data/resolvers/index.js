import { simulators, clients } from '../../app.js';
import Simulator from '../classes/simulator.js';
import Client from '../classes/client.js';
import { es } from '../../store.js';
import { pubsub } from '../subscriptionManager.js';
const queryMap = {
  clients: (root, args, context) => {
    console.log('Clients Query', clients);
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
};

const mutationMap = {
  clientConnect: (root, args, context) => {
    // Skip the event stream for now - just connect the client.
    console.log('Clients Old', clients);
    Promise.resolve((() => {
      if (!clients.find((client) => client.id === args.id)) {
        clients.push(new Client(args));
      }
      console.log('Clients New', clients);
    })()).then(() => {
      pubsub.publish('clientChanged', clients);
    });
    return '';
  },
  clientDisconnect: (root, args, context) => {
    // Skip the event stream for now - just connect the client.
    console.log('ArgsD', args);
    console.log('Clients Old', clients);
    const index = clients.findIndex((client) => client.id === args.id);
    clients.splice(index, 1);
    console.log('Clients New', clients);
    pubsub.publish('clientChanged', args.id);
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
};

const subscriptionMap = {
  simulator: () => {
    return 'Simulator Update';
  },
  clientChanged: () => {
    console.log('Client Subscription', clients);
    return clients;
  },
  postUpvoted: () => {
    return 'Post Upvoted';
  },
};

export default {
  Query: queryMap,
  Mutation: mutationMap,
  Subscription: subscriptionMap,
};
