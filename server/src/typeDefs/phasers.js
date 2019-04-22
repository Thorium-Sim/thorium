import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Phaser implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    stealthFactor: Float
    power: Power
    damage: Damage
    arc: Float
    coolant: Float
    beams: [PhaserBeam]
    locations: [Room]
    holdToCharge: Boolean
    chargeSpeed: Float
  }

  type PhaserBeam {
    id: ID
    power: Power
    damage: Damage
    charge: Float
    # One of 'idle', 'discharging', charging', 'firing'
    state: String
    heat: Float
  }
  extend type Query {
    phasers(simulatorId: ID): [Phaser]
    phaser(id: ID!): Phaser
  }
  extend type Mutation {
    chargePhaserBeam(id: ID!, beamId: ID!): String
    dischargePhaserBeam(id: ID!, beamId: ID!): String
    firePhaserBeam(id: ID!, beamId: ID!): String
    stopPhaserBeams(id: ID!): String
    coolPhaserBeam(id: ID!, beamId: ID): String
    phaserArc(id: ID!, arc: Float!): String
    setPhaserBeamCharge(id: ID!, beamId: ID!, charge: Float!): String
    setPhaserBeamHeat(id: ID!, beamId: ID!, heat: Float!): String
    setPhaserBeamCount(id: ID!, beamCount: Int!): String
    setPhaserHoldToCharge(id: ID!, holdToCharge: Boolean!): String
    setPhaserChargeSpeed(id: ID!, speed: Float!): String
    stopChargingPhasers(id: ID!): String
  }
  extend type Subscription {
    phasersUpdate(simulatorId: ID): [Phaser]
  }
`;

const resolver = {
  Phaser: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    }
  },
  Query: {
    phasers(root, { simulatorId }) {
      let returnVal = App.systems.filter(s => s.type === "Phasers");
      if (simulatorId) {
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      }
      return returnVal;
    },
    phaser(root, { id }) {
      return App.systems.find(s => s.id === id);
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    phasersUpdate: {
      resolve(rootValue, { simulatorId }) {
        let returnRes = rootValue;
        if (simulatorId)
          returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
        return returnRes;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("phasersUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
