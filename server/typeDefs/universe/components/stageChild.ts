import {gql} from "apollo-server-express";
import {setComponent} from "../setComponentHelper";
import App from "../../../app";

const schema = gql`
  type StageChildComponent {
    parentId: ID!
    parent: Entity
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
  StageChildComponent: {
    parent(rootValue) {
      return App.entities.find(e => e.id === rootValue.parentId);
    },
  },
  Mutation: {
    entitySetStageChild: setComponent("stageChild"),
  },
};

export default {schema, resolver};
