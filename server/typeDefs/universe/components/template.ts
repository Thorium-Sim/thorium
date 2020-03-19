import {gql} from "apollo-server-express";
import {setComponent} from "../setComponentHelper";

const schema = gql`
  type TemplateComponent {
    category: String
  }

  extend type Entity {
    template: TemplateComponent
  }
  extend type Mutation {
    entitySetTemplate(id: ID, category: String!): String
  }
`;

const resolver = {
  Mutation: {
    entitySetTemplate: setComponent("template"),
  },
};

export default {schema, resolver};
