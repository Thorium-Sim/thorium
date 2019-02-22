import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Transwarp {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    damage: Damage
    power: Power
    stealthFactor: Float
    locations: [Room]
    heat: Float
    heatRate: Float
    coolant: Float
    active: Boolean
    quad1: TranswarpQuad
    quad2: TranswarpQuad
    quad3: TranswarpQuad
    quad4: TranswarpQuad
  }
  type TranswarpQuad {
    field: SubspaceFieldSector
    core: SubspaceFieldSector
    warp: SubspaceFieldSector
  }
  extend type Query {
    transwarp(simulatorId: ID): [Transwarp]
  }
  extend type Mutation {
    setTranswarpActive(id: ID!, active: Boolean!): String
    fluxTranswarp(id: ID!, quad: String, field: String): String
    normalTranswarp(id: ID!, quad: String, field: String): String
    setTranswarpSectorValue(
      id: ID!
      quad: String!
      field: String!
      value: Int!
    ): String
  }
  extend type Subscription {
    transwarpUpdate(simulatorId: ID): [Transwarp]
  }
`;

// We define all of the resolvers necessary for
// the functionality in this file. These will be
// deep merged with the other resolvers.
const resolver = {
  Query: {
    transwarp(root, { simulatorId }) {
      let returnVal = App.systems.filter(s => s.class === "Transwarp");
      if (simulatorId)
        returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
      return returnVal;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    transwarpUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          return rootValue.filter(s => s.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("transwarpUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
