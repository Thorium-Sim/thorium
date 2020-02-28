import {gql} from "apollo-server-express";
import App from "../../../app";
import produce from "immer";
import {Location} from "../../../classes/universe/components";
import {handlePatches} from "../../../helpers/filterPatches";

const schema = gql`
  type Quaternion {
    x: Float!
    y: Float!
    z: Float!
    w: Float!
  }
  input QuaternionInput {
    x: Float!
    y: Float!
    z: Float!
    w: Float!
  }
  type LocationComponent {
    position: Coordinates!
    velocity: Coordinates!
    acceleration: Coordinates!
    rotation: Quaternion!
    rotationVelocity: Coordinates!
    rotationAcceleration: Coordinates!
  }

  extend type Entity {
    location: LocationComponent
  }
  extend type Mutation {
    entitySetLocation(
      id: ID
      position: CoordinatesInput
      velocity: CoordinatesInput
      acceleration: CoordinatesInput
      rotation: QuaternionInput
      rotationVelocity: CoordinatesInput
      rotationAcceleration: CoordinatesInput
    ): String
    entityRemoveLocation(id: ID!): String
  }
`;

const resolver = {
  Mutation: {
    entitySetLocation(root, {id, ...properties}, context) {
      const entityId = id || context.entityId;
      const entityIndex = App.entities.findIndex(e => e.id === entityId);
      const flightId = App.entities[entityIndex].flightId;
      App.entities = produce(
        App.entities,
        draft => {
          const entity = draft[entityIndex];
          if (!entity.location) {
            entity.location = new Location({...properties});
          } else {
            Object.entries(properties).forEach(([key, value]) => {
              entity.location[key] = value;
            });
          }
        },

        handlePatches(context, "entities", flightId, "flightId", "entity"),
      );
    },
    entityRemoveLocation(root, {id}, context) {
      const entityId = id || context.entityId;
    },
  },
};

export default {schema, resolver};
