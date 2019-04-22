import App from "../app";
import { gql } from "apollo-server-express";
import GraphQLJSON from "graphql-type-json";

// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  scalar JSON
  extend type Mutation {
    snapshot: String
    test(key: String): String
  }
`;

const resolver = {
  JSON: GraphQLJSON,
  Mutation: {
    snapshot() {
      App.snapshot(true);
    },
    test(root, args, context) {
      App.test(args);
      return "";
    }
  }
};

export default { schema, resolver };
