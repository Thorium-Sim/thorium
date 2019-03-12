import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Mission {
    id: ID
    name: String
    description: String
    timeline: [TimelineStep]
  }
  input MacroInput {
    stepId: ID
    event: String
    args: String
    delay: Int
  }
  type TimelineStep {
    id: ID!
    name: String
    description: String
    order: Int
    timelineItems: [TimelineItem]
  }

  type TimelineItem {
    id: ID
    name: String
    type: String
    event: String
    args: String
    delay: Int
  }

  input TimelineItemInput {
    id: ID
    name: String
    type: String
    event: String
    args: String
    delay: Int
  }
  extend type Query {
    missions(id: ID): [Mission]
  }
  extend type Mutation {
    createMission(name: String!): String
    removeMission(missionId: ID!): String
    editMission(missionId: ID!, name: String, description: String): String
    importMission(jsonString: String!): String
    addTimelineStep(
      simulatorId: ID
      missionId: ID
      name: String!
      description: String
    ): ID
    removeTimelineStep(
      simulatorId: ID
      missionId: ID
      timelineStepId: ID!
    ): String
    reorderTimelineStep(
      simulatorId: ID
      missionId: ID
      timelineStepId: ID!
      order: Int!
    ): String
    updateTimelineStep(
      simulatorId: ID
      missionId: ID
      timelineStepId: ID!
      name: String
      description: String
    ): String
    addTimelineItemToTimelineStep(
      simulatorId: ID
      missionId: ID
      timelineStepId: ID!
      timelineItem: TimelineItemInput!
    ): String
    removeTimelineStepItem(
      simulatorId: ID
      missionId: ID
      timelineStepId: ID!
      timelineItemId: ID!
    ): String
    updateTimelineStepItem(
      simulatorId: ID
      missionId: ID
      timelineStepId: ID!
      timelineItemId: ID!
      updateTimelineItem: TimelineItemInput!
    ): String
    duplicateTimelineStep(missionId: ID!, timelineStepId: ID!): String
  }
  extend type Subscription {
    missionsUpdate(missionId: ID): [Mission]
  }
`;

const resolver = {
  Mission: {
    id(rootValue) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      return mission.id;
    },
    name(rootValue) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      return mission.name;
    },
    description(rootValue) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      return mission.description;
    },
    timeline(rootValue) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      return mission.timeline;
    }
  },
  Query: {
    missions(root, { id }) {
      if (id) return App.missions.filter(m => m.id === id);
      return App.missions;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    missionsUpdate: {
      resolve: (rootValue, { missionId }) => {
        if (missionId) {
          return rootValue.filter(m => m.id === missionId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("missionsUpdate"),
        (rootValue, { missionId }) => {
          if (missionId) {
            return !!rootValue.find(m => m.id === missionId);
          }
          return true;
        }
      )
    }
  }
};

export default { schema, resolver };
