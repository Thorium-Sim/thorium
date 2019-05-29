import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import vanity from "./vanity";
import http from "http";
import ipaddress from "../helpers/ipaddress";
import { typeDefs, resolvers } from "../data";
import chalk from "chalk";
// Load some other stuff
import "../events";
import "../analytics";
import "../processes";
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});
export default (app, GRAPHQL_PORT, CLIENT_PORT) => {
  const graphqlOptions = {
    schema,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    engine: {
      apiKey: "service:Thorium:yZHa-qq7-_kVSpmsc9Ka1A"
    },
    tracing: process.env.NODE_ENV !== "production",
    introspection: true,
    playground: true,
    uploads: false,
    context: ({ req }) => ({ clientId: req && req.headers.clientid })
  };
  const apollo = new ApolloServer(graphqlOptions);
  apollo.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  apollo.installSubscriptionHandlers(httpServer);

  vanity();

  app.on("error", err => {
    if (err.code === "EADDRINUSE") {
      console.log(
        chalk.redBright(
          "There is already a version of Thorium running on this computer. Shutting down..."
        )
      );
      process.exit(0);
    }
  });

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
