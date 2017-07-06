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
  setSimulatorId(rootValue, {id, simulatorId}, context) {
    App.sets.find(s => s.id === id).setSimulatorId(simulatorId);
  },
  addClientToSet(rootValue, {id, clientId}, context) {
    App.sets.find(s => s.id === id).addClient(clientId);
    pubsub.publish('setsUpdate', App.sets);
  },
  removeClientFromSet(rootValue, {id, clientId}, context) {
    App.sets.find(s => s.id === id).removeClient(clientId);
    pubsub.publish('setsUpdate', App.sets);
  },
};

export const SetSubscriptions = {
  setsUpdate(rootValue) {
    return rootValue;
  }
};

export const SetTypes = {
  Set: {
    clients(rootValue) {
      return rootValue.map(c => App.clients.find(cli => cli.id === c))
    }
  }
};

