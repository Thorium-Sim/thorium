import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../../helpers/subscriptionManager";
import App from "../../app";
import {handleInitialSubResponse} from "../../helpers/handleInitialSubResponse";
import {Entity} from "../../classes";
import produce from "immer";
import {Template} from "../../classes/universe/components";

// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Entity {
    id: ID!
    interval: Int
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
    entity(id: ID): Entity
    entities(flightId: ID!, template: Boolean): [Entity]
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
      App.entities = produce(App.entities, draft => {
        draft.push(entity);
      });
      pubsub.publish("entities", {
        flightId,
        entities: App.entities,
      });
      return entity;
    },
    entityRemove(rootQuery, {id: idList}, context) {
      const entities = App.entities.filter(e => idList.includes(e.id));
      const flightId = entities[0].flightId;
      const template = Boolean(entities.find(t => t.template));
      App.entities = produce(App.entities, draft => {
        entities.forEach(({id}) => {
          draft.splice(
            draft.findIndex(e => e.id === id),
            1,
          );
        });
      });
      pubsub.publish("entities", {
        flightId,
        template,
        entities: App.entities,
      });
    },
  },
  Subscription: {
    entity: {
      resolve(rootValue) {
        return rootValue;
      },
      subscribe: withFilter(
        (rootValue, args) => {
          const id = handleInitialSubResponse(id => {
            const entity = App.entities.find(e => e.id === args.id);
            pubsub.publish(id, entity);
          });
          return pubsub.asyncIterator([id, "entity"]);
        },
        (rootValue, args) => {
          return rootValue.id === args.id;
        },
      ),
    },
    entities: {
      resolve(rootValue: {entities: Entity[]}, {flightId, template}) {
        let entities = rootValue.entities.filter(e => {
          if (flightId && e.flightId !== flightId) return false;
          if (template === true && !e.template) return false;
          if (template === false && e.template) return false;
          return true;
        });
        return entities;
      },
      subscribe: withFilter(
        (rootValue, args) => {
          const id = handleInitialSubResponse(id => {
            pubsub.publish(id, {
              flightId: args.flightId,
              entities: App.entities,
            });
          });
          return pubsub.asyncIterator([id, "entities"]);
        },
        (rootValue, {flightId, template}) => {
          if (flightId && flightId !== rootValue.flightId) return false;
          if (template === false && rootValue.template) return false;
          if (template === true && rootValue.template === false) return false;
          return true;
        },
      ),
    },
  },
};

export default {schema, resolver};
