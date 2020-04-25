import {gql} from "apollo-server-express";
import App from "../../../app";
import produce from "immer";
import {Location} from "../../../classes/universe/components";
import {setComponent} from "../setComponentHelper";
import {pubsub} from "../../../helpers/subscriptionManager";

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
    x: Float!
    y: Float!
    z: Float!
  }
  input EntityCoordinatesInput {
    x: Float!
    y: Float!
    z: Float!
  }
  type LocationComponent {
    inert: Boolean!
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
    entitySetRotationVelocityMagnitude(
      id: ID!
      rotationVelocity: CoordinatesInput!
    ): String
    # entitySetVelocityMagnitude(id: ID!, velocity: CoordinatesInput!): String
    entityRemoveLocation(id: ID!): String
  }
`;

const resolver = {
  Mutation: {
    entitySetLocation: setComponent("location"),
    entitiesSetPosition(root, {entities}, context) {
      const entity = App.entities.find(e => e.id === entities[0].id);
      const flightId = entity?.flightId;
      if (!flightId) return;

      App.entities = produce(App.entities, draft => {
        entities.forEach(e => {
          const entityIndex = draft.findIndex(ee => ee.id === e.id);
          const entity = draft[entityIndex];
          if (!entity.location) {
            entity.location = new Location({position: e.position});
          } else {
            entity.location.position = e.position;
          }
        });
      });

      pubsub.publish("entities", {
        flightId,
        template: false,
        entities: App.entities,
      });
    },
    entitySetRotationVelocityMagnitude(root, {id, rotationVelocity}) {
      const entityIndex = App.entities.findIndex(e => e.id === id);
      if (entityIndex === -1) return;

      const entity = App.entities[entityIndex];
      const flightId = entity?.flightId;
      if (!flightId) return;

      entity.location.rotationVelocity.x = rotationVelocity.x;
      entity.location.rotationVelocity.y = rotationVelocity.y;
      entity.location.rotationVelocity.z = rotationVelocity.z;
      // No need to publish
    },
    // entitySetAccelerationMagnitude(root, {id, velocity}) {
    //   const entityIndex = App.entities.findIndex(e => e.id === id);
    //   if (entityIndex === -1) return;

    //   const entity = App.entities[entityIndex];
    //   const flightId = entity?.flightId;
    //   if (!flightId) return;

    //   entity.location.velocity.x = velocity.x;
    //   entity.location.velocity.y = velocity.y;
    //   entity.location.velocity.z = velocity.z;
    //   // No need to publish
    // },
    entityRemoveLocation(root, {id}, context) {
      const entityId = id || context.entityId;
    },
  },
};

export default {schema, resolver};
