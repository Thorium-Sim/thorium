import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Engine implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    power: Power
    name: String
    displayName: String
    stealthFactor: Float
    speeds: [Speed]
    speed: Int
    previousSpeed: Int
    velocity: Float
    speedFactor: Float
    acceleration: Float
    useAcceleration: Boolean
    heat: Float
    damage: Damage
    on: Boolean
    coolant: Float
    locations: [Room]
  }
  type Speed {
    text: String
    number: Float
    velocity: Float
    optimal: Boolean
  }
  input SpeedInput {
    text: String
    number: Float
    velocity: Float
    optimal: Boolean
  }
  extend type Query {
    engines(simulatorId: ID): [Engine]
    engine(id: ID!): Engine
  }
  extend type Mutation {
    addSpeed(id: ID, name: String, speed: [SpeedInput]!): String
    setSpeed(id: ID!, speed: Int!, on: Boolean): String
    setEngineSpeeds(id: ID!, speeds: [SpeedInput]!): String
    # Applies to any system
    addHeat(id: ID!, heat: Float): String
    addCoolant(id: ID!, coolant: Float): String
    setHeatRate(id: ID!, rate: Float): String

    engineCool(id: ID!, state: Boolean): String
    setEngineAcceleration(id: ID!, acceleration: Float!): String
    setEngineUseAcceleration(id: ID!, useAcceleration: Boolean!): String
    setEngineSpeedFactor(id: ID!, speedFactor: Float!): String
  }
  extend type Subscription {
    speedChange(simulatorId: ID): Engine
    heatChange(simulatorId: ID): Engine
    engineUpdate(simulatorId: ID): Engine
  }
`;

// We define all of the resolvers necessary for
// the functionality in this file. These will be
// deep merged with the other resolvers.
const resolver = {
  Engine: {
    velocity(rootValue) {
      const sim = App.simulators.find(s => s.id === rootValue.simulatorId);
      return sim ? sim.ship.speed : 0;
    },
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    }
  },
  Query: {
    engines(root, { simulatorId }) {
      return App.systems.filter(system => {
        return system.type === "Engine" && system.simulatorId === simulatorId;
      });
    },
    engine(root, { id }) {
      return App.systems.find(s => s.id === id);
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    speedChange: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId)
          return rootValue.simulatorId === simulatorId && rootValue;
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("speedChange"),
        rootValue => !!rootValue
      )
    },
    heatChange: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          return rootValue.simulatorId === simulatorId && rootValue;
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("heatChange"),
        rootValue => !!rootValue
      )
    },
    engineUpdate: {
      resolve(rootValue) {
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("engineUpdate"),
        (rootValue, { simulatorId }) => {
          return rootValue.simulatorId === simulatorId;
        }
      )
    }
  }
};

export default { schema, resolver };
