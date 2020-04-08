import {gql} from "apollo-server-express";
import {setComponent, removeComponent} from "../setComponentHelper";

const schema = gql`
  type ThrustersComponent {
    direction: Coordinates
    rotationDelta: Coordinates
    rotationSpeed: Float
    movementSpeed: Float
  }

  extend type Entity {
    thrusters: ThrustersComponent
  }
  extend type Mutation {
    entitySetThrusters(
      id: ID!
      direction: CoordinatesInput
      rotationDelta: CoordinatesInput
      rotationSpeed: Float
      movementSpeed: Float
    ): String
    entityRemoveThrusters(id: ID!): String
  }
`;

const resolver = {
  Mutation: {
    entitySetThrusters: setComponent("thrusters", false),
    entityRemoveThrusters: removeComponent("thrusters"),
  },
};

export default {schema, resolver};
