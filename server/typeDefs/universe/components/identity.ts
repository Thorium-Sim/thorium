import {gql} from "apollo-server-express";

const schema = gql`
  type IdentityComponent {
    name: String
    type: String
  }

  extend type Entity {
    identity: IdentityComponent
  }
`;

const resolver = {};

export default {schema, resolver};
