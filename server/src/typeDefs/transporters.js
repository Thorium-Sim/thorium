import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Transporter {
    id: ID
    simulatorId: ID
    type: String
    name: String
    targets: [TransporterTarget]
    requestedTarget: String
    destination: String
    charge: Float
    state: String
    power: Power
    damage: Damage
    chargeSpeed: Float
  }
  type TransporterTarget {
    id: ID
    icon: String
    moving: Boolean
    position: Coordinates
  }
  input TransporterInput {
    id: ID
    simulatorId: ID
    requestedTarget: String
    destination: String
    charge: Float
    state: String
  }
  extend type Query {
    transporters(simulatorId: ID): [Transporter]
  }
  extend type Mutation {
    setTransportDestination(transporter: ID!, destination: String!): String
    setTransportTarget(transporter: ID!, target: String!): String
    beginTransportScan(transporter: ID!): String
    cancelTransportScan(transporter: ID!): String
    clearTransportTargets(transporter: ID!): String
    setTransportCharge(transporter: ID!, charge: Float!): String
    completeTransport(transporter: ID!, target: ID!): String
    """
    Macro: Transporters: Set Target Count
    """
    setTransporterTargets(transporter: ID!, targets: Int!): String
    setTransporterChargeSpeed(id: ID!, chargeSpeed: Float!): String
  }
  extend type Subscription {
    transporterUpdate(simulatorId: ID): Transporter
  }
`;

const resolver = {
  Query: {
    transporters(_, { simulatorId }) {
      return App.systems.filter(sys => {
        return sys.type === "Transporters" && sys.simulatorId === simulatorId;
      });
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    transporterUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (rootValue.simulatorId !== simulatorId) return false;
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("transporterUpdate"),
        rootValue => !!rootValue
      )
    }
  }
};

export default { schema, resolver };
