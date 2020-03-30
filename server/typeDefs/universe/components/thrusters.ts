import {gql} from "apollo-server-express";
import {setComponent} from "../setComponentHelper";

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
    entitySetBehavior: setComponent("thrusters"),
  },
};

export default {schema, resolver};
