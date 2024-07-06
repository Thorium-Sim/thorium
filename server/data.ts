import {gql} from "graphql-tag";
import merge from "./helpers/merge.js";
import * as schema from "./typeDefs/index";

const MainSchema = gql`
  # A type for all of the system-wide settings.

  type Query {
    # Types cannot be empty. Since we extend this type elsewhere,
    # we must add something to this type here.
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

// This resolver object can be extended if properties are added

// to the Query and Mutation types above.
const MainResolver = {};
export const typeDefs = Object.values(schema).reduce(
  (p, n) => p.concat(n.schema),
  [MainSchema],
);
export const resolvers = merge(
  MainResolver,
  ...Object.values(schema).map(({resolver}) => resolver),
);
