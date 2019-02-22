import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Thruster {
    id: ID
    name: String
    type: String
    simulatorId: ID
    direction: Coordinates
    rotation: Rotation
    rotationDelta: Rotation
    rotationRequired: Rotation
    manualThrusters: Boolean
    power: Power
    damage: Damage
    rotationSpeed: Float
    movementSpeed: Float
  }
  type Coordinates {
    x: Float
    y: Float
    z: Float
  }
  input CoordinatesInput {
    x: Float
    y: Float
    z: Float
  }
  type Rotation {
    yaw: Float
    pitch: Float
    roll: Float
  }
  input RotationInput {
    yaw: Float
    pitch: Float
    roll: Float
  }
  input DirectionInput {
    x: Float
    y: Float
    z: Float
  }
  extend type Query {
    thrusters(simulatorId: ID): [Thruster]
    thruster(id: ID!): Thruster
  }
  extend type Mutation {
    rotationUpdate(id: ID!, rotation: RotationInput, on: Boolean): String
    rotationSet(id: ID!, rotation: RotationInput): String
    requiredRotationSet(id: ID!, rotation: RotationInput): String
    directionUpdate(id: ID!, direction: DirectionInput): String
    positionUpdate: String
    setThrusterRotationSpeed(id: ID!, speed: Float!): String
    setThrusterMovementSpeed(id: ID!, speed: Float): String
  }
  extend type Subscription {
    rotationChange(simulatorId: ID): Thruster
  }
`;

const resolver = {
  Query: {
    thrusters(root, { simulatorId }) {
      return App.systems.filter(system => {
        return (
          system.type === "Thrusters" && system.simulatorId === simulatorId
        );
      });
    },
    thruster(root, { id }) {
      return App.systems.find(s => s.id === id);
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    rotationChange: {
      resolve(root, { simulatorId }) {
        if (simulatorId) {
          return root.simulatorId === simulatorId && root;
        }
        return root;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("rotationChange"),
        rootValue => !!rootValue
      )
    }
  }
};

export default { schema, resolver };
