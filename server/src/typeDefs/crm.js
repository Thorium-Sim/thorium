import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
import App from "../app";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Crm implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    damage: Damage
    power: Power
    stealthFactor: Float
    locations: [Room]
    password: String
    activated: Boolean
    fighterImage: String
    fighters: [CrmFighter]
    enemies: [CrmFighter]
    fighterCount: Int
    enemyCount: Int
    fighterDestroyedCount: Int
    enemyDestroyedCount: Int
    interval: Float
    phasers: [CrmPhaserShot]
  }
  type CrmPhaserShot {
    target: Coordinates
    destination: Coordinates
  }
  type CrmFighter {
    id: ID
    clientId: ID
    icon: String
    size: Float
    speed: Float
    strength: Float
    attacking: Boolean
    hull: Float
    shield: Float
    shieldRaised: Boolean
    phaserLevel: Float
    torpedoCount: Int
    torpedoLoaded: Boolean
    destroyed: Boolean
    docked: Boolean
    position: Coordinates
    velocity: Coordinates
  }
  extend type Query {
    crm(simulatorId: ID!): Crm
    crmFighter(simulatorId: ID!, clientId: ID!): CrmFighter
  }
  extend type Mutation {
    crmSetActivated(id: ID!, state: Boolean!): String
    crmSetPassword(id: ID!, password: String!): String
    crmAddEnemy(id: ID!): String
    crmSetVelocity(id: ID!, clientId: ID!, velocity: CoordinatesInput!): String
    crmSetPhaserCharge(id: ID!, clientId: ID!, phaser: Float!): String
    crmSetShieldState(id: ID!, clientId: ID!, shield: Boolean!): String
    crmLoadTorpedo(id: ID!, clientId: ID!): String
    crmFireTorpedo(id: ID!, clientId: ID!, target: ID!): String
    crmFirePhaser(id: ID!, clientId: ID!, target: ID!): String
    crmStopPhaser(id: ID!, clientId: ID!): String
  }
  extend type Subscription {
    crmUpdate(simulatorId: ID): Crm
    crmMovementUpdate(simulatorId: ID!): Crm
    crmFighterUpdate(simulatorId: ID!, clientId: ID!): CrmFighter
  }
`;

const resolver = {
  Crm: {
    phasers(crm) {
      const allFighters = crm.fighters.concat(crm.enemies);
      const phasers = allFighters
        .filter(f => f.phaserTarget)
        .map(f => {
          const t = allFighters.find(e => e.id === f.phaserTarget);
          return { target: f.position, destination: t.destination };
        });
      return phasers;
    }
  },
  Query: {
    crm(rootQuery, { simulatorId }) {
      return App.systems.find(
        s => s.simulatorId === simulatorId && s.class === "Crm"
      );
    },
    crmFighter(rootQuery, { simulatorId, clientId }) {
      // If the client's fighter doesn't exist yet, create it
      const crm = App.systems.find(
        s => s.simulatorId === simulatorId && s.class === "Crm"
      );
      if (!crm) return null;
      let fighter = crm.fighters.find(c => c.clientId === clientId);
      if (!fighter) {
        fighter = crm.addFighter({ clientId });
      }
      return fighter;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    crmUpdate: {
      resolve(rootQuery) {
        return rootQuery;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("crmUpdate"),
        (rootValue, { simulatorId }) => {
          return rootValue.simulatorId === simulatorId;
        }
      )
    },
    crmFighterUpdate: {
      resolve(rootQuery) {
        return rootQuery;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("crmFighterUpdate"),
        (rootValue, { simulatorId, clientId }) => {
          return (
            rootValue.simulatorId === simulatorId &&
            rootValue.clientId === clientId
          );
        }
      )
    },
    crmMovementUpdate: {
      resolve(rootQuery) {
        return rootQuery;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("crmMovementUpdate"),
        (rootValue, { simulatorId }) => {
          return rootValue.simulatorId === simulatorId;
        }
      )
    }
  }
};

export default { schema, resolver };
