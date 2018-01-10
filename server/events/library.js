import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

App.on("addLibraryEntry", ({ entry, simulatorId }) => {
  if (simulatorId) {
    entry.simulatorId = simulatorId;
  }
  // Check for an existing one to update
  const lib = App.libraryDatabase.find(
    l => l.slug === entry.slug && l.simulatorId === entry.simulatorId
  );
  if (lib) {
    lib.update(entry);
  } else {
    App.libraryDatabase.push(new Classes.Library(entry));
  }
  pubsub.publish("libraryEntriesUpdate", app.libraryDatabase);
});
App.on("updateLibraryEntry", ({ entry }) => {
  const lib = App.libraryDatabase.find(l => l.id === entry.id);
  lib.update(entry);
  pubsub.publish("libraryEntriesUpdate", app.libraryDatabase);
});
App.on("removeLibraryEntry", ({ entry }) => {
  App.libraryDatabase = App.libraryDatabase.filter(l => l.id !== entry);
  pubsub.publish("libraryEntriesUpdate", app.libraryDatabase);
});
