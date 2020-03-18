import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../../helpers/subscriptionManager";
import App from "../../app";
import {
  handlePatches,
  patchResolve,
  handleInitialSubResponse,
} from "../../helpers/filterPatches";
import {Entity} from "../../classes";
import produce from "immer";
import {Template} from "../../classes/universe/components";

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
    entityCreate(flightId: ID!, template: Boolean): Entity!
    entityRemove(id: [ID!]!): String
  }
  extend type Subscription {
    entity(id: ID): [EntityPatch]
    entities(flightId: ID!): [EntitiesPatch]
    parentStages(flightId: ID!): [EntitiesPatch]
    stageChildren(parentId: ID!): [EntitiesPatch]
  }
`;

const resolver = {
  Query: {},
  Mutation: {
    entityCreate(rootQuery, {flightId, template}, context) {
      const entity = new Entity({flightId});
      if (template) {
        entity.template = new Template({category: "generic"});
      }
      context.entityId = entity.id;
      App.entities = produce(
        App.entities,
        draft => {
          draft.push(entity);
        },
        handlePatches({
          context,
          publishKeys: ["entities", "templateEntities"],
          subFilterValues: {flightId, template},
        }),
      );
      return entity;
    },
    entityRemove(rootQuery, {id: idList}, context) {
      const entities = App.entities.filter(e => idList.includes(e.id));
      const flightId = entities[0].flightId;
      const template = Boolean(entities.find(t => t.template));
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
        handlePatches({
          context,
          publishKeys: ["entities", "templateEntities"],
          subFilterValues: {flightId, template},
        }),
      );
    },
  },
  Subscription: {
    entity: {
      resolve: patchResolve,
      subscribe: withFilter(
        (rootValue, args) => {
          const id = handleInitialSubResponse(id => {
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
      resolve: patchResolve,
      subscribe: withFilter(
        (rootValue, args) => {
          const id = handleInitialSubResponse(id => {
            const entities = App.entities.filter(
              e => e.flightId === args.flightId && !e.template,
            );
            pubsub.publish(id, {
              flightId: args.flightId,
              patches: [{values: entities}],
            });
          });
          return pubsub.asyncIterator([id, "entities"]);
        },
        (rootValue, args) => {
          return rootValue.flightId === args.flightId;
        },
      ),
    },
    parentStages: {
      resolve: patchResolve,
      subscribe: withFilter(
        (rootValue, args) => {
          const id = handleInitialSubResponse(id => {
            const entities = App.entities.filter(
              e => e.flightId === args.flightId && !e.stageChild && !e.template,
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
    stageChildren: {
      resolve: patchResolve,
      subscribe: withFilter(
        (rootValue, args) => {
          const id = handleInitialSubResponse(id => {
            const entities = App.entities.filter(
              e => e?.stageChild?.parentId === args.parentId,
            );
            pubsub.publish(id, {
              parentIds: [args.parentId],
              patches: [{values: entities}],
            });
          });
          return pubsub.asyncIterator([id, "entities"]);
        },
        (rootValue, args) => {
          return rootValue.parentIds.includes(args.parentId);
        },
      ),
    },
  },
};

export default {schema, resolver};
