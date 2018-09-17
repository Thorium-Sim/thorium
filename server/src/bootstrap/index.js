import "babel-polyfill";
import log from "./logs";
import migrate from "./migration";
import init from "./init";
import express from "./express";
import graphql from "./graphql";
import websockets from "./websockets";
import broadcast from "./broadcast";
import clientServer from "./client-server.js";
import postMigration from "./postmigration";
import cleanUp from "./cleanup";
import App from "../app";

const CLIENT_PORT = process.env.NODE_ENV === "production" ? 1337 : 3000;
const GRAPHQL_PORT = CLIENT_PORT + 1;
const WS_PORT = CLIENT_PORT + 2;

// Bootstrap things one step at a time with promises;
export default function bootstrap() {
  return Promise.resolve()
    .then(() => log())
    .then(() => migrate())
    .then(() => init())
    .then(() => broadcast(CLIENT_PORT))
    .then(() => clientServer(CLIENT_PORT))
    .then(() => express())
    .then(server =>
      websockets(server, WS_PORT).then(() =>
        graphql(server, GRAPHQL_PORT, CLIENT_PORT)
      )
    )
    .then(() => {
      App.init();
    })
    .then(() => postMigration())
    .then(() => cleanUp())
    .catch(err => console.error(err));
}
