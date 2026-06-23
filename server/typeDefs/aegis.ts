import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import App from "../app";
import uuid from "uuid";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  enum AEGIS_MODE {
    screen
    ecm
    relay
    repair
  }
  enum AEGIS_RELAY_TARGET {
    sensors
    balanced
    comms
  }
  type AegisLogEntry {
    id: ID!
    timestamp: String!
    type: String!
    contents: String!
  }
  type AegisPing {
    id: ID!
    pingType: String!
    strength: Float!
    bearing: Float
  }
  type Aegis implements SystemInterface {
    id: ID!
    simulatorId: ID
    class: String
    type: String
    name: String!
    displayName: String!
    upgradeName: String
    upgraded: Boolean
    damage: Damage!
    power: Power!
    stealthFactor: Float
    locations: [Room]

    maxDrones: Int!
    droneCount: Int!
    deployed: Boolean!
    mode: AEGIS_MODE!
    fabricating: Boolean!
    fabricationPaused: Boolean!
    fabricationProgress: Float!
    attritionEnabled: Boolean!
    structuralIntegrity: Float!
    screenFocusX: Float!
    screenFocusY: Float!
    ecmIntensity: Float!
    relayTarget: AEGIS_RELAY_TARGET!
    repairEffort: Float!
    log: [AegisLogEntry!]!
  }

  extend type Query {
    aegis(simulatorId: ID!): Aegis
  }
  extend type Mutation {
    aegisSetMode(id: ID!, mode: AEGIS_MODE!): String
    aegisDeploy(id: ID!): String
    aegisRecall(id: ID!): String
    aegisStartFabrication(id: ID!): String
    aegisStopFabrication(id: ID!): String
    aegisPauseFabrication(id: ID!, paused: Boolean!): String
    aegisSetAttrition(id: ID!, enabled: Boolean!): String
    aegisDestroyDrone(id: ID!): String
    aegisSetDroneCount(id: ID!, count: Int!): String
    aegisSetMaxDrones(id: ID!, count: Int!): String
    aegisSetScreenFocus(id: ID!, x: Float!, y: Float!): String
    aegisSetEcmIntensity(id: ID!, intensity: Float!): String
    aegisSetRelayTarget(id: ID!, target: AEGIS_RELAY_TARGET!): String
    aegisSetRepairEffort(id: ID!, effort: Float!): String
    aegisSetStructuralIntegrity(id: ID!, integrity: Float!): String
    aegisHitStructure(id: ID!, amount: Float, bearing: Float): String
    aegisClearLog(id: ID!): String
  }
  extend type Subscription {
    aegisUpdate(simulatorId: ID!): Aegis
    aegisPing(simulatorId: ID!): AegisPing
  }
`;

const resolver = {
  Aegis: {
    screenFocusX(sys) {
      return sys.screenFocus.x;
    },
    screenFocusY(sys) {
      return sys.screenFocus.y;
    },
  },
  Query: {
    aegis(rootQuery, {simulatorId}) {
      return App.systems.find(
        s => s.simulatorId === simulatorId && s.class === "Aegis",
      );
    },
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    aegisUpdate: {
      resolve(rootQuery) {
        return rootQuery;
      },
      subscribe: withFilter(
        (_rootValue, {simulatorId}) => {
          const id = uuid.v4();
          process.nextTick(() => {
            const data = App.systems.find(s => {
              return s.simulatorId === simulatorId && s.class === "Aegis";
            });
            pubsub.publish(id, data);
          });
          return pubsub.asyncIterator([id, "aegisUpdate"]);
        },
        (rootValue, args) => {
          return rootValue?.simulatorId === args?.simulatorId;
        },
      ),
    },
    aegisPing: {
      resolve(rootQuery) {
        return rootQuery;
      },
      // Transient one-shot events — no initial publish on subscribe
      subscribe: withFilter(
        () => pubsub.asyncIterator("aegisPing"),
        (rootValue, args) => {
          return rootValue?.simulatorId === args?.simulatorId;
        },
      ),
    },
  },
};

export default {schema, resolver};
