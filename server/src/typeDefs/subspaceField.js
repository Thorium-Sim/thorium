import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type SubspaceField implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    damage: Damage
    power: Power
    stealthFactor: Float
    locations: [Room]
    totalPower: Int
    fore: SubspaceFieldSector
    aft: SubspaceFieldSector
    port: SubspaceFieldSector
    starboard: SubspaceFieldSector
    ventral: SubspaceFieldSector
    dorsal: SubspaceFieldSector
  }
  type SubspaceFieldSector {
    required: Int
    value: Int
  }
  extend type Query {
    subspaceField(simulatorId: ID): [SubspaceField]
  }
  extend type Mutation {
    fluxSubspaceField(id: ID!, which: String): String
    normalSubspaceField(id: ID!, which: String): String
    setSubspaceFieldSectorValue(id: ID, which: String!, value: Int!): String
  }
  extend type Subscription {
    subspaceFieldUpdate(simulatorId: ID): [SubspaceField]
  }
`;

const resolver = {
  Query: {
    subspaceField(root, { simulatorId }) {
      let returnVal = App.systems.filter(s => s.class === "SubspaceField");
      if (simulatorId)
        returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
      return returnVal;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    subspaceFieldUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          return rootValue.filter(s => s.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("subspaceFieldUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
