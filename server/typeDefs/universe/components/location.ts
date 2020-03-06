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
  type EntityCoordinates {
    x: BigInt!
    y: BigInt!
    z: BigInt!
  }
  input EntityCoordinatesInput {
    x: BigInt!
    y: BigInt!
    z: BigInt!
  }
  type LocationComponent {
    position: EntityCoordinates!
    velocity: EntityCoordinates!
    acceleration: EntityCoordinates!
    rotation: Quaternion!
    rotationVelocity: EntityCoordinates!
    rotationAcceleration: EntityCoordinates!
  }

  extend type Entity {
    location: LocationComponent
  }
  input EntitiesLocationInput {
    id: ID!
    position: EntityCoordinatesInput!
  }
  extend type Mutation {
    entitySetLocation(
      id: ID
      position: EntityCoordinatesInput
      velocity: EntityCoordinatesInput
      acceleration: EntityCoordinatesInput
      rotation: QuaternionInput
      rotationVelocity: EntityCoordinatesInput
      rotationAcceleration: EntityCoordinatesInput
    ): String
    entitiesSetPosition(entities: [EntitiesLocationInput!]!): String
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
    entitiesSetPosition(root, {entities}, context) {
      const entity = App.entities.find(e => e.id === entities[0].id);
      const flightId = entity?.flightId;
      if (!flightId) return;
      App.entities = produce(
        App.entities,
        draft => {
          entities.forEach(e => {
            const entityIndex = draft.findIndex(ee => ee.id === e.id);
            const entity = draft[entityIndex];
            if (!entity.location) {
              entity.location = new Location({position: e.position});
            } else {
              entity.location.position = e.position;
            }
          });
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
