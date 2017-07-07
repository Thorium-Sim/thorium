import App from '../../app';
import Set from '../classes/set';
import { pubsub } from '../helpers/subscriptionManager.js';

export const SetQueries = {
  sets() {
    return App.sets;
  }
};

export const SetMutations = {
  // I'm not handling these as events
  // Seems a little overkill.
  createSet(rootValue, args, context) {
    App.sets.push(new Set(args));
    pubsub.publish('setsUpdate', App.sets);
  },
  removeSet(rootValue, {id}, context) {
    App.sets.filter(s => s.id !== id);
    pubsub.publish('setsUpdate', App.sets);
  },
  addClientToSet(rootValue, {id, client}, context) {
    App.sets.find(s => s.id === id).addClient(client);
    pubsub.publish('setsUpdate', App.sets);
  },
  removeClientFromSet(rootValue, {id, clientId}, context) {
    App.sets.find(s => s.id === id).removeClient(clientId);
    pubsub.publish('setsUpdate', App.sets);
  },
  updateSetClient(rootValue, {id, client}, context) {
    App.sets.find(s => s.id === id).updateClient(client);
    pubsub.publish('setsUpdate', App.sets);
  }
};

export const SetSubscriptions = {
  setsUpdate(rootValue) {
    return rootValue;
  }
};

export const SetTypes = {
  SetClient: {
    client(rootValue) {
      return rootValue.find(c => App.clients.find(cli => cli.id === c.clientId));
    },
    simulator(rootValue) {
      return rootValue.find(c => App.simulators.find(s => s.template === true && s.id === c.simulatorId));
    },
    stationSet(rootValue) {
      return rootValue.find(c => App.stationSets.find(s => s.id === c.stationSet));
    },
  }
};

