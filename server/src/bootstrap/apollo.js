import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import vanity from "./vanity";
import http from "http";
import ipaddress from "../helpers/ipaddress";
import { typeDefs, resolvers } from "../data";

// Load some other stuff
import "../events";
import "../analytics";
import "../processes";

export default (app, GRAPHQL_PORT, CLIENT_PORT) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });
  const graphqlOptions = {
    schema,
    engine: process.env.ENGINE_API_KEY,
    tracing: process.env.NODE_ENV !== "production",
    uploads: false,
    context: ({ req }) => ({ clientId: req && req.headers.clientid })
  };
  const apollo = new ApolloServer(graphqlOptions);
  apollo.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  apollo.installSubscriptionHandlers(httpServer);

  vanity();
  httpServer.listen(GRAPHQL_PORT, () => {
    console.log(
      `
Client Server is now running on http://${ipaddress}:${CLIENT_PORT}/client
Access the Flight Director on http://${ipaddress}:${CLIENT_PORT}
GraphQL Server is now running on http://${ipaddress}:${GRAPHQL_PORT}/graphql
🚀 Subscriptions ready at ws://${ipaddress}:${GRAPHQL_PORT}${
        server.subscriptionsPath
      }`
    );
  });
};

const server = new ApolloServer({ typeDefs });
