import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Template {
    id: ID
  }
  extend type Query {
    _template(simulatorId: ID!): Template
  }
  extend type Mutation {
    _template: String
  }
  extend type Subscription {
    _templateUpdate(simulatorId: ID): Template
  }
`;

const resolver = {
  Query: {},
  Mutation: mutationHelper(schema),
  Subscription: {
    _templateUpdate: {
      resolve(rootQuery) {},
      subscribe: withFilter(
        () => pubsub.asyncIterator("templateUpdate"),
        (rootValue, args) => {
          return true;
        }
      )
    }
  }
};

export default { schema, resolver };
