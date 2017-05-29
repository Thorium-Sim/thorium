import { SubscriptionManager } from 'graphql-subscriptions';
import { makeExecutableSchema } from 'graphql-tools';
import schemaString from './schema';
import resolvers from './resolvers';
import { pubsub } from './helpers/subscriptionManager';

export const schema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers,
});

const subManager = new SubscriptionManager({
  schema,
  pubsub,
});

// addMockFunctionsToSchema({ schema, preserveResolvers: true });

export const subscriptionManager = subManager;
