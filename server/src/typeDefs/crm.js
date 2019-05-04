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
    fighterIcon: String
    enemyIcon: String
    attacking: Boolean
    interval: Float
    phasers: [CrmPhaserShot]
    torpedos: [CrmTorpedo]
  }
  type CrmPhaserShot {
    target: Coordinates
    destination: Coordinates
  }
  type CrmTorpedo {
    id: ID
    position: Coordinates
    destroyed: Boolean
  }
  type CrmFighter {
    id: ID
    clientId: ID
    client: Client
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
    frags: Int
  }
  extend type Query {
    crm(simulatorId: ID!): Crm
    crmFighter(simulatorId: ID!, clientId: ID!): CrmFighter
  }
  extend type Mutation {
    crmSetActivated(id: ID!, state: Boolean!): String
    crmSetPassword(id: ID!, password: String!): String
    crmAddEnemy(id: ID!): String
    crmSetAcceleration(
      id: ID!
      clientId: ID!
      acceleration: CoordinatesInput!
    ): String
    crmSetPhaserCharge(id: ID!, clientId: ID!, phaser: Float!): String
    crmSetShieldState(id: ID!, clientId: ID!, shield: Boolean!): String
    crmLoadTorpedo(id: ID!, clientId: ID!): String
    crmFireTorpedo(id: ID!, clientId: ID!, target: ID!): String
    crmFirePhaser(id: ID!, clientId: ID!, target: ID!): String
    crmStopPhaser(id: ID!, clientId: ID!): String
    crmSetFighterDocked(id: ID!, clientId: ID!, docked: Boolean!): String
    crmRestockTorpedos(id: ID!, clientId: ID!): String
    crmSetAttacking(id: ID!, attacking: Boolean!): String
    crmSetFighterImage(id: ID!, image: String!): String
    crmSetFighterIcon(id: ID!, image: String!): String
    crmSetEnemyIcon(id: ID!, image: String!): String
    crmSetEnemyCount(id: ID!, count: Int!): String
    crmRestoreFighter(id: ID!, clientId: ID!): String
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
          return { target: f.position, destination: t.position };
        });
      return phasers;
    }
  },
  CrmFighter: {
    client(fighter) {
      return App.clients.find(c => c.id === fighter.clientId);
    },
    icon(fighter) {
      const key = fighter.type === "fighter" ? "fighterIcon" : "enemyIcon";
      const crm = App.systems.find(
        s => s.simulatorId === fighter.simulatorId && s.class === "Crm"
      );
      return crm[key];
    },
    attacking(fighter) {
      return App.systems.find(
        s => s.simulatorId === fighter.simulatorId && s.class === "Crm"
      ).attacking;
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
