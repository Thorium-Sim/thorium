import {gql} from "apollo-server-express";

const schema = gql`
  type IdentityComponent {
    name: String
    type: String
  }

  extend type Entity {
    identity: IdentityComponent
  }
  extend type Mutation {
    entitySetIdentity(id: ID!, name: String, type: String): String
    entityRemoveIdentity(id: ID!): String
  }
`;

const resolver = {};

export default {schema, resolver};
