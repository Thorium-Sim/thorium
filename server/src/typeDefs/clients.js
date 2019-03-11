import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
import { StationResolver } from "../helpers/stationResolver";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Client {
    id: ID
    label: String
    connected: Boolean
    flight: Flight
    simulator: Simulator
    station: Station
    loginName: String
    loginState: String
    ping: String
    offlineState: String
    movie: String
    training: Boolean
    caches: [String]
    hypercard: String
    overlay: Boolean
    cracked: Boolean

    mobile: Boolean
    cards: [String]
    keypad: Keypad
  }

  type Keypad {
    id: ID
    label: String
    code: [Int]
    enteredCode: [Int]
    codeLength: Int
    giveHints: Boolean
    allowedAttempts: Int
    attempts: Int
    locked: Boolean
  }

  type Scanner {
    id: ID
    label: String
    scanRequest: String
    scanResults: String
    scanning: Boolean
  }

  type Sound {
    id: ID
    clients: [String]
    asset: String
    url: String
    volume: Float
    playbackRate: Float
    channel: [Int]
    looping: Boolean
  }

  input SoundInput {
    id: ID
    clients: [String]
    asset: String
    volume: Float
    playbackRate: Float
    channel: [Int]
    looping: Boolean
  }

  extend type Query {
    clients(
      all: Boolean
      clientId: ID
      simulatorId: ID
      stationName: String
      flightId: ID
    ): [Client]
    keypad(client: ID!): Keypad
    keypads(simulatorId: ID!): [Keypad]
    scanner(client: ID!): Scanner
    scanners(simulatorId: ID!): [Scanner]
  }
  extend type Mutation {
    clientConnect(
      client: ID!
      label: String
      mobile: Boolean
      cards: [String]
    ): String
    clientDisconnect(client: ID!): String
    clientPing(client: ID!, ping: String!): String
    clientSetFlight(client: ID!, flightId: ID!): String
    clientSetSimulator(client: ID!, simulatorId: ID!): String
    clientSetStation(client: ID!, stationName: ID!): String
    clientLogin(client: ID!, loginName: String): String
    clientLogout(client: ID!): String
    clientDiagnostic(client: ID!): String
    clientReset(client: ID!): String
    clientLockScreen(client: ID!): String
    clientUnlockScreen(client: ID!): String
    clientOfflineState(client: ID!, state: String): String
    clientMovieState(client: ID!, movie: String!): String
    clientSetTraining(client: ID!, training: Boolean!): String
    clientAddCache(
      client: ID
      simulatorId: ID
      viewscreen: Boolean
      cacheItem: String!
    ): String
    clientRemoveCache(client: ID!, cacheItem: String!): String
    setClientHypercard(clientId: ID, simulatorId: ID, component: String): String

    """
    Macro: Sounds: Play a sound
    """
    playSound(
      sound: SoundInput!
      station: String
      simulatorId: ID
      clientId: String
    ): String

    """
    Macro: Sounds: Cancel All Sounds
    """
    stopAllSounds(simulatorId: ID!): String
    """
    Macro: Sounds: Stop Looping All Sounds
    """
    cancelLoopingSounds(simulatorId: ID!): String
    applyClientSet(
      id: ID!
      flightId: ID!
      simulatorId: ID!
      templateId: ID!
      stationSetId: ID!
    ): String
    setClientOverlay(id: ID!, overlay: Boolean!): String
    clientCrack(id: ID!, crack: Boolean!): String

    setKeypadCode(id: ID!, code: [Int]): String
    setKeypadEnteredCode(id: ID!, code: [Int!]): String
    setKeypadHint(id: ID!, hint: Boolean!): String
    setKeypadLocked(id: ID!, locked: Boolean!): String
    resetKeypad(id: ID!): String
    setCodeLength(id: ID!, len: Int!): String
    setKeypadAllowedAttempts(id: ID!, attempts: Int!): String
    handheldScannerScan(id: ID!, request: String!): String
    handheldScannerCancel(id: ID!): String
    handheldScannerResponse(id: ID!, response: String!): String
  }
  extend type Subscription {
    clientChanged(client: ID, simulatorId: ID, flightId: ID): [Client]
    keypadsUpdate(simulatorId: ID!): [Keypad]
    keypadUpdate(client: ID!): Keypad
    scannersUpdate(simulatorId: ID!): [Scanner]
    scannerUpdate(client: ID!): Scanner
    clearCache(client: ID, flight: ID): Boolean
    soundSub(clientId: ID): Sound
    cancelSound(clientId: ID): ID
    cancelAllSounds(clientId: ID): Boolean
    cancelLoopingSounds(clientId: ID): Boolean
  }
