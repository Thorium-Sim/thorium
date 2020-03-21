import {gql} from "apollo-server-express";
import {setComponent} from "../setComponentHelper";

const schema = gql`
  type IdentityComponent {
    name: String
    type: String
  }

  extend type Entity {
    identity: IdentityComponent
  }
  extend type Mutation {
    entitySetIdentity(id: ID, name: String, type: String): String
    entityRemoveIdentity(id: ID!): String
  }
`;

const resolver = {
  Mutation: {
    entitySetIdentity: setComponent("identity"),
  },
};

export default {schema, resolver};
