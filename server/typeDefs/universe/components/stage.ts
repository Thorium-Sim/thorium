import {gql} from "apollo-server-express";
import {setComponent, removeComponent} from "../setComponentHelper";
import App from "../../../app";

const schema = gql`
  type StageComponent {
    scaleLabel: String
    scaleLabelShort: String
    skyboxKey: String
    childrenAsSprites: Boolean
  }

  extend type Entity {
    stage: StageComponent
  }
  extend type Mutation {
    entitySetStage(
      id: ID
      scaleLabel: String
      scaleLabelShort: String
      skyboxKey: String
    ): String
    entityRemoveStage(id: ID!): String
  }
`;

const resolver = {
  Mutation: {
    entitySetStage: setComponent("stage"),
    entityRemoveStage(_, {id}, context) {
      // We have to remove all of the entities that are in the stage too.
      App.entities = App.entities.filter(e => e.stageChild?.parentId === id);
      removeComponent("stage")(_, {id}, context);
    },
  },
};

export default {schema, resolver};
