import { gql } from "apollo-server-express";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Ambiance {
    id: ID
    name: String
    asset: String
    volume: Float
    channel: [Int]
    playbackRate: Float
  }
  input AmbianceInput {
    id: ID
    name: String
    asset: String
    volume: Float
    channel: [Int]
    playbackRate: Float
  }

  extend type Simulator {
    ambiance: [Ambiance]
  }
  extend type Station {
    ambiance: String
  }
  extend type Mutation {
    addSimulatorAmbiance(id: ID!, name: String!): String
    updateSimulatorAmbiance(id: ID!, ambiance: AmbianceInput!): String
    removeSimulatorAmbiance(id: ID!, ambianceId: ID!): String
    setStationAmbiance(
      stationSetID: ID!
      stationName: String!
      ambiance: String
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
