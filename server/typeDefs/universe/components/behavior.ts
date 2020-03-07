import {gql} from "apollo-server-express";

const schema = gql`
  enum Behaviors {
    holdPosition
    wander
    follow
    avoid
    attack
  }

  type BehaviorComponent {
    behavior: Behaviors!
    targetId: ID
    destination: EntityCoordinates
  }

  extend type Entity {
    behavior: BehaviorComponent
  }
  extend type Mutation {
    entitySetBehavior(
      id: ID!
      behavior: Behaviors!
      targetId: ID
      destination: EntityCoordinatesInput
    ): String
    entityRemoveBehavior(id: ID!): String
  }
`;

const resolver = {};

export default {schema, resolver};
