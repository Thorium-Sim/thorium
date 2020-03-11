import {gql} from "apollo-server-express";
import App from "../../../app";
import produce from "immer";
import {Glow} from "../../../classes/universe/components";
import {handlePatches} from "../../../helpers/filterPatches";

const schema = gql`
  enum GlowModeEnum {
    glow
    halo
    shell
  }
  type GlowComponent {
    glowMode: GlowModeEnum
    color: String
  }

  extend type Entity {
    glow: GlowComponent
  }
  extend type Mutation {
    entitySetGlow(id: ID, glowMode: GlowModeEnum, color: String): String
    entityRemoveGlow(id: ID!): String
  }
`;

const resolver = {
  Mutation: {
    entitySetGlow(rootQuery, {id, ...properties}, context) {
      const entityId = id || context.entityId;
      const entityIndex = App.entities.findIndex(e => e.id === entityId);
      const flightId = App.entities[entityIndex].flightId;
      App.entities = produce(
        App.entities,
        draft => {
          const entity = draft[entityIndex];
          if (!entity.glow) {
            entity.glow = new Glow({
              glowMode: properties.glowMode,
              color: properties.color,
            });
          } else {
            Object.entries(properties).forEach(([key, value]) => {
              entity.glow[key] = value;
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
