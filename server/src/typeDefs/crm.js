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
    fighters: [CrmFighter]
    enemies: [CrmFighter]
    fighterCount: Int
    enemyCount: Int
    fighterDestroyedCount: Int
    enemyDestroyedCount: Int
    interval: Float
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
  }
  extend type Mutation {
    crmSetActivated(id: ID!, state: Boolean!): String
    crmSetPassword(id: ID!, password: String!): String
    crmAddEnemy(id: ID!): String
  }
  extend type Subscription {
    crmUpdate(simulatorId: ID): Crm
  }
`;

const resolver = {
  Query: {
    crm(rootQuery, { simulatorId }) {
      return App.systems.find(
        s => s.simulatorId === simulatorId && s.class === "Crm"
      );
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
    }
  }
};

export default { schema, resolver };
