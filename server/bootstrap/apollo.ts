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
import paths from "../helpers/paths";
import App from "../app";
// Load some other stuff
import "../events";
import "../processes";
import {FieldNode, getOperationRootType, printSchema} from "graphql";
import {getArgumentValues} from "graphql/execution/values";
import {getFieldDef} from "graphql/execution/execute";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});
if (process.env.NODE_ENV === "development" && !process.env.CI) {
  // Automatically generate the GraphQL schema and write it to file
  // but only in development.
  const schemaOutput = printSchema(schema);

  fs.writeFileSync("./src/schema.graphql", schemaOutput);
}

// TODO: Change app to the express type
function responseForOperation(requestContext) {
  // This plugin checks to see if a request
  // coming in is a mutation. If it is, it
  // hijacks the request and triggers the
  // event handler for that request in
  // /server/events. If the event handler doesn't
  // resolve (by calling the callback function cb)
  // in 500 milliseconds, it just returns.
  const {
    context,
    request: {variables},
    operation,
  } = requestContext;
  if (operation.operation !== "mutation") return null;
  const selection = operation.selectionSet.selections[0] as FieldNode;
  const opName = selection.name.value;
  const parentType = getOperationRootType(schema, operation);
  const fieldDef = getFieldDef(schema, parentType, opName);
  const args = getArgumentValues(
    fieldDef,
    operation.selectionSet.selections[0] as FieldNode,
    variables,
  );

  // Figure out the context of the action
  const {clientId} = context;
  const client = App.clients.find(c => c.id === clientId);
  // Handle any triggers before the event so we can capture data that
  // the event might remove
  const flight = App.flights.find(
    f =>
      f.id === (client && client.flightId) ||
      (args.simulatorId && f.simulators.includes(args.simulatorId)),
  );
  const simulator = App.simulators.find(
    s =>
      s.id === (client && client.simulatorId) ||
      (args.simulatorId && s.id === args.simulatorId),
  );
  // We really want to modify this read-only property
  // @ts-ignore ts(2540)
  requestContext.context = {
    ...context,
    flight: flight || context.flight,
    simulator: simulator || context.simulator,
    client,
    isMutation: true,
  };

  // If there is a direct mutation resolver, execute that.
  // This is now the preferred way to execute mutations
  if (resolvers.Mutation[opName]) {
    // The whole point of this is so we can still
    // trigger handle event, so lets do that.
    App.handleEvent(
      {
        ...args,
        cb: () => {},
      },
      opName,
      requestContext.context,
    );
    // Returning null means it executes
    // the built-in mutation resolver
    return null;
  }
  return new Promise<any>(resolve => {
    // Execute the old legacy event handler system.
    let timeout = null;
    App.handleEvent(
      {
        ...args,
        cb: (a: any) => {
          clearTimeout(timeout);
          resolve({data: {[opName]: a}});
        },
      },
      opName,
      requestContext.context,
    );
    timeout = setTimeout(() => { resolve({ error: "fail", data: {} }) }, 500);
  });
}

export default (
  app: express.Application,
  SERVER_PORT: number,
  httpOnly: boolean,
  setMutations: (r: {[key: string]: Function}) => void,
) => {
  // Apply the mutations to App.js so we don't get circular dependency issues
  setMutations(resolvers.Mutation);
  const graphqlOptions: ApolloServerExpressConfig = {
    schema,
    engine: {
      apiKey: "service:Thorium:yZHa-qq7-_kVSpmsc9Ka1A",
    },
    tracing: process.env.NODE_ENV !== "production",
    introspection: true,
    playground: true,
    uploads: false,
    plugins: [
      {
        requestDidStart() {
          return {
            responseForOperation,
          };
        },
      },
    ],
    context: ({req, connection}) => ({
      clientId: req?.headers.clientid || connection?.context.clientId,
      core: req?.headers.core,
    }),
  };
  const apollo = new ApolloServer(graphqlOptions);
  apollo.applyMiddleware({app});

  let httpServer: http.Server | https.Server = http.createServer(app);
  let isHttps = false;
  if (process.env.NODE_ENV === "production" && !httpOnly) {
    isHttps = true;

    // Be sure to default back to the built-in cert if the
    // actual cert doesn't exist
    let key, cert;
    if (fs.existsSync(`${paths.userData}/server.key`)) {
      key = fs.readFileSync(`${paths.userData}/server.key`, "utf8");
      cert = fs.readFileSync(`${paths.userData}/server.cert`, "utf8");
    } else {
      key = fs.readFileSync(path.resolve(`${__dirname}/../server.key`), "utf8");
      cert = fs.readFileSync(
        path.resolve(`${__dirname}/../server.cert`),
        "utf8",
      );
    }
    httpServer = https.createServer({key, cert}, app);

    // If the port is 443, start a server at 80 to redirect to 443
    if (SERVER_PORT === 443) {
      const insecureServer = http.createServer((req, res) => {
        const pathParts = url.parse(req.url);

        res.writeHead(302, {
          Location: `https://${req.headers.host}${pathParts.path}`,
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

  process.on("uncaughtException", function (err) {
    // String key because typescript is funky
    if (err["code"] === "EADDRINUSE") {
      console.error(
        chalk.redBright(
          "There is already a version of Thorium running on this computer. Changing port to 4444",
        ),
      );
      // Fallover to 4444 if someone is already using the specified ports on this computer
      httpServer.listen(4444, () => {
        console.info(serverMessage);
      });
    }
  });
  try {
    httpServer.listen(SERVER_PORT, () => {
      console.info(serverMessage);
    });
  } catch (err) {
    console.error("That didnt work...", err);
  }
};
