import {gql} from "apollo-server-express";
import App from "../../../app";
import produce from "immer";
import {Appearance} from "../../../classes/universe/components";
import {handlePatches} from "../../../helpers/filterPatches";

const schema = gql`
  enum MeshTypeEnum {
    sphere
    cube
    model
    sprite
    planet
    star
  }
  type AppearanceComponent {
    meshType: MeshTypeEnum
    modelAsset: String
    materialMapAsset: String
    ringMapAsset: String
    cloudMapAsset: String
    emissiveColor: String
    emissiveIntensity: Float
    color: String
    scale: Float
  }

  extend type Entity {
    appearance: AppearanceComponent
  }
  extend type Mutation {
    entitySetAppearance(
      id: ID
      color: String
      meshType: MeshTypeEnum
      modelAsset: String
      materialMapAsset: String
      ringMapAsset: String
      cloudMapAsset: String
      emissiveColor: String
      emissiveIntensity: Float
      scale: Float
    ): String
    entityRemoveAppearance(id: ID!): String
  }
`;

const resolver = {
  Mutation: {
    entitySetAppearance(rootQuery, {id, ...properties}, context) {
      const entityId = id || context.entityId;
      const entityIndex = App.entities.findIndex(e => e.id === entityId);
      const flightId = App.entities[entityIndex].flightId;
      App.entities = produce(
        App.entities,
        draft => {
          const entity = draft[entityIndex];
          if (!entity.appearance) {
            entity.appearance = new Appearance({
              meshType: properties.meshType,
              modelAsset: properties.modelAsset,
              materialMapAsset: properties.materialMapAsset,
              ringMapAsset: properties.ringMapAsset,
              cloudMapAsset: properties.cloudMapAsset,
              emissiveColor: properties.emissiveColor,
              emissiveIntensity: properties.emissiveIntensity,
              color: properties.color,
              scale: properties.scale,
            });
          } else {
            Object.entries(properties).forEach(([key, value]) => {
              entity.appearance[key] = value;
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
