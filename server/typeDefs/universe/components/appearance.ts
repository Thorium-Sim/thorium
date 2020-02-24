import {gql} from "apollo-server-express";

const schema = gql`
  type AppearanceComponent {
    modelAsset: String
  }

  extend type Entity {
    appearance: AppearanceComponent
  }
`;

const resolver = {};

export default {schema, resolver};
