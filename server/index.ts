// Bootstrap things one step at a time with promises;
import init from "./bootstrap/init";
import express from "./bootstrap/express";
import apollo from "./bootstrap/apollo";
import broadcast from "./bootstrap/broadcast";
import clientServer from "./bootstrap/client-server";
import postMigration from "./bootstrap/postmigration";
import cleanUp from "./bootstrap/cleanup";
import App from "./app";

Promise.resolve()
  .then(() => init())
  .then(() => App.init())
  .then(() => broadcast(App.port))
  .then(() => express())
  .then(server => clientServer(server))
  .then(server => apollo(server, App.port, App.httpOnly, App.certLocations))
  .then(() => postMigration())
  .then(() => cleanUp())
  .catch(err => console.error("Error:", err));
