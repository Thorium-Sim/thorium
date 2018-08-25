import { makeExecutableSchema } from "graphql-tools";
import schemaString from "./schema";
import resolvers from "./resolvers";

export default makeExecutableSchema({
  typeDefs: schemaString,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});
