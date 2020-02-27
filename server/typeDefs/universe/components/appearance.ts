import {gql} from "apollo-server-express";

const schema = gql`
  type AppearanceComponent {
    modelAsset: String
  }

  extend type Entity {
    appearance: AppearanceComponent
  }
  extend type Mutation {
    entitySetAppearance(id: ID!, modelAsset: String): String
    entityRemoveAppearance(id: ID!): String
  }
`;

const resolver = {};

export default {schema, resolver};
