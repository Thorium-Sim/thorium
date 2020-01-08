import {
  ApolloServer,
  makeExecutableSchema,
  ApolloServerExpressConfig,
} from "apollo-server-express";
import express from "express";
import vanity from "./vanity";
import https from "https";
import http from "http";
import path from "path";
import fs from "fs";
import ipAddress from "../helpers/ipaddress";
import {typeDefs, resolvers} from "../data";
import chalk from "chalk";
import url from "url";
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
export default (
  app: express.Application,
  SERVER_PORT: number,
  httpOnly: boolean,
  certLocations,
) => {
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
  let isHttps = false;
  if (process.env.NODE_ENV === "production" && !httpOnly) {
    isHttps = true;

    // Be sure to default back to the built-in cert if the
    // actual cert doesn't exist
    let key, cert;
    try {
      key = fs.readFileSync(
        certLocations?.key || path.resolve(`${__dirname}/../server.key`),
      );
      cert = fs.readFileSync(
        certLocations?.cert || path.resolve(`${__dirname}/../server.cert`),
      );
    } catch {
      key = fs.readFileSync(path.resolve(`${__dirname}/../server.key`));
      cert = fs.readFileSync(path.resolve(`${__dirname}/../server.cert`));
    }

    httpServer = https.createServer({key, cert}, app);

    // If the port is 443, start a server at 80 to redirect to 443
    if (SERVER_PORT === 443) {
      const insecureServer = http.createServer((req, res) => {
        const pathParts = url.parse(req.url);
        res.writeHead(302, {
          Location: `https://${pathParts.hostname}${pathParts.path}`,
        });
        res.end();
      });
      insecureServer.listen(80);
    }
  }
  apollo.installSubscriptionHandlers(httpServer);

  vanity();

  function printUrl({isWs = false} = {}) {
    return `${isWs ? "ws" : "http"}${isHttps ? "s" : ""}://${ipAddress}${
      (SERVER_PORT === 443 && isHttps) || (SERVER_PORT === 80 && !isHttps)
        ? ""
        : `:${SERVER_PORT}`
    }`;
  }

  const serverMessage = `
Client Server running on ${printUrl()}/client
Access the Flight Director on ${printUrl()}
GraphQL Server running on ${printUrl()}/graphql
🚀 Subscriptions ready at ${printUrl({isWs: true})}${apollo.subscriptionsPath}`;

  process.on("uncaughtException", function(err) {
    // String key because typescript is funky
    if (err["code"] === "EADDRINUSE") {
      console.log(
        chalk.redBright(
          "There is already a version of Thorium running on this computer. Changing port...",
        ),
      );
      // Fallover to 4444 if someone is already using the specified ports on this computer
      httpServer.listen(4444, () => {
        console.log(serverMessage);
      });
    }
  });
  try {
    httpServer.listen(SERVER_PORT, () => {
      console.log(serverMessage);
    });
  } catch (err) {
    console.log("That didnt work...", err);
  }
};
