import {gql} from "apollo-server-express";
import {setComponent} from "../setComponentHelper";

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
    entitySetAppearance: setComponent("appearance"),
  },
};

export default {schema, resolver};
