import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import Set from "../classes/set";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Set {
    id: ID
    name: String
    clients: [SetClient]
  }

  type SetClient {
    id: ID
    client: Client
    simulator: Simulator
    stationSet: StationSet
    station: String
  }

  input SetClientInput {
    id: ID
    clientId: ID
    simulatorId: ID
    stationSet: ID
    station: ID
  }
  extend type Query {
    sets: [Set]
  }
  extend type Mutation {
    createSet(name: String!): String
    removeSet(id: ID!): String
    addClientToSet(id: ID!, client: SetClientInput!): String
    removeClientFromSet(id: ID!, clientId: ID!): String
    updateSetClient(id: ID!, client: SetClientInput!): String
    renameSet(id: ID!, name: String!): String
  }
  extend type Subscription {
    setsUpdate: [Set]
  }
`;

// We define all of the resolvers necessary for
// the functionality in this file. These will be
// deep merged with the other resolvers.
const resolver = {
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
  },
  Query: {
    sets() {
      return App.sets;
    }
  },
  Mutation: {
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
  },
  Subscription: {
    setsUpdate: {
      resolve(rootValue) {
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("setsUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
