import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../../helpers/subscriptionManager";
import uuid from "uuid";
import App from "../../app";
import filterPatches, {handlePatches} from "../../helpers/filterPatches";
import {Entity} from "../../classes";
import produce from "immer";

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
    values: [Entity!]
  }
  type Entity {
    id: ID!
  }
  extend type Query {
    entity(id: ID!): Entity
    entities(flightId: ID!): [Entity]!
  }
  extend type Mutation {
    entityCreate(flightId: ID!): Entity!
    entityRemove(id: [ID!]!): String
  }
  extend type Subscription {
    entity(id: ID): [EntityPatch]
    entities(flightId: ID!): [EntitiesPatch]
  }
`;

const resolver = {
  Query: {},
  Mutation: {
    entityCreate(rootQuery, {flightId}, context) {
      const entity = new Entity({flightId});
      context.entityId = entity.id;
      App.entities = produce(
        App.entities,
        draft => {
          draft.push(entity);
        },
        handlePatches(context, "entities", flightId, "flightId"),
      );
      return entity;
    },
    entityRemove(rootQuery, {id: idList}, context) {
      const entities = App.entities.filter(e => idList.includes(e.id));
      const flightId = entities[0].flightId;
      App.entities = produce(
        App.entities,
        draft => {
          entities.forEach(({id}) => {
            draft.splice(
              draft.findIndex(e => e.id === id),
              1,
            );
          });
        },
        handlePatches(context, "entities", flightId, "flightId", "entity"),
      );
    },
  },
  Subscription: {
    entity: {
      resolve(rootQuery, _args, _context, info) {
        if (rootQuery.patches.length === 1 && rootQuery.patches[0]?.values)
          return rootQuery.patches;
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
        if (rootQuery.patches.length === 1 && rootQuery.patches[0]?.values)
          return rootQuery.patches;
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
