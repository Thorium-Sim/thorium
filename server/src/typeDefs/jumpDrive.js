import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type JumpDrive implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    power: Power
    name: String
    displayName: String
    stealthFactor: Float
    damage: Damage
    locations: [Room]

    sectors: JumpDriveSectors
    env: Float
    activated: Boolean
    stress: Float
    enabled: Boolean
    ringsExtended: Boolean
  }

  type JumpDriveSectors {
    fore: JumpDriveSector
    aft: JumpDriveSector
    starboard: JumpDriveSector
    port: JumpDriveSector
  }
  type JumpDriveSector {
    level: Int
    offset: Float
  }
  extend type Query {
    jumpDrive(simulatorId: ID): [JumpDrive]
  }
  extend type Mutation {
    setJumpdriveActivated(id: ID!, activated: Boolean!): String
    setJumpdriveEnvs(id: ID!, envs: Float!): String
    setJumpdriveSectorLevel(id: ID!, sector: String!, level: Int!): String
    setJumpdriveSectorOffset(id: ID!, sector: String!, offset: Float!): String
    fluxJumpdriveSector(id: ID!, sector: String): String
    setJumpDriveEnabled(id: ID!, enabled: Boolean): String
    hitJumpDriveStress(id: ID!, sector: String!): String
    setJumpDriveRingsExtended(id: ID!, ringsExtended: Boolean!): String
  }
  extend type Subscription {
    jumpDriveUpdate(simulatorId: ID): [JumpDrive]
  }
`;

const resolver = {
  Query: {
    jumpDrive(root, { simulatorId }) {
      let returnVal = App.systems.filter(s => s.type === "JumpDrive");
      if (simulatorId)
        returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
      return returnVal;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    jumpDriveUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          return rootValue.filter(s => s.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("jumpDriveUpdate"),
        (rootValue, { simulatorId }) => {
          if (simulatorId) {
            return (
              rootValue.filter(s => s.simulatorId === simulatorId).length > 0
            );
          }
          return rootValue.length;
        }
      )
    }
  }
};

export default { schema, resolver };
