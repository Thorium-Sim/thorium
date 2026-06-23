import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";
import {AdvancedTrainingConfig} from "../classes/advancedTraining";

function getStationConfig(stationSetID: string, stationName: string) {
  const stationSet = App.stationSets.find((s: any) => s.id === stationSetID);
  if (!stationSet) {
    return null;
  }
  return stationSet.stations.find((s: any) => s.name === stationName);
}

const schema = gql`
  type AdvancedTrainingRequiredAction {
    id: ID!
    eventName: String!
    args: JSON
  }

  type AdvancedTrainingSubChapter {
    id: ID!
    name: String!
    requiredActions: [AdvancedTrainingRequiredAction!]!
  }

  type AdvancedTrainingChapter {
    id: ID!
    name: String!
    cardComponent: String!
    mediaAsset: String
    autoOpenMedia: Boolean!
    autoAdvance: Boolean!
    autoLogin: String!
    cardSwitchBehavior: String!
    mediaSize: String!
    mediaPosition: String!
    subChapters: [AdvancedTrainingSubChapter!]!
  }

  type AdvancedTrainingConfig {
    enabled: Boolean!
    sequentialChapters: Boolean!
    stripPosition: String!
    chapters: [AdvancedTrainingChapter!]!
    inFlightChapters: [AdvancedTrainingChapter!]!
    loginChapter: AdvancedTrainingChapter
    completionChapter: AdvancedTrainingChapter
  }

  type AdvancedTrainingProgress {
    id: ID!
    clientId: ID!
    simulatorId: ID!
    stationName: String!
    activeChapterId: ID
    activeSubChapterId: ID
    completedChapterIds: [ID!]!
    completedSubChapterIds: [ID!]!
    observedActions: JSON
    globalObservedEvents: [String!]!
    mediaViewerOpen: Boolean!
    chapterListOpen: Boolean!
  }

  input AdvancedTrainingRequiredActionInput {
    id: ID
    eventName: String!
    args: JSON
  }

  input AdvancedTrainingSubChapterInput {
    id: ID
    name: String!
    requiredActions: [AdvancedTrainingRequiredActionInput!]
  }

  input AdvancedTrainingChapterInput {
    id: ID
    name: String!
    cardComponent: String!
    mediaAsset: String
    autoOpenMedia: Boolean
    autoAdvance: Boolean
    autoLogin: String
    cardSwitchBehavior: String
    mediaSize: String
    mediaPosition: String
    subChapters: [AdvancedTrainingSubChapterInput!]
  }

  input AdvancedTrainingConfigInput {
    enabled: Boolean
    sequentialChapters: Boolean
    stripPosition: String
    chapters: [AdvancedTrainingChapterInput!]
    inFlightChapters: [AdvancedTrainingChapterInput!]
    loginChapter: AdvancedTrainingChapterInput
    completionChapter: AdvancedTrainingChapterInput
  }

  extend type Station {
    advancedTraining: AdvancedTrainingConfig
  }

  extend type Client {
    advancedTrainingProgress: AdvancedTrainingProgress
  }

  extend type Query {
    advancedTrainingProgress(
      clientId: ID
      simulatorId: ID
    ): [AdvancedTrainingProgress!]!
  }

  extend type Mutation {
    """
    Save the full advanced training configuration for a station.
    """
    setStationAdvancedTraining(
      stationSetID: ID!
      stationName: String!
      config: AdvancedTrainingConfigInput!
    ): String

    """
    Toggle advanced training mode on a station set.
    """
    toggleAdvancedTrainingMode(
      stationSetID: ID!
      stationName: String!
      enabled: Boolean!
    ): String

    """
    Start an advanced training session for a client.
    Sets up progress tracking and activates the first chapter.
    """
    clientStartAdvancedTraining(clientId: ID!): String

    """
    Stop advanced training for a client.
    """
    clientStopAdvancedTraining(clientId: ID!): String

    """
    Crew pressed the help/question-mark widget. Resolves the crew's current card
    and jumps to the in-flight help chapter for that card (or the regular chapter
    for it), falling back to the default begin-training behavior if neither exists.
    """
    clientRequestTrainingHelp(clientId: ID!): String

    """
    Record a crew action during advanced training.
    Checks against required actions and may trigger sub-chapter/chapter completion.
    """
    clientAdvancedTrainingAction(
      clientId: ID!
      eventName: String!
      args: JSON
    ): String

    """
    Set the active chapter for a client (crew navigation or FD override).
    """
    advancedTrainingSetActiveChapter(clientId: ID!, chapterId: ID!): String

    """
    FD force-complete a sub-chapter for a client.
    """
    fdCompleteTrainingSubChapter(clientId: ID!, subChapterId: ID!): String

    """
    FD reset all training progress for a client.
    """
    fdResetTrainingProgress(clientId: ID!): String

    """
    Toggle the media viewer open/close for a client.
    """
    advancedTrainingToggleMediaViewer(clientId: ID!, open: Boolean!): String

    """
    Toggle the chapter list open/close for a client.
    """
    advancedTrainingToggleChapterList(clientId: ID!, open: Boolean!): String
  }

  extend type Subscription {
    advancedTrainingProgressUpdate(
      simulatorId: ID
    ): [AdvancedTrainingProgress!]!
    advancedTrainingConfigUpdate(stationSetID: ID): [StationSet!]!
  }
`;

