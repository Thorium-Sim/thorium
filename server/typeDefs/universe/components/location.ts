import {gql} from "apollo-server-express";

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
      id: ID!
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

const resolver = {};

export default {schema, resolver};
