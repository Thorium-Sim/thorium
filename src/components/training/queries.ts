import gql from "graphql-tag.macro";

// --- Fragments ---

export const ADVANCED_TRAINING_PROGRESS_FRAGMENT = gql`
  fragment AdvancedTrainingProgressFragment on AdvancedTrainingProgress {
    id
    clientId
    simulatorId
    stationName
    activeChapterId
    activeSubChapterId
    completedChapterIds
    completedSubChapterIds
    observedActions
    globalObservedEvents
    mediaViewerOpen
    chapterListOpen
  }
`;

export const ADVANCED_TRAINING_CONFIG_FRAGMENT = gql`
  fragment AdvancedTrainingConfigFragment on AdvancedTrainingConfig {
    enabled
    chapters {
      id
      name
      cardComponent
      mediaAsset
      autoOpenMedia
      autoAdvance
      cardSwitchBehavior
      subChapters {
        id
        name
        requiredActions {
          id
          eventName
          args
        }
      }
    }
  }
`;

// --- Mutations ---

export const START_ADVANCED_TRAINING = gql`
  mutation ClientStartAdvancedTraining($clientId: ID!) {
    clientStartAdvancedTraining(clientId: $clientId)
  }
`;

export const STOP_ADVANCED_TRAINING = gql`
  mutation ClientStopAdvancedTraining($clientId: ID!) {
    clientStopAdvancedTraining(clientId: $clientId)
  }
`;

export const ADVANCED_TRAINING_ACTION = gql`
  mutation ClientAdvancedTrainingAction(
    $clientId: ID!
    $eventName: String!
    $args: JSON
  ) {
    clientAdvancedTrainingAction(
      clientId: $clientId
      eventName: $eventName
      args: $args
    )
  }
`;

export const SET_ACTIVE_CHAPTER = gql`
  mutation AdvancedTrainingSetActiveChapter($clientId: ID!, $chapterId: ID!) {
    advancedTrainingSetActiveChapter(clientId: $clientId, chapterId: $chapterId)
  }
`;

export const TOGGLE_MEDIA_VIEWER = gql`
  mutation AdvancedTrainingToggleMediaViewer($clientId: ID!, $open: Boolean!) {
    advancedTrainingToggleMediaViewer(clientId: $clientId, open: $open)
  }
`;

export const TOGGLE_CHAPTER_LIST = gql`
  mutation AdvancedTrainingToggleChapterList($clientId: ID!, $open: Boolean!) {
    advancedTrainingToggleChapterList(clientId: $clientId, open: $open)
  }
`;

// --- FD Mutations ---

export const FD_ADVANCE_CHAPTER = gql`
  mutation FdAdvanceTrainingChapter($clientId: ID!, $chapterId: ID!) {
    advancedTrainingSetActiveChapter(clientId: $clientId, chapterId: $chapterId)
  }
`;

export const FD_COMPLETE_SUBCHAPTER = gql`
  mutation FdCompleteTrainingSubChapter($clientId: ID!, $subChapterId: ID!) {
    fdCompleteTrainingSubChapter(clientId: $clientId, subChapterId: $subChapterId)
  }
`;

export const FD_RESET_PROGRESS = gql`
  mutation FdResetTrainingProgress($clientId: ID!) {
    fdResetTrainingProgress(clientId: $clientId)
  }
`;

// --- Sandbox Flight (for recording modal) ---

export const START_SANDBOX_FLIGHT = gql`
  mutation StartSandboxFlight($name: String!, $simulators: [SimulatorInput!]!) {
    startFlight(name: $name, simulators: $simulators)
  }
`;

export const DELETE_SANDBOX_FLIGHT = gql`
  mutation DeleteSandboxFlight($flightId: ID!) {
    deleteFlight(flightId: $flightId)
  }
`;

export const SANDBOX_FLIGHT_SIMULATORS = gql`
  query SandboxFlightSimulators($flightId: ID!) {
    flights(id: $flightId) {
      id
      simulators {
        id
      }
    }
  }
`;

// --- Config Mutations ---

export const SET_STATION_ADVANCED_TRAINING = gql`
  mutation SetStationAdvancedTraining(
    $stationSetID: ID!
    $stationName: String!
    $config: AdvancedTrainingConfigInput!
  ) {
    setStationAdvancedTraining(
      stationSetID: $stationSetID
      stationName: $stationName
      config: $config
    )
  }
`;

export const TOGGLE_ADVANCED_TRAINING_MODE = gql`
  mutation ToggleAdvancedTrainingMode(
    $stationSetID: ID!
    $stationName: String!
    $enabled: Boolean!
  ) {
    toggleAdvancedTrainingMode(
      stationSetID: $stationSetID
      stationName: $stationName
      enabled: $enabled
    )
  }
`;

// --- Subscriptions ---

export const ADVANCED_TRAINING_PROGRESS_SUB = gql`
  subscription AdvancedTrainingProgressUpdate($simulatorId: ID) {
    advancedTrainingProgressUpdate(simulatorId: $simulatorId) {
      ...AdvancedTrainingProgressFragment
    }
  }
  ${ADVANCED_TRAINING_PROGRESS_FRAGMENT}
`;

// --- Queries ---

export const ADVANCED_TRAINING_PROGRESS_QUERY = gql`
  query AdvancedTrainingProgress($clientId: ID, $simulatorId: ID) {
    advancedTrainingProgress(clientId: $clientId, simulatorId: $simulatorId) {
      ...AdvancedTrainingProgressFragment
    }
  }
  ${ADVANCED_TRAINING_PROGRESS_FRAGMENT}
`;
