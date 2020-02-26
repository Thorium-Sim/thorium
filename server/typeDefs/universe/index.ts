import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../../helpers/subscriptionManager";
import uuid from "uuid";

const mutationHelper = require("../../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  enum OperationsEnum {
    add
    remove
    replace
  }
  interface Patch {
    op: OperationsEnum
    path: [JSON]
    value: JSON
  }
  type EntityPatch implements Patch {
    op: OperationsEnum
    path: [JSON]
    value: JSON
    # To properly determine what patches to send
    # down and what to filter out. This will always
    # be null and is only used to know how to filter
    # the patches
    values: Entity
  }
  type Entity {
    id: ID!
  }
  extend type Query {
    universeEntity(id: ID!): Entity
    universeEntities: [Entity]
  }
  # extend type Mutation {
  #   _template: String
  # }
  extend type Subscription {
    entity(id: ID): [EntityPatch]
    entities: [EntityPatch]
  }
`;

const resolver = {
  Query: {},
  // Mutation: mutationHelper(schema),
  // Subscription: {
  //   _templateUpdate: {
  //     resolve(rootQuery) {},
  //     subscribe: withFilter(
  //       (rootValue, args) => {
  //         const id = uuid.v4();
  //         process.nextTick(() => {
  //           const templateData = [];
  //           pubsub.publish("templateUpdate", templateData);
  //         });
  //         return pubsub.asyncIterator([id, "templateUpdate"]);
  //       },
  //       (rootValue, args) => {
  //         return true;
  //       },
  //     ),
  //   },
  // },
};

export default {schema, resolver};
