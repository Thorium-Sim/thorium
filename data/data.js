import schemaString from './schema';
import resolvers from './resolvers';
import { SubscriptionManager } from 'graphql-subscriptions';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { pubsub } from '../helpers/subscriptionManager';

export const schema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers,
});

const subManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    shieldRaised: (options, args) => ({
      shieldRaised: {
        filter() {
          console.log(options, args);
          return true;
        },
      },
    }),
    clients: (options, args) => ({
      clients: {
        filter: () => true,
      },
    }),
  },
});



// addMockFunctionsToSchema({ schema, preserveResolvers: true });

export const subscriptionManager = subManager;


