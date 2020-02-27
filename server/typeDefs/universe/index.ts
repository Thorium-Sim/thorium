import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../../helpers/subscriptionManager";
import uuid from "uuid";
import App from "../../app";
import filterPatches from "../../helpers/filterPatches";
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
  type EntitiesPatch implements Patch {
    op: OperationsEnum
    path: [JSON]
    value: JSON
    # To properly determine what patches to send
    # down and what to filter out. This will always
    # be null except for the initial subscription
    # and is only used to know how to filter the patches
    values: [Entity]
  }
  type Entity {
    id: ID!
  }
  extend type Query {
    entity(id: ID!): Entity
    entities(flightId: ID!): [Entity]
  }
  extend type Mutation {
    entityCreate(flightId: ID!): Entity
    entityRemove(id: ID!): Entity
  }
  extend type Subscription {
    entity(id: ID): [EntityPatch]
    entities(flightId: ID!): [EntitiesPatch]
  }
`;

const Mutation = {};

const resolver = {
  Query: {},
  Mutation,
  Subscription: {
    entity: {
      resolve(rootQuery, _args, _context, info) {
        return filterPatches(rootQuery.patches, info);
      },
      subscribe: withFilter(
        (rootValue, args) => {
          const id = uuid.v4();
          process.nextTick(() => {
            const entity = App.entities.find(e => e.id === args.id);
            pubsub.publish(id, {id: entity.id, patches: [{values: entity}]});
          });
          return pubsub.asyncIterator([id, "entity"]);
        },
        (rootValue, args) => {
          return rootValue.id === args.id;
        },
      ),
    },
    entities: {
      resolve(rootQuery, _args, _context, info) {
        return filterPatches(rootQuery.patches, info);
      },
      subscribe: withFilter(
        (rootValue, args) => {
          const id = uuid.v4();
          process.nextTick(() => {
            const entities = App.entities.filter(
              e => e.flightId === args.flightId,
            );
            pubsub.publish(id, {
              flightId: args.flightId,
              patches: [{values: entities}],
            });
          });
          return pubsub.asyncIterator([id, "entities"]);
        },
        (rootValue, args) => {
          // Add filters once they get added to the schema
          return rootValue.flightId === args.flightId;
        },
      ),
    },
  },
};

export default {schema, resolver};
