// Bootstrap things one step at a time with promises;
import init from "./bootstrap/init";
import express from "./bootstrap/express";
import apollo from "./bootstrap/apollo";
import broadcast from "./bootstrap/broadcast";
import clientServer from "./bootstrap/client-server";
import postMigration from "./bootstrap/postmigration";
import cleanUp from "./bootstrap/cleanup";
import App from "./app";
import buildHTTPServer from "./init/buildHttpServer";
import path from "path";
import {rootPath} from "./newHelpers/appPaths";
import {buildDatabase} from "./init/buildDatabase";
import {startServer} from "./init/startServer";
import {liveQueryPlugin} from "@thorium/live-query/adapters/fastify-adapter";
import {router} from "./newHelpers/router";
import {createContext, createWSContext} from "./newHelpers/liveQuery";
import {pubsub} from "./newHelpers/pubsub";

async function main() {
  try {
    await init();
    App.init();
    await broadcast(App.port, App.httpOnly);
    const server = await express();
    await clientServer(server);
    await apollo(server, App.port, App.httpOnly, App.setMutations);
    // New Init
    const database = await buildDatabase();
    const app = await buildHTTPServer({
      staticRoot: path.join(rootPath, "public/"),
    });
    await app.register(liveQueryPlugin, {
      createContext: createContext as any,
      createWSContext: createWSContext as any,
      router,
      pubsub,
      extraContext: database,
    });
    await startServer(app);

    await postMigration();
    await cleanUp();
  } catch (err) {
    console.error("Error in startup:", err);
  }
}
main();
