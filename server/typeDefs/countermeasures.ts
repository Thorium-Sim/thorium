import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import App from "../app";
import {moduleTypes} from "../classes/Countermeasure";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Countermeasures implements SystemInterface {
    id: ID
    simulatorId: ID
    class: String
    type: String
    name: String
    displayName: String
    upgradeName: String
    upgraded: Boolean
    damage: Damage
    power: Power
    stealthFactor: Float
    locations: [Room]

    materials: CountermeasureResources
    slots: CountermeasureSlot
    launched: [Countermeasure]
  }
  type Countermeasure {
    id: ID
    name: String
    modules: [CountermeasureModule]
    locked: Boolean
    active: Boolean
    building: Boolean
    totalPowerUsed: Float
    readyToLaunch: Boolean
    powerUsage: Float
    availablePower: Float
  }
  type CountermeasureResources {
    copper: Int
    titanium: Int
    carbon: Int
    plastic: Int
    plasma: Int
  }
  type CountermeasureConfigOptions {
    type: String
    label: String
  }
  type CountermeasureModule {
    id: ID
    name: String
    description: String
    powerRequirement: Int
    resourceRequirements: CountermeasureResources
    configurationOptions: [CountermeasureConfigOptions]
    config: JSON
    buildProgress: Float
    activated: Boolean
  }
  enum CountermeasureSlot {
    slot1
    slot2
    slot3
    slot4
    slot5
    slot6
    slot7
    slot8
  }

  extend type Query {
    countermeasures(simulatorId: ID!): Countermeasures
    countermeasureModuleType: [CountermeasureModule]
  }
  extend type Mutation {
    countermeasuresCreateCountermeasure(
      id: ID!
      slot: CountermeasureSlot
      name: String
    ): Countermeasure
    countermeasuresRemoveCountermeasure(
      id: ID!
      slot: CountermeasureSlot!
    ): String
    countermeasuresLaunchCountermeasure(
      id: ID!
      slot: CountermeasureSlot!
    ): String
    countermeasuresLaunchUnlockedCountermeasures(id: ID!): String
    countermeasuresBuildCountermeasure(
      id: ID!
      slot: CountermeasureSlot!
    ): String
    countermeasuresAddModule(
      id: ID!
      slot: CountermeasureSlot!
      moduleType: String!
    ): Countermeasure
    countermeasuresRemoveModule(
      id: ID!
      slot: CountermeasureSlot!
      moduleId: ID!
    ): String
    countermeasuresConfigureModule(
      id: ID!
      slot: CountermeasureSlot!
      moduleId: ID!
      config: JSON!
    ): String
  }
  extend type Subscription {
    countermeasuresUpdate(simulatorId: ID!): Countermeasures
  }
`;

const resolver = {
  Query: {
    countermeasures(rootQuery, {simulatorId}) {
      return App.systems.find(
        s => s.simulatorId === simulatorId && s.class === "Countermeasures",
      );
    },
    countermeasureModuleType() {
      return moduleTypes;
    },
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    countermeasuresUpdate: {
      resolve(rootQuery) {
        return rootQuery;
      },
      subscribe: withFilter(
        (_rootValue, {simulatorId}) => {
          process.nextTick(() => {
            const data = App.systems.find(
              s =>
                s.simulatorId === simulatorId && s.class === "Countermeasures",
            );
            pubsub.publish("countermeasuresUpdate", data);
          });
          return pubsub.asyncIterator("countermeasuresUpdate");
        },
        (rootValue, args) => {
          return rootValue.simulatorId === args.simulatorId;
        },
      ),
    },
  },
};

export default {schema, resolver};
