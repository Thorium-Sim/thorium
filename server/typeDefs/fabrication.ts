import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import App from "../app";
import uuid from "uuid";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  enum FABRICATION_CATEGORY {
    repair
    weapon
    probe
    upgrade
    science
    misc
  }
  enum FABRICATION_JOB_STATUS {
    active
    complete
    cancelled
  }
  type FabricationRecipeItem {
    name: String!
    count: Int!
    consumed: Boolean!
  }
  input FabricationRecipeItemInput {
    name: String!
    count: Int!
    consumed: Boolean
  }
  type FabricationRecipeOutput {
    name: String!
    count: Int!
    metadata: InventoryMetadata
  }
  input FabricationRecipeOutputInput {
    name: String!
    count: Int!
    metadata: InventoryMetadataInput
  }
  type FabricationRecipe {
    id: ID!
    simulatorId: ID
    name: String!
    description: String!
    category: FABRICATION_CATEGORY!
    inputs: [FabricationRecipeItem!]!
    output: FabricationRecipeOutput!
    duration: Int!
    secret: Boolean!
    discovered: Boolean!
    hint: String!
    hintVisible: Boolean!
    nearMiss: Boolean!
    nearMissCount: Int!
  }
  input FabricationRecipeInput {
    name: String
    description: String
    category: FABRICATION_CATEGORY
    inputs: [FabricationRecipeItemInput!]
    output: FabricationRecipeOutputInput
    duration: Int
    secret: Boolean
    hint: String
    nearMiss: Boolean
  }
  type FabricationSettings {
    id: ID!
    enabled: Boolean!
    jobLimit: Int!
  }
  type FabricationJob {
    id: ID!
    simulatorId: ID
    recipeId: ID
    recipeName: String!
    roomId: ID
    room: Room
    inputs: [FabricationRecipeItem!]!
    output: FabricationRecipeOutput!
    duration: Int!
    elapsed: Float!
    progress: Float!
    status: FABRICATION_JOB_STATUS!
  }
  extend type Query {
    fabricationRecipes(simulatorId: ID!): [FabricationRecipe!]!
    fabricationJobs(simulatorId: ID!): [FabricationJob!]!
    fabricationSettings(simulatorId: ID!): FabricationSettings!
  }
  extend type Mutation {
    """
    Macro: Fabrication: Add Recipe
    """
    addFabricationRecipe(
      simulatorId: ID!
      recipe: FabricationRecipeInput!
    ): String
    updateFabricationRecipe(id: ID!, recipe: FabricationRecipeInput!): String
    removeFabricationRecipe(id: ID!): String
    """
    Macro: Fabrication: Reveal Secret Recipe
    """
    revealFabricationRecipe(simulatorId: ID!, recipe: String!): String
    """
    Macro: Fabrication: Show Recipe Hint
    """
    showFabricationRecipeHint(simulatorId: ID!, recipe: String!): String
    """
    Macro: Fabrication: Set Fabricator Status
    """
    setFabricationEnabled(simulatorId: ID!, enabled: Boolean!): String
    setFabricationJobLimit(simulatorId: ID!, limit: Int!): String
    startFabrication(
      simulatorId: ID!
      """
      Omit to fabricate ship-wide (no designated fabrication rooms) or to
      default to the first designated fabrication room.
      """
      roomId: ID
      inputs: [FabricationRecipeItemInput!]!
      count: Int
    ): String
    cancelFabricationJob(id: ID!): String
    completeFabricationJob(id: ID!): String
    clearFabricationJobs(simulatorId: ID!): String
  }
  extend type Subscription {
    fabricationRecipesUpdate(simulatorId: ID!): [FabricationRecipe!]!
    fabricationJobsUpdate(simulatorId: ID!): [FabricationJob!]!
    fabricationSettingsUpdate(simulatorId: ID!): FabricationSettings!
  }
`;

export function getFabricationSettings(simulatorId: string) {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  return {
    id: simulatorId,
    enabled: simulator ? simulator.fabricationEnabled !== false : true,
    jobLimit: simulator?.fabricationJobLimit || 0,
  };
}

const resolver = {
  FabricationJob: {
    room(job) {
      return App.rooms.find(r => r.id === job.roomId);
    },
    progress(job) {
      return job.progress;
    },
  },
  Query: {
    fabricationRecipes(rootQuery, {simulatorId}) {
      return App.fabricationRecipes.filter(r => r.simulatorId === simulatorId);
    },
    fabricationJobs(rootQuery, {simulatorId}) {
      return App.fabricationJobs.filter(j => j.simulatorId === simulatorId);
    },
    fabricationSettings(rootQuery, {simulatorId}) {
      return getFabricationSettings(simulatorId);
    },
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    fabricationRecipesUpdate: {
      resolve(rootValue, {simulatorId}) {
        return rootValue.filter(r => r.simulatorId === simulatorId);
      },
      subscribe: withFilter(
        (_rootValue, {simulatorId}) => {
          const id = uuid.v4();
          process.nextTick(() => {
            pubsub.publish(id, App.fabricationRecipes);
          });
          return pubsub.asyncIterator([id, "fabricationRecipesUpdate"]);
        },
        // Always deliver — the resolve function filters by simulator, and an
        // empty result still matters (e.g. the last recipe was removed).
        () => true,
      ),
    },
    fabricationJobsUpdate: {
      resolve(rootValue, {simulatorId}) {
        return rootValue.filter(j => j.simulatorId === simulatorId);
      },
      subscribe: withFilter(
        (_rootValue, {simulatorId}) => {
          const id = uuid.v4();
          process.nextTick(() => {
            pubsub.publish(id, App.fabricationJobs);
          });
          return pubsub.asyncIterator([id, "fabricationJobsUpdate"]);
        },
        () => true,
      ),
    },
    fabricationSettingsUpdate: {
      resolve(rootValue) {
        return rootValue;
      },
      subscribe: withFilter(
        (_rootValue, {simulatorId}) => {
          const id = uuid.v4();
          process.nextTick(() => {
            pubsub.publish(id, getFabricationSettings(simulatorId));
          });
          return pubsub.asyncIterator([id, "fabricationSettingsUpdate"]);
        },
        (rootValue, {simulatorId}) => {
          return rootValue?.id === simulatorId;
        },
      ),
    },
  },
};

export default {schema, resolver};
