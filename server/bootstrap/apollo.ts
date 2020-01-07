import {
  ApolloServer,
  makeExecutableSchema,
  ApolloServerExpressConfig,
} from "apollo-server-express";
import vanity from "./vanity";
import https from "https";
import http from "http";
import path from "path";
import fs from "fs";
import ipAddress from "../helpers/ipaddress";
import {typeDefs, resolvers} from "../data";
import chalk from "chalk";
// Load some other stuff
import "../events";
import "../processes";
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

// TODO: Change app to the express type
export default (app: any, SERVER_PORT: number) => {
  const graphqlOptions: ApolloServerExpressConfig = {
    schema,
    engine: {
      apiKey: "service:Thorium:yZHa-qq7-_kVSpmsc9Ka1A",
    },
    tracing: process.env.NODE_ENV !== "production",
    introspection: true,
    playground: true,
    uploads: false,
    context: ({req, connection}) => ({
      clientId: req?.headers.clientid || connection?.context.clientId,
      core: req?.headers.core,
    }),
  };
  const apollo = new ApolloServer(graphqlOptions);
  apollo.applyMiddleware({app});

  let httpServer = http.createServer(app);
  if (process.env.NODE_ENV === "production") {
    httpServer = https.createServer(
      {
        key: fs.readFileSync(path.resolve(`${__dirname}/../server.key`)),
        cert: fs.readFileSync(path.resolve(`${__dirname}/../server.cert`)),
      },
      app,
    );
  }
  apollo.installSubscriptionHandlers(httpServer);

  vanity();

  app.on("error", (err: {code: string}) => {
    if (err.code === "EADDRINUSE") {
      console.log(
        chalk.redBright(
          "There is already a version of Thorium running on this computer. Shutting down...",
        ),
      );
      process.exit(0);
    }
  });

  httpServer.listen(SERVER_PORT, () => {
    console.log(
      `
Client Server is now running on http://${ipAddress}:${SERVER_PORT}/client
Access the Flight Director on http://${ipAddress}:${SERVER_PORT}
GraphQL Server is now running on http://${ipAddress}:${SERVER_PORT}/graphql
🚀 Subscriptions ready at ws://${ipAddress}:${SERVER_PORT}${apollo.subscriptionsPath}`,
    );
  });
};
