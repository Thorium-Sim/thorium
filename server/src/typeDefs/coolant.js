import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Coolant {
    temperature: Float
    quantity: Float
    rate: Float
  }

  type CoolantTank {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    coolant: Float
    coolantRate: Float
    damage: Damage
    power: Power
  }

  type CoolantRegulator {
    id: ID
    simulatorId: ID
    type: String
    name: String
    coolant: Coolant
    damage: Float
  }

  type SystemCoolant {
    systemId: ID
    simulatorId: ID
    name: String
    displayName: String
    type: String
    coolant: Float
    coolantRate: Float
  }
  extend type Query {
    coolant(simulatorId: ID!): [CoolantTank]
    systemCoolant(simulatorId: ID!, systemId: ID): [SystemCoolant]
  }
  extend type Mutation {
    setCoolantTank(id: ID!, coolant: Float!): String
    transferCoolant(
      coolantId: ID!
      systemId: ID
      # One of:
      # "stop" - stop the coolant transfer
      # "tank" - transfer to the tank
      # "system" - default. transfer to the system
      which: String
    ): String
  }
  extend type Subscription {
    coolantUpdate(simulatorId: ID!): [CoolantTank]
    coolantSystemUpdate(simulatorId: ID!, systemId: ID): [SystemCoolant]
  }
`;

const resolver = {
  Query: {
    coolant(root, { simulatorId, systemId }) {
      let returnVal = App.systems.filter(s => s.type === "Coolant");
      if (simulatorId) {
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      }
      if (systemId) returnVal = returnVal.filter(s => s.id === systemId);
      return returnVal;
    },
    systemCoolant(root, { simulatorId }) {
      return App.systems
        .filter(
          s =>
            s.simulatorId === simulatorId &&
            (s.coolant || s.coolant === 0) &&
            s.type !== "Coolant"
        )
        .map(s => {
          return {
            ...s,
            systemId: s.id
          };
        });
    }
  },
  Mutation: {
    ...mutationHelper(schema, ["transferCoolant"]),
    transferCoolant(root, args, context) {
      if (args.which === "stop") {
        App.handleEvent(args, "cancelCoolantTransfer", context);
      } else {
        App.handleEvent(args, "transferCoolant", context);
      }
    }
  },
  Subscription: {
    coolantUpdate: {
      resolve(rootValue, { simulatorId }) {
        let returnRes = rootValue;
        if (simulatorId)
          returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
        return returnRes;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("coolantUpdate"),
        (rootValue, { simulatorId }) => {
          if (simulatorId)
            return !!rootValue.find(s => s.simulatorId === simulatorId);
          return true;
        }
      )
    },
    coolantSystemUpdate: {
      resolve(rootValue, { simulatorId, systemId }) {
        let returnRes = rootValue;
        if (simulatorId)
          returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
        if (systemId) returnRes = returnRes.filter(s => s.id === systemId);
        return returnRes;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("coolantSystemUpdate"),
        (rootValue, { simulatorId, systemId }) => {
          let returnRes = rootValue;
          if (simulatorId)
            returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
          if (systemId) returnRes = returnRes.filter(s => s.id === systemId);
          return returnRes.length > 0 ? true : false;
        }
      )
    }
  }
};

export default { schema, resolver };
