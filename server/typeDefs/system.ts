import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import * as Classes from "../classes";
import uuid from "uuid";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  interface SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    upgradeName: String
    upgraded: Boolean
    damage: Damage
    power: Power
    stealthFactor: Float
    locations: [Room]
  }

  interface HeatInterface {
    heat: Float
    coolant: Float
  }

  # Generic system type. Give information available to all systems.
  type System implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    upgradeName: String
    wing: String
    upgraded: Boolean
    upgradeMacros: [TimelineItem]
    upgradeBoard: ID

    extra: Boolean
    damage: Damage
    power: Power
    stealthFactor: Float
    heat: Float
    coolant: Float
    heatRate: Float
    isochips: [Isochip]
    locations: [Room]
    requiredDamageSteps: [DamageStep]
    optionalDamageSteps: [DamageStep]
  }

  extend type Query {
    systems(
      simulatorId: ID
      type: String
      power: Boolean
      heat: Boolean
      extra: Boolean
      damageWhich: String
    ): [System]
    system(id: ID!): System
    allSystems: [String!]!
  }
  extend type Mutation {
    """
    Macro: Systems: Add Extra Report to Simulator
    """
    addExtraReportToSimulator(
      simulatorId: ID!
      name: String!
      which: String
    ): String
    addSystemToSimulator(
      simulatorId: ID!
      className: String!
      params: String!
    ): String
    removeSystemFromSimulator(
      systemId: ID
      simulatorId: ID
      type: String
    ): String
    updateSystemName(
      systemId: ID!
      name: String
      displayName: String
      upgradeName: String
    ): String
    updateSystemUpgradeMacros(
      systemId: ID!
      upgradeMacros: [TimelineItemInput]
    ): String
    updateSystemUpgradeBoard(systemId: ID!, upgradeBoard: ID): String

    upgradeSystem(systemId: ID!): String
    updateSystemRooms(systemId: ID!, locations: [ID]): String
    systemSetWing(systemId: ID!, wing: String!): String
  }
  extend type Subscription {
    systemsUpdate(
      simulatorId: ID
      type: String
      power: Boolean
      heat: Boolean
      extra: Boolean
      damageWhich: String
    ): [System!]!
  }
`;

const resolver = {
  System: {
    isochips(rootValue) {
      return App.isochips.filter(i => i.system === rootValue.id);
    },
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r),
      );
    },
  },
  Query: {
    system(rootValue, {id}) {
      const sys = App.systems.find(s => s.id === id);
      if (!sys) return App.dockingPorts.find(s => s.id === id);
      return sys;
    },
    allSystems() {
      return Object.keys(Classes);
    },
    systems(
      rootValue,
      {simulatorId, type, power, heat, extra = false, damageWhich},
    ) {
      let returnSystems = App.systems;
      if (extra === false) {
        returnSystems = returnSystems.filter(s => s.extra === false);
      }
      if (simulatorId) {
        returnSystems = returnSystems.filter(
          s => s.simulatorId === simulatorId,
        );
      }
      if (type) {
        returnSystems = returnSystems.filter(s => s.type === type);
      }
      if (power) {
        returnSystems = returnSystems.filter(
          s => s?.power?.power || s?.power?.power === 0,
        );
      }
      if (heat) {
        returnSystems = returnSystems.filter(s => s.heat || s.heat === 0);
      }
      if (damageWhich) {
        returnSystems = returnSystems.filter(
          s => s.damage.which === damageWhich,
        );
      }
      return returnSystems;
    },
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    systemsUpdate: {
      resolve(
        rootValue,
        {simulatorId, type, power, heat, extra = false, damageWhich},
      ) {
        let returnSystems = rootValue;
        if (extra === false) {
          returnSystems = returnSystems.filter(s => s.extra === false);
        }
        if (simulatorId) {
          returnSystems = returnSystems.filter(
            s => s.simulatorId === simulatorId,
          );
        }
        if (type) {
          returnSystems = returnSystems.filter(s => s.type === type);
        }
        if (power) {
          returnSystems = returnSystems.filter(
            s => s?.power?.power || s?.power?.power === 0,
          );
        }
        if (heat) {
          returnSystems = returnSystems.filter(s => s.heat || s.heat === 0);
        }
        if (damageWhich) {
          returnSystems = returnSystems.filter(s => {
            return s.damage.which === damageWhich;
          });
        }
        return returnSystems;
      },
      subscribe: withFilter(
        (rootValue, {simulatorId, template}) => {
          const id = uuid.v4();
          process.nextTick(() => {
            let returnVal = App.systems;
            pubsub.publish(id, returnVal);
          });
          return pubsub.asyncIterator([id, "systemsUpdate"]);
        },
        rootValue => rootValue?.length > 0,
      ),
    },
  },
};

export default {schema, resolver};
