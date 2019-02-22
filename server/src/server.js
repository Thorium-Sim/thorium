// Bootstrap things one step at a time with promises;
import "babel-polyfill";
import log from "./bootstrap/logs";
import migrate from "./bootstrap/migration";
import init from "./bootstrap/init";
import express from "./bootstrap/express";
import apollo from "./bootstrap/apollo";
import broadcast from "./bootstrap/broadcast";
import clientServer from "./bootstrap/client-server.js";
import postMigration from "./bootstrap/postmigration";
import cleanUp from "./bootstrap/cleanup";
import App from "./app";

const CLIENT_PORT = process.env.NODE_ENV === "production" ? 1337 : 3000;
const GRAPHQL_PORT = CLIENT_PORT + 1;
export const port = CLIENT_PORT;
Promise.resolve()
  .then(() => log())
  .then(() => migrate())
  .then(() => init())
  .then(() => broadcast(CLIENT_PORT))
  .then(() => clientServer(CLIENT_PORT))
  .then(() => express())
  .then(server => apollo(server, GRAPHQL_PORT, CLIENT_PORT))
  .then(() => {
    App.init();
  })
  .then(() => postMigration())
  .then(() => cleanUp())
  .catch(err => console.error(err));