`;

const resolver = {
  Client: {
    flight(rootValue) {
      return App.flights.find(f => f.id === rootValue.flightId);
    },
    simulator(rootValue) {
      return App.simulators.find(s => s.id === rootValue.simulatorId);
    },
    station: StationResolver
  },
  Sound: {
    url(rootValue) {
      const assetContainer = App.assetContainers.find(
        o => o.fullPath === rootValue.asset
      );
      const asset = App.assetObjects.find(
        o => o.containerId === assetContainer.id && o.simulatorId === "default"
      );
      return asset ? asset.url : "";
    }
  },
  Query: {
    clients: (root, { all, clientId, simulatorId, stationName, flightId }) => {
      let returnVal = App.clients;
      if (clientId) {
        returnVal = returnVal.filter(c => c.id === clientId);
      }
      if (simulatorId) {
        returnVal = returnVal.filter(c => c.simulatorId === simulatorId);
      }
      if (stationName) {
        returnVal = returnVal.filter(c => c.station === stationName);
      }
      if (flightId) {
        returnVal = returnVal.filter(c => c.flightId === flightId);
      }
      return returnVal.filter(c => (all ? true : c.connected));
    },
    keypad: (root, { client }) => {
      const c = App.clients.find(c => c.id === client);
      return c ? c.keypad : null;
    },
    keypads: (root, { simulatorId }) => {
      return App.clients
        .filter(c => c.simulatorId === simulatorId)
        .map(c => c.keypad);
    },
    scanner: (root, { client }) => {
      const c = App.clients.find(c => c.id === client);
      return c ? c.scanner : null;
    },
    scanners: (root, { simulatorId }) => {
      return App.clients
        .filter(c => c.simulatorId === simulatorId)
        .map(c => c.scanner);
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    clientChanged: {
      resolve(data, { client, simulatorId, flightId }) {
        const payload = data.filter(c => c.connected);
        if (!payload) return [];
        if (client) {
          return payload.filter(c => c.id === client);
        }
        if (simulatorId) {
          return payload.filter(c => c.simulatorId === simulatorId);
        }
        if (flightId) {
          return payload.filter(c => c.flightId === flightId);
        }
        return payload.filter(c => c.connected);
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("clientChanged"),
        (data, { client, simulatorId, flightId }) => {
          const payload = data.filter(c => c.connected);
          if (client) {
            return payload.filter(c => c.id === client).length > 0;
          }
          if (simulatorId) {
            return (
              payload.filter(c => c.simulatorId === simulatorId).length > 0
            );
          }
          if (flightId) {
            return payload.filter(c => c.flightId === flightId).length > 0;
          }
          return true;
        }
      )
    },
    keypadUpdate: {
      resolve: payload => payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator("keypadUpdate"),
        (data, { client }) => {
          return data.id === client;
        }
      )
    },
    keypadsUpdate: {
      resolve: (payload, { simulatorId }) =>
        payload.filter(c => c.simulatorId === simulatorId).map(c => c.keypad),
      subscribe: withFilter(
        () => pubsub.asyncIterator("keypadsUpdate"),
        (data, { simulatorId }) => {
          return data.filter(c => c.simulatorId === simulatorId).length > 0;
        }
      )
    },
    scannerUpdate: {
      resolve: payload => payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator("scannerUpdate"),
        (data, { client }) => {
          return data.id === client;
        }
      )
    },
    scannersUpdate: {
      resolve: (payload, { simulatorId }) =>
        payload.filter(c => c.simulatorId === simulatorId).map(c => c.scanner),
      subscribe: withFilter(
        () => pubsub.asyncIterator("scannersUpdate"),
        (data, { simulatorId }) => {
          return data.filter(c => c.simulatorId === simulatorId).length > 0;
        }
      )
    },
    clearCache: {
      resolve: payload => payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator("clearCache"),
        (rootValue, { client, flight }) => {
          let output = false;
          if (client) {
            output = rootValue.filter(c => c.id === client).length > 0;
          } else if (flight) {
            output = rootValue.filter(c => c.id === flight).length > 0;
          } else {
            output = rootValue.filter(c => c.connected).length > 0;
          }
          return output;
        }
      )
    },
    soundSub: {
      resolve: payload => payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator("soundSub"),
        (rootValue, { clientId }) => {
          if (rootValue.clients.indexOf(clientId) > -1) return true;
          return false;
        }
      )
    },
    cancelSound: {
      resolve: payload => payload.id,
      subscribe: withFilter(
        () => pubsub.asyncIterator("cancelSound"),
        (rootValue, { clientId }) => {
          if (rootValue.clients.indexOf(clientId) > -1) return true;
          return false;
        }
      )
    },
    cancelAllSounds: {
      resolve: payload => payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator("cancelAllSounds"),
        (rootValue, { clientId }) => {
          return !!rootValue.find(c => c.id === clientId);
        }
      )
    },
    cancelLoopingSounds: {
      resolve: payload => payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator("cancelLoopingSounds"),
        (rootValue, { clientId }) => {
          return !!rootValue.find(c => c.id === clientId);
        }
      )
    }
  }
};

export default { schema, resolver };
