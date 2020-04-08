import {gql} from "apollo-server-express";
import {setComponent} from "../setComponentHelper";

const schema = gql`
  extend type Entity {
    # We only care about the existence of the simulator component
    # Not any of its properties. Maybe someday we'll add
    # more simulator properties.
    simulator: Boolean
  }
  extend type Mutation {
    # gotta include some property so it will actually be added
    entitySetSimulator(id: ID, property: String = "simulator"): String
    entityRemoveSimulator(id: ID!): String
  }
`;

const resolver = {
  Mutation: {
    entitySetSimulator: setComponent("simulator"),
  },
};

export default {schema, resolver};
