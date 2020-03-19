import {gql} from "apollo-server-express";
import {setComponent, removeComponent} from "../setComponentHelper";

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
    entitySetGlow: setComponent("glow"),
    entityRemoveGlow: removeComponent("glow"),
  },
};

export default {schema, resolver};
