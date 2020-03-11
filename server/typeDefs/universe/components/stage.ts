import {gql} from "apollo-server-express";
import App from "../../../app";
import produce from "immer";
import {Stage} from "../../../classes/universe/components";
import {handlePatches} from "../../../helpers/filterPatches";

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
    entitySetStage(rootQuery, {id, ...properties}, context) {
      const entityId = id || context.entityId;
      const entityIndex = App.entities.findIndex(e => e.id === entityId);
      const flightId = App.entities[entityIndex].flightId;
      App.entities = produce(
        App.entities,
        draft => {
          const entity = draft[entityIndex];
          if (!entity.stage) {
            entity.stage = new Stage({
              scaleLabel: properties.scaleLabel,
              scaleLabelShort: properties.scaleLabelShort,
              skyboxAsset: properties.skyboxAsset,
            });
          } else {
            Object.entries(properties).forEach(([key, value]) => {
              entity.stage[key] = value;
            });
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
