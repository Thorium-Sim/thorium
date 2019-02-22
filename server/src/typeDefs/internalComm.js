import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type InternalComm {
    id: ID
    simulatorId: ID
    type: String
    power: Power
    name: String
    state: String
    outgoing: String
    incoming: String
    damage: Damage
  }
  extend type Query {
    internalComm(simulatorId: ID!): [InternalComm]
  }
  extend type Mutation {
    internalCommConnectOutgoing(id: ID!): String
    internalCommConnectIncoming(id: ID!): String
    internalCommCancelIncoming(id: ID!): String
    internalCommCancelOutgoing(id: ID!): String
    internalCommCallIncoming(id: ID!, incoming: String): String
    internalCommCallOutgoing(id: ID!, outgoing: String): String
  }
  extend type Subscription {
    internalCommUpdate(simulatorId: ID): [InternalComm]
  }
`;

const resolver = {
  Query: {
    internalComm(root, { simulatorId }) {
      let comm = App.systems.filter(s => s.type === "InternalComm");
      if (simulatorId) comm = comm.filter(s => s.simulatorId === simulatorId);
      return comm;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    internalCommUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId)
          rootValue = rootValue.filter(s => s.simulatorId === simulatorId);
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("internalCommUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
