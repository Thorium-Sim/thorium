import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type LibraryEntry {
    id: ID
    simulatorId: ID
    title: String
    body: String
    image: String
    type: String
    categories: [String]
    seeAlso: [LibraryEntry]
  }
  type LibraryCategory {
    name: String
    entries: [LibraryEntry]
  }

  input LibraryInput {
    id: ID
    simulatorId: ID
    title: String
    body: String
    image: String
    type: String
    categories: [String]
    seeAlso: [ID]
  }
  extend type Query {
    libraryEntries(simulatorId: ID, type: String, all: Boolean): [LibraryEntry]
  }
  extend type Mutation {
    """
    Macro: Library: Add Entry
    """
    addLibraryEntry(entry: LibraryInput!): String
    updateLibraryEntry(entry: LibraryInput!): String

    """
    Macro: Library: Remove Entry
    """
    removeLibraryEntry(entry: ID, slug: String): String
    importLibraryEntry(
      simulatorId: ID!
      # JSON String. Should be computed from an existing library
      entries: String!
    ): String
  }
  extend type Subscription {
    libraryEntriesUpdate(
      simulatorId: ID
      type: String
      all: Boolean
    ): [LibraryEntry]
  }
`;

const resolver = {
  LibraryEntry: {
    seeAlso(entry) {
      return entry.seeAlso.map(s => App.libraryDatabase.find(l => l.id === s));
    }
  },
  Query: {
    libraryEntries(rootValue, { simulatorId, type, all }) {
      let returnValue = App.libraryDatabase;
      if (type) {
        returnValue = returnValue.filter(
          s => s.type === type || s.type === "general"
        );
      }
      if (simulatorId) {
        returnValue = returnValue.filter(
          s => s.simulatorId === simulatorId || (all && !s.simulatorId)
        );
      }
      return returnValue;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    libraryEntriesUpdate: {
      resolve(rootValue, { simulatorId, type, all }) {
        let returnValue = rootValue;
        if (type) {
          returnValue = returnValue.filter(
            s => s.type === type || s.type === "general"
          );
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
  }
};

export default { schema, resolver };
