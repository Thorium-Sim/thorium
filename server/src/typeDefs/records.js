import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type RecordEntry {
    id: ID
    contents: String
    original: String
    timestamp: String
    category: String
    modified: Boolean
  }
  type RecordSnippet {
    id: ID
    simulatorId: ID
    sensorContactId: ID
    name: String
    type: RecordSnippetType
    launched: Boolean
    records: [RecordEntry]
  }
  enum RecordSnippetType {
    normal
    buoy
  }
  extend type Query {
    recordSnippets(simulatorId: ID!): [RecordSnippet]
  }
  extend type Mutation {
    recordsCreate(
      simulatorId: ID!
      contents: String!
      timestamp: String
      category: String = "manual"
    ): String
    recordsCreateSnippet(
      simulatorId: ID!
      recordIds: [ID!]!
      name: String!
      type: RecordSnippetType = normal
    ): String
    recordsAddToSnippet(
      simulatorId: ID!
      snippetId: ID!
      recordIds: [ID!]!
    ): String
    recordsRemoveFromSnippet(
      simulatorId: ID!
      snippetId: ID!
      recordId: ID!
    ): String
    recordsDeleteRecord(simulatorId: ID!, recordId: ID!): String
  }
  extend type Subscription {
    recordSnippetsUpdate(simulatorId: ID): [RecordSnippet]
  }
`;

const resolver = {
  RecordSnippet: {
    records(snippet) {
      const sim = App.simulators.find(s => s.id === snippet.simulatorId);
      if (!sim) return [];
      return snippet.records
        .map(id => sim.records.find(r => r.id === id))
        .filter(Boolean);
    }
  },
  Query: {
    recordSnippets(_rootQuery, { simulatorId }) {
      const sim = App.simulators.find(s => s.id === simulatorId);
      if (!sim) return [];
      const currentSnippet = {
        id: `current-${simulatorId}`,
        simulatorId: sim.id,
        name: "All Records",
        type: "normal",
        records: sim.records.map(r => r.id)
      };
      return sim.recordSnippets.concat(currentSnippet);
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    recordSnippetsUpdate: {
      resolve(simulator) {
        const currentSnippet = {
          id: `current-${simulator.id}`,
          simulatorId: simulator.id,
          name: "All Records",
          type: "normal",
          records: simulator.records.map(r => r.id)
        };
        return simulator.recordSnippets.concat(currentSnippet);
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("recordSnippetsUpdate"),
        (rootValue, args) => {
          return true;
        }
      )
    }
  }
};

export default { schema, resolver };
