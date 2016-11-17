import { pubsub } from '../subscriptionManager.js';
import Client from '../classes/client';
import { clients } from '../../app.js';

export const ClientQueries = {
  clients: () => {
    return clients;
  },
};

export const ClientMutations = {
  clientConnect: (root, args) => {
    // Skip the event stream for now - just connect the client.
    const newClient = new Client(args);
    if (!clients.find((client) => client.id === args.id)) {
      clients.push(newClient);
      pubsub.publish('clientChanged', clients);
    }
    return '';
  },
  clientDisconnect: (root, args) => {
    // Skip the event stream for now - just connect the client.
    const index = clients.findIndex((client) => client.id === args.id);
    clients.splice(index, 1);
    pubsub.publish('clientChanged', clients);
    return '';
  },
};

export const ClientSubscriptions = {
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
};
