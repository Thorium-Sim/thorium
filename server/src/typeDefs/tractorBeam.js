import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type TractorBeam {
    id: ID
    simulatorId: ID
    type: String
    power: Power
    damage: Damage
    name: String
    displayName: String
    state: Boolean
    target: Boolean
    targetLabel: String
    strength: Float
    stress: Float
    scanning: Boolean
  }
  extend type Query {
    tractorBeam(simulatorId: ID): [TractorBeam]
  }
  extend type Mutation {
    setTractorBeamState(id: ID!, state: Boolean!): String
    setTractorBeamTarget(id: ID!, target: Boolean!): String
    setTractorBeamStrength(id: ID!, strength: Float!): String
    setTractorBeamStress(id: ID!, stress: Float!): String
    setTractorBeamScanning(id: ID!, scanning: Boolean!): String
    setTractorBeamTargetLabel(id: ID!, label: String!): String

    #Macro: Tractor Beam: Add Target
    addTractorTarget(id: ID!, label: String): String
    #Macro: Tractor Beam: Remove Target
    removeTractorTarget(id: ID!): String
  }
  extend type Subscription {
    tractorBeamUpdate(simulatorId: ID): [TractorBeam]
  }
`;

// We define all of the resolvers necessary for
// the functionality in this file. These will be
// deep merged with the other resolvers.
const resolver = {
  Query: {
    tractorBeam(root, { simulatorId }) {
      let returnVal = App.systems.filter(s => s.type === "TractorBeam");
      if (simulatorId) {
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      }
      return returnVal;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    tractorBeamUpdate: {
      resolve(rootValue, { simulatorId }) {
        let returnRes = rootValue;
        if (simulatorId)
          returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
        return returnRes;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("tractorBeamUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
