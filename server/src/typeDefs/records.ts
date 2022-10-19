import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import {RecordSnippet} from "../classes";
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
    visible: Boolean
    launched: Boolean
    records: [RecordEntry]
    templateRecords: [RecordEntry]
  }
  enum RecordSnippetType {
    normal
    buoy
    external
  }
  extend type Query {
    recordSnippets(simulatorId: ID!, visible: Boolean): [RecordSnippet]
    recordTemplates: [RecordSnippet]
  }
  extend type Mutation {
    """
    Macro: Records: Create Ship Record
    """
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

    """
    Macro: Records: Generate Records Snippet
    """
    recordsGenerateRecords(
      simulatorId: ID!
      name: String!
      count: Int
      visible: Boolean
    ): RecordSnippet

    """
    Macro: Records: Add Record to Snippet
    """
    recordsCreateOnSnippet(
      simulatorId: ID!
      snippetId: ID
      snippetName: String
      contents: String!
      timestamp: String
      category: String = "manual"
    ): RecordSnippet

    recordsShowSnippet(simulatorId: ID!, snippetId: ID!): RecordSnippet
    recordsHideSnippet(simulatorId: ID!, snippetId: ID!): RecordSnippet

    recordTemplateCreateSnippet(name: String!): String
    # With record templates, when the template is instantiated during a mission, the time of instantiation
    # will replace the most recent record timestamp in the snippet. The rest of the snippets will be offset
    # from that time, giving the illusion that what happened in the timestamp was recent.
    recordTemplateAddToSnippet(
      snippetId: ID!
      contents: String!
      timestamp: String
      category: String = "manual"
      modified: Boolean
    ): String
    recordTemplateDeleteSnippet(snippetId: ID!): String
    recordTemplateRename(snippetId: ID!, name: String!): String
    recordTemplateUpdateRecord(
      snippetId: ID!
      recordId: ID
      contents: String
      timestamp: String
      category: String = "manual"
      modified: Boolean
    ): String
    recordTemplateRemoveFromSnippet(snippetId: ID!, recordId: ID!): String
  }
  extend type Subscription {
    recordSnippetsUpdate(simulatorId: ID, visible: Boolean): [RecordSnippet]
    recordTemplatesUpdate: [RecordSnippet]
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
    },
  },
  Query: {
    recordSnippets(_rootQuery, {simulatorId, visible}) {
      const sim = App.simulators.find(s => s.id === simulatorId);
      if (!sim) return [];
      const currentSnippet = new RecordSnippet({
        id: `current-${simulatorId}`,
        simulatorId: sim.id,
        name: "All Records",
        type: "normal",
        visible: true,
        records: sim.records.filter(r => r.snippetId === null).map(r => r.id),
      });
      return sim.recordSnippets
        .concat(currentSnippet)
        .filter(c => (visible ? true : c.visible));
    },
    recordTemplates() {
      return App.recordTemplates;
    },
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    recordSnippetsUpdate: {
      resolve(simulator, {visible}) {
        const currentSnippet = {
          id: `current-${simulator.id}`,
          simulatorId: simulator.id,
          name: "All Records",
          type: "normal",
          visible: true,
          records: simulator.records
            .filter(r => r.snippetId === null)
            .map(r => r.id),
        };
        return simulator.recordSnippets
          .concat(currentSnippet)
          .filter(c => (visible ? true : c.visible));
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("recordSnippetsUpdate"),
        (rootValue, {simulatorId}) => {
          return rootValue.id === simulatorId;
        },
      ),
    },
    recordTemplatesUpdate: {
      resolve() {
        return App.recordTemplates;
      },
      subscribe: () => pubsub.asyncIterator("recordTemplatesUpdate"),
    },
  },
};

export default {schema, resolver};
