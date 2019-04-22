import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type CoreLayout {
    id: ID
    name: String
    config: String
  }
  input CoreLayoutInput {
    id: ID
    name: String
    config: String
  }
  extend type Query {
    coreLayouts(name: String): [CoreLayout]
  }
  extend type Mutation {
    updateCoreLayout(layout: CoreLayoutInput): String
    addCoreLayout(layout: CoreLayoutInput): String
    removeCoreLayout(id: ID): String
    reorderCoreLayouts(id: ID!, order: Int!): String
  }
  extend type Subscription {
    coreLayoutChange: [CoreLayout]
  }
`;

const resolver = {
  Query: {
    coreLayouts() {
      return App.coreLayouts.map((c, i) => ({ ...c, order: i }));
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    coreLayoutChange: {
      resolve(rootValue) {
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("coreLayoutChange"),
        rootValue => {
          return !!(rootValue && rootValue.length);
        }
      )
    }
  }
};

export default { schema, resolver };
