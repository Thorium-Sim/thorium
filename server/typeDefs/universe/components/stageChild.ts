import {gql} from "apollo-server-express";
import App from "../../../app";
import produce from "immer";
import {StageChild} from "../../../classes/universe/components";
import {handlePatches} from "../../../helpers/filterPatches";

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
    entitySetStageChild(rootQuery, {id, parentId}, context) {
      const entityId = id || context.entityId;
      const entityIndex = App.entities.findIndex(e => e.id === entityId);
      const flightId = App.entities[entityIndex].flightId;
      App.entities = produce(
        App.entities,
        draft => {
          const entity = draft[entityIndex];
          if (!entity.stageChild) {
            entity.stageChild = new StageChild({
              parentId: parentId,
            });
          } else {
            entity.stageChild.parentId = parentId;
          }
        },

        handlePatches({
          context,
          publishKey: "entities",
          subFilterValues: {flightId: flightId},
        }),
      );
    },
  },
};

export default {schema, resolver};
