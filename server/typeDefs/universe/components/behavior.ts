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
    destination: Coordinates
  }

  extend type Entity {
    behavior: BehaviorComponent
  }
`;

const resolver = {};

export default {schema, resolver};
