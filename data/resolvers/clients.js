import { pubsub } from '../subscriptionManager.js';
import Client from '../classes/client';
import App from '../../app';

export const ClientQueries = {
  clients: () => {
    return App.clients;
  },
};

export const ClientMutations = {
  clientConnect: (root, args) => {
    // Skip the event stream for now - just connect the client.
    const newClient = new Client(args);
    if (!App.clients.find((client) => client.id === args.id)) {
      App.clients.push(newClient);
      pubsub.publish('clientChanged', App.clients);
    }
    return '';
  },
  clientDisconnect: (root, args) => {
    // Skip the event stream for now - just connect the client.
    const index = App.clients.findIndex((client) => client.id === args.id);
    App.clients.splice(index, 1);
    pubsub.publish('clientChanged', App.clients);
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
    console.log('Client Subscription', App.clients);
    return App.clients;
  },
};
