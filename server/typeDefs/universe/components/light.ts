import {gql} from "apollo-server-express";
import {setComponent} from "../setComponentHelper";

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
    entitySetLight: setComponent("light"),
  },
};

export default {schema, resolver};
