import { gql } from "apollo-server-express";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Power {
    power: Int
    powerLevels: [Int]
    defaultLevel: Int
  }
  extend type Mutation {
    changePower(systemId: ID!, power: Int!): String
    changeSystemPowerLevels(systemId: ID!, powerLevels: [Int]!): String

    changeSystemDefaultPowerLevel(id: ID!, level: Int!): String

    #Macro: Systems: Flux Power
    fluxSystemPower(
      id: ID
      all: Boolean
      simulatorId: ID
      type: String
      name: String
    ): String
  }
`;

// We define all of the resolvers necessary for
// the functionality in this file. These will be
// deep merged with the other resolvers.
const resolver = {
  Mutation: mutationHelper(schema)
};

export default { schema, resolver };
