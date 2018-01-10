import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const LibraryQueries = {
  libraryEntries(rootValue, { simulatorId, type }) {
    if (type) {
      return App.libraryDatabase.filter(
        s => s.simulatorId === simulatorId && s.type === type
      );
    }
    return App.libraryDatabase.filter(s => s.simulatorId === simulatorId);
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
  }
};

export const LibrarySubscriptions = {
  libraryEntriesUpdate: {
    resolve(rootValue, { simulatorId, type }) {
      if (type) {
        return rootValue.filter(
          s => s.simulatorId === simulatorId && s.type === type
        );
      }
      return rootValue.filter(s => s.simulatorId === simulatorId);
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
