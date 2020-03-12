import {gql} from "apollo-server-express";
import {setComponent} from "../setComponentHelper";

const schema = gql`
  type StageComponent {
    scaleLabel: String
    scaleLabelShort: String
    skyboxAsset: String
  }

  extend type Entity {
    stage: StageComponent
  }
  extend type Mutation {
    entitySetStage(
      id: ID
      scaleLabel: String
      scaleLabelShort: String
      skyboxAsset: String
    ): String
    entityRemoveStage(id: ID!): String
  }
`;

const resolver = {
  Mutation: {
    entitySetStage: setComponent("stage"),
  },
};

export default {schema, resolver};