const resolver = {
  Station: {
    advancedTraining(station: any) {
      return station.advancedTraining || null;
    },
  },
  Client: {
    advancedTrainingProgress(client: any) {
      return (
        App.advancedTrainingProgress?.find(
          (p: any) => p.clientId === client.id,
        ) || null
      );
    },
  },
  Query: {
    advancedTrainingProgress(_root: any, {clientId, simulatorId}: any) {
      let progress = App.advancedTrainingProgress || [];
      if (clientId) {
        progress = progress.filter((p: any) => p.clientId === clientId);
      }
      if (simulatorId) {
        progress = progress.filter((p: any) => p.simulatorId === simulatorId);
      }
      return progress;
    },
  },
  Mutation: {
    setStationAdvancedTraining(
      rootValue: any,
      {stationSetID, stationName, config}: any,
    ) {
      const station = getStationConfig(stationSetID, stationName);
      if (!station) {
        return "";
      }
      station.setAdvancedTraining(config);
      pubsub.publish("stationSetUpdate", App.stationSets);
      pubsub.publish("advancedTrainingConfigUpdate", App.stationSets);
      return "";
    },
    toggleAdvancedTrainingMode(
      rootValue: any,
      {stationSetID, stationName, enabled}: any,
    ) {
      const station = getStationConfig(stationSetID, stationName);
      if (!station) {
        return "";
      }
      if (!station.advancedTraining) {
        station.advancedTraining = new AdvancedTrainingConfig();
      }
      station.advancedTraining.setEnabled(enabled);
      pubsub.publish("stationSetUpdate", App.stationSets);
      pubsub.publish("advancedTrainingConfigUpdate", App.stationSets);
    },
    clientStartAdvancedTraining(rootValue: any, {clientId}: any) {
      // Handled by event handler
      return "";
    },
    clientStopAdvancedTraining(rootValue: any, {clientId}: any) {
      return "";
    },
    clientRequestTrainingHelp(rootValue: any, {clientId}: any) {
      // Handled by event handler
      return "";
    },
    clientAdvancedTrainingAction(
      rootValue: any,
      {clientId, eventName, args}: any,
    ) {
      return "";
    },
    advancedTrainingSetActiveChapter(
      rootValue: any,
      {clientId, chapterId}: any,
    ) {
      return "";
    },
    fdCompleteTrainingSubChapter(
      rootValue: any,
      {clientId, subChapterId}: any,
    ) {
      return "";
    },
    fdResetTrainingProgress(rootValue: any, {clientId}: any) {
      return "";
    },
    advancedTrainingToggleMediaViewer(rootValue: any, {clientId, open}: any) {
      return "";
    },
    advancedTrainingToggleChapterList(rootValue: any, {clientId, open}: any) {
      return "";
    },
  },
  Subscription: {
    advancedTrainingProgressUpdate: {
      resolve(rootValue: any, {simulatorId}: any) {
        if (simulatorId) {
          return rootValue.filter((p: any) => p.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => {
          const id = uuid.v4();
          process.nextTick(() => {
            pubsub.publish(id, App.advancedTrainingProgress || []);
          });
          return pubsub.asyncIterator([id, "advancedTrainingProgressUpdate"]);
        },
        (rootValue: any) => !!(rootValue && rootValue.length >= 0),
      ),
    },
    advancedTrainingConfigUpdate: {
      resolve(rootValue: any, {stationSetID}: any) {
        if (stationSetID) {
          return rootValue.filter((s: any) => s.id === stationSetID);
        }
        return rootValue;
      },
      subscribe: () => {
        const id = uuid.v4();
        process.nextTick(() => {
          pubsub.publish(id, App.stationSets);
        });
        return pubsub.asyncIterator([id, "advancedTrainingConfigUpdate"]);
      },
    },
  },
};

export default {schema, resolver};
