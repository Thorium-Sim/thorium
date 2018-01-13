import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const LibraryQueries = {
  libraryEntries(rootValue, { simulatorId, type, all }) {
    let returnValue = App.libraryDatabase;
    if (type) {
      returnValue = returnValue.filter(s => s.type === type);
    }
    if (simulatorId) {
      returnValue = returnValue.filter(
        s => s.simulatorId === simulatorId || (all && !s.simulatorId)
      );
    }
    return returnValue;
  }
};

export const LibraryMutations = {
  addLibraryEntry(rootValue, args, context) {
    App.handleEvent(args, "addLibraryEntry", context);
  },
  updateLibraryEntry(rootValue, args, context) {
    App.handleEvent(args, "updateLibraryEntry", context);
  },
  removeLibraryEntry(rootValue, args, context) {
    App.handleEvent(args, "removeLibraryEntry", context);
  },
  importLibraryEntry(rootValue, args, context) {
    App.handleEvent(args, "importLibraryEntry", context);
  }
};

export const LibrarySubscriptions = {
  libraryEntriesUpdate: {
    resolve(rootValue, { simulatorId, type, all }) {
      let returnValue = rootValue;
      if (type) {
        returnValue = returnValue.filter(s => s.type === type);
      }
      if (simulatorId) {
        returnValue = returnValue.filter(
          s => s.simulatorId === simulatorId || (all && !s.simulatorId)
        );
      }
      return returnValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("libraryEntriesUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};

export const LibraryTypes = {
  LibraryEntry: {
    seeAlso(entry) {
      return entry.seeAlso.map(s => App.libraryDatabase.find(l => l.id === s));
    }
  }
};
