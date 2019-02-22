import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  extend type Query {
    _template: String
  }
  extend type Mutation {
    _template: String
  }
  extend type Subscription {
    templateUpdate(simulatorId: ID): String
  }
`;

// We define all of the resolvers necessary for
// the functionality in this file. These will be
// deep merged with the other resolvers.
const resolver = {
  Query: {},
  Mutation: mutationHelper(schema),
  Subscription: {
    templateUpdate: {
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
