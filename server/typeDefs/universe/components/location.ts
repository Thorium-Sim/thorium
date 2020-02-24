import {gql} from "apollo-server-express";

const schema = gql`
  type Quaternion {
    x: Float
    y: Float
    z: Float
    w: Float
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
`;

const resolver = {};

export default {schema, resolver};
