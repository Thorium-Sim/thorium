import { gql } from "apollo-server-express";
const mutationHelper = require("../helpers/mutationHelper").default;
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

    """
    Macro: Systems: Flux Power
    """
    fluxSystemPower(
      id: ID
      all: Boolean
      simulatorId: ID
      type: String
      name: String
    ): String
  }
`;

const resolver = {
  Mutation: mutationHelper(schema)
};

export default { schema, resolver };
