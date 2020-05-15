import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";
import {missionRequirements} from "../helpers/missionRequirements";

const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Mission {
    id: ID!
    name: String
    description: String
    category: String
    timeline: [TimelineStep!]!
    simulators: [Simulator]
    aux: Boolean
    extraRequirements: SimulatorCapabilities
    requirements(all: Boolean): SimulatorCapabilities
  }
  input MacroInput {
    stepId: ID
    event: String
    args: String
    delay: Int
    noCancelOnReset: Boolean
  }
  input RequirementInput {
    cards: [String]
    systems: [String]
  }
  type TimelineStep {
    id: ID!
    name: String!
    description: String
    order: Int
    timelineItems: [TimelineItem!]!
  }

  type TimelineItem {
    id: ID!
    name: String
    type: String
    event: String!
    needsConfig: Boolean
    args: String
    delay: Int
    noCancelOnReset: Boolean
  }

  enum TIMELINE_ITEM_CONFIG_TYPE {
    client
    station
  }
  input TimelineItemInput {
    id: ID
    name: String
    type: String
    event: String
    args: String
    delay: Int
    noCancelOnReset: Boolean
  }

  type TimelineInstance {
    id: ID
    mission: Mission
    currentTimelineStep: Int
    executedTimelineSteps: [ID]
  }
  extend type Query {
    missions(id: ID, aux: Boolean): [Mission!]!
    auxTimelines(simulatorId: ID!): [TimelineInstance]
  }
  extend type Mutation {
    createMission(name: String!): String
    removeMission(missionId: ID!): String
    editMission(
      missionId: ID!
      name: String
      description: String
      category: String
      aux: Boolean
      simulators: [ID]
    ): String
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
    timelineDuplicateItem(
      missionId: ID!
      timelineStepId: ID!
      timelineItemId: ID!
    ): String

    # Aux Timelines
    """
    Macro: Timelines: Start Aux Timeline
    """
    startAuxTimeline(simulatorId: ID!, missionId: ID!): ID
    setAuxTimelineStep(simulatorId: ID!, timelineId: ID!, step: Int!): String
    missionSetExtraRequirements(
      missionId: ID!
      requirements: RequirementInput!
    ): String
  }
  extend type Subscription {
    missionsUpdate(missionId: ID, aux: Boolean): [Mission!]!
    auxTimelinesUpdate(simulatorId: ID!): [TimelineInstance]
  }
`;

let logged = false;
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
    aux(rootValue) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      return mission.aux;
    },
    simulators(rootValue) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      return mission.simulators.map(id =>
        App.simulators.find(s => s.id === id),
      );
    },
    timeline(rootValue) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      return mission.timeline;
    },
    requirements(rootValue, {all}) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      const reqs = missionRequirements(mission);
      if (!all) {
        return reqs;
      }
      return {
        ...reqs,
        cards: reqs.cards
          .concat(mission.extraRequirements.cards)
          .filter((a, i, arr) => arr.indexOf(a) === i),
        systems: reqs.systems
          .concat(mission.extraRequirements.systems)
          .filter((a, i, arr) => arr.indexOf(a) === i),
      };
    },
  },
  TimelineInstance: {
    mission(timeline) {
      return App.missions.find(m => m.id === timeline.missionId);
    },
  },
  TimelineItem: {
    needsConfig({event}) {
      const {schema} = require("../bootstrap/apollo");
      const field = schema.getMutationType().getFields()[event];
      return Boolean(
        field?.args?.find(a => a.description.indexOf("Dynamic") > -1),
      );
    },
  },
  MacroAction: {
    needsConfig({event}) {
      const {schema} = require("../bootstrap/apollo");
      const field = schema.getMutationType().getFields()[event];

      return Boolean(
        field?.args?.find(a => a.description.indexOf("Dynamic") > -1),
      );
    },
  },
  Query: {
    missions(root, {id, aux}) {
      if (id) return App.missions.filter(m => m.id === id);
      if (aux || aux === false) {
        return App.missions.filter(m => m.aux === aux);
      }
      return App.missions;
    },
    auxTimelines(root, {simulatorId}) {
      const sim = App.simulators.find(s => s.id === simulatorId);
      return sim && sim.timelines;
    },
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    missionsUpdate: {
      resolve: (rootValue, {missionId, aux}) => {
        if (missionId) {
          return rootValue.filter(m => m.id === missionId);
        }
        if (aux) {
          return rootValue.filter(m => (aux ? m.aux : !m.aux));
        }
        return rootValue;
      },
      subscribe: withFilter(
        (rootValue, {missionId, aux}) => {
          const id = uuid.v4();
          process.nextTick(() => {
            let returnVal = App.missions;
            if (missionId)
              returnVal = returnVal.filter(s => s.id === missionId);
            if (aux) returnVal = returnVal.filter(m => (aux ? m.aux : !m.aux));
            pubsub.publish(id, returnVal);
          });
          return pubsub.asyncIterator([id, "missionsUpdate"]);
        },
        (rootValue, {missionId}) => {
          if (missionId) {
            return !!rootValue.find(m => m.id === missionId);
          }
          return true;
        },
      ),
    },
    auxTimelinesUpdate: {
      resolve: (rootValue, {missionId}) => {
        return rootValue.timelines;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("auxTimelinesUpdate"),
        (rootValue, {simulatorId}) => {
          return rootValue.id === simulatorId;
        },
      ),
    },
  },
};

export default {schema, resolver};
