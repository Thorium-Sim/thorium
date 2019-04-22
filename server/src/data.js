import { gql } from "apollo-server-express";
import merge from "lodash/merge";
import fs from "fs";
import path from "path";
const schema = fs
  .readdirSync(path.resolve(__dirname + "/typeDefs"))
  .filter(f => f[0] !== "_")
  .map(f => require(path.resolve(`${__dirname}/typeDefs/${f}`)).default);

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
  [MainSchema]
);
export const resolvers = merge(
  MainResolver,
  ...Object.values(schema).map(({ resolver }) => resolver)
);
