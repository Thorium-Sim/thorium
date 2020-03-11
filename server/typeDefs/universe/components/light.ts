import {gql} from "apollo-server-express";
import App from "../../../app";
import produce from "immer";
import {Light} from "../../../classes/universe/components";
import {handlePatches} from "../../../helpers/filterPatches";

const schema = gql`
  type LightComponent {
    intensity: Float
    decay: Float
    color: String
  }

  extend type Entity {
    light: LightComponent
  }
  extend type Mutation {
    entitySetLight(
      id: ID
      intensity: Float
      decay: Float
      color: String
    ): String
    entityRemoveLight(id: ID!): String
  }
`;

const resolver = {
  Mutation: {
    entitySetLight(rootQuery, {id, ...properties}, context) {
      const entityId = id || context.entityId;
      const entityIndex = App.entities.findIndex(e => e.id === entityId);
      const flightId = App.entities[entityIndex].flightId;
      App.entities = produce(
        App.entities,
        draft => {
          const entity = draft[entityIndex];
          if (!entity.light) {
            entity.light = new Light({
              intensity: properties.intensity,
              decay: properties.decay,
              color: properties.color,
            });
          } else {
            Object.entries(properties).forEach(([key, value]) => {
              entity.light[key] = value;
            });
          }
        },

        handlePatches({
          context,
          publishKey: "entities",
          subFilterValues: {flightId: flightId},
        }),
      );
    },
  },
};

export default {schema, resolver};
