import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Reactor implements SystemInterface {
    id: ID!
    simulatorId: ID
    type: String
    name: String
    displayName: String
    upgradeName: String
    upgraded: Boolean
    stealthFactor: Float
    power: Power
    heat: Float
    heatRate: Float
    coolant: Float
    damage: Damage
    #One of 'reactor' or 'battery'
    model: REACTOR_MODELS
    ejected: Boolean
    externalPower: Boolean
    powerOutput: Int
    efficiency: Float
    efficiencies: [ReactorEfficiency!]
    batteryChargeLevel: Float
    batteryChargeRate: Float
    depletion: Float

    hasWings: Boolean
    leftWingPower: Int
    leftWingRequest: Int
    leftWingRequested: Boolean
    rightWingPower: Int
    rightWingRequest: Int
    rightWingRequested: Boolean

    # For Dilithium Stress
    alphaLevel: Float
    betaLevel: Float
    alphaTarget: Float
    betaTarget: Float
    dilithiumRate: Float

    locations: [Room]
    requireBalance: Boolean
  }

  enum REACTOR_MODELS {
    reactor
    battery
  }

  type ReactorEfficiency {
    label: String!
    color: String!
    efficiency: Float
  }

  input ReactorEfficiencyInput {
    label: String!
    color: String!
    efficiency: Float!
  }
  extend type Query {
    reactors(simulatorId: ID, model: String): [Reactor]
    reactor(id: ID!): Reactor
  }
  extend type Mutation {
    reactorEject(id: ID!, tf: Boolean!): String
    reactorChangeModel(id: ID!, model: String!): String
    reactorChangeOutput(id: ID!, output: Int!): String
    """
    Macro: Reactor: Change Reactor Efficiency
    Requires:
     - Cards:ReactorControl
     - Systems:Reactor
    """
    reactorChangeEfficiency(id: ID!, efficiency: Float): String
    reactorBatteryChargeLevel(id: ID!, level: Float!): String
    reactorBatteryChargeRate(id: ID!, rate: Float!): String
    updateDilithiumStress(
      id: ID!
      alphaLevel: Float
      betaLevel: Float
      alphaTarget: Float
      betaTarget: Float
    ): String
    fluxDilithiumStress(id: ID!): String
    setReactorEffciciencies(
      id: ID!
      efficiencies: [ReactorEfficiencyInput]!
    ): String
    setDilithiumStressRate(id: ID!, rate: Float!): String
    reactorRequireBalance(id: ID!, balance: Boolean!): String

    reactorSetHasWings(id: ID!, hasWings: Boolean!): String
    reactorSetWingPower(id: ID!, wing: String!, power: Int!): String
    reactorRequestWingPower(id: ID!, wing: String!, power: Int!): String
    reactorAckWingRequest(id: ID!, wing: String!, ack: Boolean!): String
  }
  extend type Subscription {
    reactorUpdate(simulatorId: ID): [Reactor!]!
  }
`;

const resolver = {
  Reactor: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r),
      );
    },
  },
  Query: {
    reactors(root, {simulatorId, model}) {
      let returnVal = App.systems.filter(s => s.type === "Reactor");
      if (simulatorId) {
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      }
      if (model) {
        returnVal = returnVal.filter(s => s.model === model);
      }
      return returnVal;
    },
    reactor(root, {id}) {
      return App.systems.find(s => s.id === id);
    },
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    reactorUpdate: {
      resolve(rootValue, {simulatorId}) {
        let returnRes = rootValue;
        if (simulatorId)
          returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
        return returnRes;
      },
      subscribe: withFilter(
        (rootValue, {simulatorId}) => {
          const id = uuid.v4();
          process.nextTick(() => {
            let returnVal = App.systems.filter(s => s.class === "Reactor");
            if (simulatorId)
              returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
            pubsub.publish(id, returnVal);
          });
          return pubsub.asyncIterator([id, "reactorUpdate"]);
        },
        rootValue => !!(rootValue && rootValue.length),
      ),
    },
  },
};

export default {schema, resolver};
