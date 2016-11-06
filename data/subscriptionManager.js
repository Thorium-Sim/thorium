import { RedisPubSub } from 'graphql-redis-subscriptions';
import { SubscriptionManager } from 'graphql-subscriptions';
import schemaString from './schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';

const pubsub = new RedisPubSub({
  connection: {
    host: 'localhost',
    port: 6379,
  },
});


const schema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers,
});

//addMockFunctionsToSchema({ schema, preserveResolvers: true });

const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    clients: (options, args) => ({
      clients: {
        filter: () => true,
      },
    }),
  },
});

subscriptionManager.subscribe({
  query: `
  subscription onClientChange{
    clientChanged {
      id
      flight
      simulators
      station
    }
  }
  `,
  context: {},
  callback: (err, data) => console.trace('SUB RESULTS',err,data),
});
export { subscriptionManager, pubsub };
