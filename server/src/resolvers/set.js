import App from "../app";
import Set from "../classes/set";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

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
    pubsub.publish("setsUpdate", App.sets);
  },
  removeSet(rootValue, { id }, context) {
    App.sets = App.sets.filter(s => s.id !== id);
    pubsub.publish("setsUpdate", App.sets);
  },
  addClientToSet(rootValue, { id, client }, context) {
    App.sets.find(s => s.id === id).addClient(client);
    pubsub.publish("setsUpdate", App.sets);
  },
  removeClientFromSet(rootValue, { id, clientId }, context) {
    App.sets.find(s => s.id === id).removeClient(clientId);
    pubsub.publish("setsUpdate", App.sets);
  },
  updateSetClient(rootValue, { id, client }, context) {
    App.sets.find(s => s.id === id).updateClient(client);
    pubsub.publish("setsUpdate", App.sets);
  },
  renameSet(root, { id, name }, context) {
    App.sets.find(s => s.id === id).rename(name);
    pubsub.publish("setsUpdate", App.sets);
  }
};

export const SetSubscriptions = {
  setsUpdate: {
    resolve(rootValue) {
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("setsUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};

export const SetTypes = {
  SetClient: {
    client(rootValue) {
      return App.clients.find(c => c.id === rootValue.clientId);
    },
    simulator(rootValue) {
      return App.simulators.find(c => c.id === rootValue.simulatorId);
    },
    stationSet(rootValue) {
      return App.stationSets.find(c => c.id === rootValue.stationSet);
    }
  }
};
