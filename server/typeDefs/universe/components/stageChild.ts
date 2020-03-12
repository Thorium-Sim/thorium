import {gql} from "apollo-server-express";
import {setComponent} from "../setComponentHelper";

const schema = gql`
  type StageChildComponent {
    parentId: ID!
  }

  extend type Entity {
    stageChild: StageChildComponent
  }
  extend type Mutation {
    entitySetStageChild(id: ID, parentId: ID!): String
    entityRemoveStageChild(id: ID!): String
  }
`;

const resolver = {
  Mutation: {
    entitySetStageChild: setComponent("stageChild"),
  },
};

export default {schema, resolver};
