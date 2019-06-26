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
  pubsub.publish("libraryEntriesUpdate", App.libraryDatabase);
});
App.on("updateLibraryEntry", ({ entry }) => {
  const lib = App.libraryDatabase.find(l => l.id === entry.id);
  lib.update(entry);
  pubsub.publish("libraryEntriesUpdate", App.libraryDatabase);
});
App.on("removeLibraryEntry", ({ entry, slug, simulatorId }) => {
  App.libraryDatabase = App.libraryDatabase.filter(l => {
    if (l.id === entry) return false;
    if (l.slug === slug && l.simulatorId === simulatorId) return false;
    return true;
  });
  pubsub.publish("libraryEntriesUpdate", App.libraryDatabase);
});
App.on("importLibraryEntry", ({ simulatorId, entries }) => {
  try {
    JSON.parse(entries).forEach(entry => {
      entry.simulatorId = simulatorId;
      const lib = App.libraryDatabase.find(
        l => l.slug === entry.slug && l.simulatorId === entry.simulatorId
      );
      if (lib) {
        lib.update(entry);
      } else {
        App.libraryDatabase.push(new Classes.Library(entry));
      }
    });
  } catch (err) {
    throw new Error("Error reading JSON file.");
  }
  pubsub.publish("libraryEntriesUpdate", App.libraryDatabase);
});
