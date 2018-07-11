// Bootstrap things one step at a time with promises;
import "babel-polyfill";
import migrate from "./bootstrap/migration";
import init from "./bootstrap/init";
import express from "./bootstrap/express";
import graphql from "./bootstrap/graphql";
import websockets from "./bootstrap/websockets";
import broadcast from "./bootstrap/broadcast";
import clientServer from "./bootstrap/client-server.js";
import postMigration from "./bootstrap/postmigration";
import App from "./app";

const CLIENT_PORT = process.env.NODE_ENV === "production" ? 1337 : 3000;
const GRAPHQL_PORT = CLIENT_PORT + 1;
const WS_PORT = CLIENT_PORT + 2;
export const port = CLIENT_PORT;
Promise.resolve()
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
  .catch(err => console.error(err));
