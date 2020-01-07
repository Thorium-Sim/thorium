// Bootstrap things one step at a time with promises;
import init from "./bootstrap/init";
import express from "./bootstrap/express";
import apollo from "./bootstrap/apollo";
import broadcast from "./bootstrap/broadcast";
import clientServer from "./bootstrap/client-server";
import postMigration from "./bootstrap/postmigration";
import cleanUp from "./bootstrap/cleanup";
import App from "./app";

const SERVER_PORT = process.env.NODE_ENV === "production" ? 443 : 3001;
export const port = SERVER_PORT;
Promise.resolve()
  .then(() => init())
  .then(() => broadcast(SERVER_PORT))
  .then(() => express())
  .then(server => clientServer(server))
  .then(server => apollo(server, SERVER_PORT))
  .then(() => {
    App.init();
  })
  .then(() => postMigration())
  .then(() => cleanUp())
  .catch(err => console.error("Error:", err));
