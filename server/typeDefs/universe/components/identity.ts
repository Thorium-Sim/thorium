import {gql} from "apollo-server-express";
import App from "../../../app";
import produce from "immer";
import {Identity} from "../../../classes/universe/components";
import {handlePatches} from "../../../helpers/filterPatches";

const schema = gql`
  type IdentityComponent {
    name: String
    type: String
  }

  extend type Entity {
    identity: IdentityComponent
  }
  extend type Mutation {
    entitySetIdentity(id: ID, name: String, type: String): String
    entityRemoveIdentity(id: ID!): String
  }
`;

const resolver = {
  Mutation: {
    entitySetIdentity(rootQuery, {id, ...properties}, context) {
      const entityId = id || context.entityId;
      const entityIndex = App.entities.findIndex(e => e.id === entityId);
      const flightId = App.entities[entityIndex].flightId;
      App.entities = produce(
        App.entities,
        draft => {
          const entity = draft[entityIndex];
          if (!entity.identity) {
            entity.identity = new Identity({
              name: properties.name,
              type: properties.type,
            });
          } else {
            Object.entries(properties).forEach(([key, value]) => {
              entity.identity[key] = value;
            });
          }
        },

        handlePatches(context, "entities", flightId, "flightId", "entity"),
      );
    },
  },
};

export default {schema, resolver};
