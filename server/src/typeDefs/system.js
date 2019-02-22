import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
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
  }
  extend type Mutation {
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
    updateSystemName(systemId: ID!, name: String, displayName: String): String
    updateSystemRooms(systemId: ID!, locations: [ID]): String
  }
  extend type Subscription {
    systemsUpdate(
      simulatorId: ID
      type: String
      power: Boolean
      heat: Boolean
      extra: Boolean
      damageWhich: String
    ): [System]
  }
`;

// We define all of the resolvers necessary for
// the functionality in this file. These will be
// deep merged with the other resolvers.
const resolver = {
  System: {
    isochips(rootValue) {
      return App.isochips.filter(i => i.system === rootValue.id);
    },
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    }
  },
  Query: {
    system(rootValue, { id }) {
      const sys = App.systems.find(s => s.id === id);
      if (!sys) return App.dockingPorts.find(s => s.id === id);
      return sys;
    },
    systems(
      rootValue,
      { simulatorId, type, power, heat, extra = false, damageWhich }
    ) {
      let returnSystems = App.systems;
      if (extra === false) {
        returnSystems = returnSystems.filter(s => s.extra === false);
      }
      if (simulatorId) {
        returnSystems = returnSystems.filter(
          s => s.simulatorId === simulatorId
        );
      }
      if (type) {
        returnSystems = returnSystems.filter(s => s.type === type);
      }
      if (power) {
        returnSystems = returnSystems.filter(
          s => s.power.power || s.power.power === 0
        );
      }
      if (heat) {
        returnSystems = returnSystems.filter(s => s.heat || s.heat === 0);
      }
      if (damageWhich) {
        returnSystems = returnSystems.filter(
          s => s.damage.which === damageWhich
        );
      }
      return returnSystems;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    systemsUpdate: {
      resolve(
        rootValue,
        { simulatorId, type, power, heat, extra = false, damageWhich }
      ) {
        let returnSystems = rootValue;
        if (extra === false) {
          returnSystems = returnSystems.filter(s => s.extra === false);
        }
        if (simulatorId) {
          returnSystems = returnSystems.filter(
            s => s.simulatorId === simulatorId
          );
        }
        if (type) {
          returnSystems = returnSystems.filter(s => s.type === type);
        }
        if (power) {
          returnSystems = returnSystems.filter(
            s => s.power.power || s.power.power === 0
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
        () => pubsub.asyncIterator("systemsUpdate"),
        rootValue => !!(rootValue && rootValue.length) > 0
      )
    }
  }
};

export default { schema, resolver };
