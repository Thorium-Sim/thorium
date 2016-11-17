import { RedisPubSub } from 'graphql-redis-subscriptions';
import { SubscriptionManager } from 'graphql-subscriptions';
import schemaString from './schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';

const pubsub = new RedisPubSub({
  connection: {
    host: 'redis.ralexanderson.com',
    port: 6379,
  },
});



//addMockFunctionsToSchema({ schema, preserveResolvers: true });



export { pubsub };
