import {gql} from "apollo-server-express";
import codegen from "codegen.macro";
import merge from "./helpers/merge.js";
// These codegen blocks dynamically import all of the tyepdef files
// from the typeDef folder.
codegen`
const fs = require('fs')
const path = require("path");
const files = fs
  .readdirSync(path.resolve(__dirname + "/typeDefs"))
  .filter(f => f[0] !== "_");

function mapFiles(f) {
  return "import " + f.replace(".js", "") + ' from "./typeDefs/' + f + '"';
}
module.exports = files.map(mapFiles).join("\\n");
`;

let schema = {};

codegen`
const fs = require('fs')
const path = require("path");
const files = fs
  .readdirSync(path.resolve(__dirname + "/typeDefs"))
  .filter(f => f[0] !== "_");
module.exports = files.map(f => 'schema.' + f.replace(".js", "") + ' = ' + f.replace(".js", ";")).join("\\n");
  `;

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
