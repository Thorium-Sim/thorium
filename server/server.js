import "./helpers/init";
//Run init before anything else. Make sure all our files are in place before they are needed by other things
import express from "express";
import path from "path";
import fs from "fs";
import { createServer } from "http";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import multer from "multer";
import cors from "cors";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { printSchema } from "graphql/utilities/schemaPrinter";
import graphqlExpressUpload from "graphql-server-express-upload";
import schema from "./data";
import chalk from "chalk";
import exportMission from "./imports/missions/export";
import importMission from "./imports/missions/import";
import exportSimulator from "./imports/simulators/export";
import importSimulator from "./imports/simulators/import";
import importAssets from "./imports/asset/import";
import vanity from "./helpers/vanity";
import broadcast from "./helpers/broadcast";
import ipaddress from "./helpers/ipaddress";
import clientServer from "./helpers/client-server.js";
import { uploadAsset } from "./resolvers/assets";
import "./events";
import "./processes";

const CLIENT_PORT =
  process.env.NODE_ENV === "production"
    ? 1337 //Math.round(Math.random() * (9999 - 1024)) + 1024
    : 3000;
const GRAPHQL_PORT = CLIENT_PORT + 1;
const WS_PORT = CLIENT_PORT + 2;
export const port = CLIENT_PORT;

broadcast(CLIENT_PORT);
clientServer(CLIENT_PORT);

const GraphQLOptions = request => ({
  schema,
  context: { clientId: request.headers.clientid }
});

let appDir = "./";

const upload = multer({
  dest: appDir + "temp"
});

const options = {
  endpointURL: "/graphql" // URL for the GraphQL endpoint this instance of GraphiQL serves
};

export const websocketServer = createServer((req, response) => {
  response.writeHead(404);
  response.end();
});

export const graphQLServer = express();
graphQLServer.use(require("express-status-monitor")());
graphQLServer.use("*", cors());

graphQLServer.use("/schema", (req, res) => {
  res.set("Content-Type", "text/plain");
  res.send(printSchema(schema));
});

graphQLServer.use(
  "/graphql",
  graphqlExpressUpload({ endpointURL: "/graphql" }),
  bodyParser.json({ limit: "4mb" }),
  graphqlExpress(GraphQLOptions)
);

graphQLServer.post("/upload", upload.any(), async (req, res) => {
  uploadAsset({}, Object.assign({}, req.body, { files: req.files }), {});
  res.end(JSON.stringify("success!"));
});

graphQLServer.get("/exportMission/:missionId", (req, res) => {
  exportMission(req.params.missionId, res);
});

graphQLServer.get("/exportSimulator/:simId", (req, res) => {
  exportSimulator(req.params.simId, res);
});

graphQLServer.post("/importSimulator", upload.any(), async (req, res) => {
  if (req.files[0]) {
    importSimulator(req.files[0].path, () => {
      fs.unlink(req.files[0].path, err => {
        res.end("Error");
        if (err) throw new Error(err);
        res.end("Complete");
      });
    });
  }
});

graphQLServer.post("/importMission", upload.any(), async (req, res) => {
  if (req.files[0]) {
    importMission(req.files[0].path, () => {
      fs.unlink(req.files[0].path, err => {
        res.end("Error");
        if (err) throw new Error(err);
        res.end("Complete");
      });
    });
  }
});

graphQLServer.post("/importAssets", upload.any(), async (req, res) => {
  if (req.files[0]) {
    importAssets(req.files[0].path, () => {
      fs.unlink(req.files[0].path, err => {
        res.end("Error");
        if (err) throw new Error(err);
        res.end("Complete");
      });
    });
  }
});

graphQLServer.use("/graphiql", graphiqlExpress(options));
vanity();

export const graphQLserverInstance = graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `
Client Server is now running on http://${ipaddress}:${CLIENT_PORT}/client
Access the Flight Director on http://${ipaddress}:${CLIENT_PORT}
GraphQL Server is now running on http://${ipaddress}:${GRAPHQL_PORT}/graphql
Access GraphiQL developer tool on http://${ipaddress}:${GRAPHQL_PORT}/graphiql`
  )
);

if (!process.env.NODE_ENV) {
  graphQLServer.use("/assets/", express.static(path.resolve("./assets")));

  // If we're in production, the last thing we want is for the server to crash
  // Print all server errors, but don't terminate the process
  process.on("uncaughtException", err => {
    console.log(chalk.red(`Caught exception: ${err}\n`));
    console.log(err);
  });
}

export const websocketServerInstance = websocketServer.listen(WS_PORT, () => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: schema
    },
    {
      server: websocketServer,
      path: "/"
    }
  );
});
