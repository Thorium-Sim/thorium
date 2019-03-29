import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Isochip {
    id: ID
    system: System
    simulator: Simulator
    slot: Int
    requiredChip: Int
    chip: Int
    label: String
    state: ISOCHIP_STATES
  }

  enum ISOCHIP_STATES {
    empty
    diagnostic
    nominal
    invalid
  }

  input IsochipInput {
    system: ID
    simulator: ID
    slot: Int
    requiredChip: Int
    chip: Int
    label: String
  }
  extend type Query {
    isochips(simulatorId: ID): [Isochip]
  }
  extend type Mutation {
    insertIsochip(id: ID, simulatorId: ID, slot: Int, chip: Int): Isochip
    updateIsochip(
      id: ID
      simulatorId: ID
      slot: Int
      isochip: IsochipInput
    ): Isochip
    batchIsochipUpdate(simulatorId: ID, chips: [IsochipInput]): [Isochip]
  }
  extend type Subscription {
    isochipsUpdate(simulatorId: ID): [Isochip]
  }
`;

const resolver = {
  Isochip: {
    system(rootValue) {
      return App.systems.find(s => s.id === rootValue.system);
    },
    simulator(rootValue) {
      return App.simulator.find(s => s.id === rootValue.simulator);
    }
  },
  Query: {
    isochips(root, { simulatorId }) {
      let returnVal = App.isochips;
      if (simulatorId)
        returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
      return returnVal;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    isochipsUpdate: {
      resolve(rootValue, { simulatorId }) {
        let returnVal = rootValue;
        if (simulatorId)
          returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
        return returnVal;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("isochipsUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
