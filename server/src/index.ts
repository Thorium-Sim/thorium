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
  .then(() => broadcast(App.port, App.httpOnly))
  .then(() => express())
  .then(server => clientServer(server))
  .then(server => apollo(server, App.port, App.httpOnly, App.setMutations))
  .then(() => postMigration())
  .then(() => cleanUp())
  .catch(err => console.error("Error:", err));

// If --expose-gc flag is set, handle garbage collection
// const interval = setInterval(() => {
//   try {
//     if (global.gc) {
//       global.gc();
//     }
//   } catch (e) {
//     // Do nothing, no need to worry about manual garbage collection
//     clearInterval(interval);
//   }
// }, 30 * 1000);
