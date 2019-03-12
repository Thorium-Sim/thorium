import { gql } from "apollo-server-express";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Environment {
    id: ID
    oxygen: Float
    nitrogen: Float
    trace: Float
    pressure: Float
    temperature: Float
    humidity: Float
    gravity: Float
  }
  input EnvironmentInput {
    id: ID
    oxygen: Float
    nitrogen: Float
    trace: Float
    pressure: Float
    temperature: Float
    humidity: Float
    gravity: Float
  }

  extend type Mutation {
    updateEnvironment(deckID: ID!, environment: EnvironmentInput): String
  }
`;

const resolver = {
  Mutation: mutationHelper(schema)
};

export default { schema, resolver };
