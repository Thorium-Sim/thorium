import schemaString from './schema';
import resolvers from './resolvers';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { subscriptionManager as subManager, pubsub } from './subscriptionManager';

export const schema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers,
});

export const subscriptionManager = subManager;

// addMockFunctionsToSchema({ schema, preserveResolvers: true });



