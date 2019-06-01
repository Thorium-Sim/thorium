import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import { StationResolver } from "../helpers/stationResolver";
const mutationHelper = require("../helpers/mutationHelper").default;
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
    soundPlayer: Boolean
    caches: [String]
    hypercard: String
    overlay: Boolean
    cracked: Boolean
    commandLineOutput: [String]
    commandLineFeedback: [CommandLineFeedback]
    # Space EdVentures
    token: String
    email: String

    # Mobile App
    mobile: Boolean
    cards: [String]
    keypad: Keypad
  }

  type CommandLineFeedback {
    id: ID
    clientId: ID
    command: String
    approve: String
    deny: String
    triggers: [TimelineItem]
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
    clientSetEmail(client: ID!, email: String!): String
    clientLogout(client: ID!): String
    clientDiagnostic(client: ID!): String
    clientReset(client: ID!): String
    clientLockScreen(client: ID!): String
    clientUnlockScreen(client: ID!): String
    clientOfflineState(client: ID!, state: String): String
    clientMovieState(client: ID!, movie: String!): String
    clientSetTraining(client: ID!, training: Boolean!): String
    clientSetSoundPlayer(client: ID!, soundPlayer: Boolean!): String

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
      """
      Dynamic: Station
      """
      station: String
      simulatorId: ID
      """
      Dynamic: Client
      """
      clientId: String
    ): String

    """
    Macro: Sounds: Cancel All Sounds
    """
    stopAllSounds(
      simulatorId: ID!
      """
      Dynamic: Station
      """
      station: String
    ): String
    """
    Macro: Sounds: Stop Looping All Sounds
    """
    cancelLoopingSounds(
      simulatorId: ID!
      """
      Dynamic: Station
      """
      station: String
    ): String
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
    commandLineOutputUpdate(clientId: ID!): String
    commandLinesOutputUpdate(simulatorId: ID!): [Client]
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

    commandLineOutput(rootValue) {
      const simulator = App.simulators.find(
        s => s.id === rootValue.simulatorId
      );
      if (!simulator) return [];
      const output = simulator.commandLineOutputs[rootValue.id];
      if (!output) {
        simulator.commandLineOutputs[rootValue.id] = [
          `Welcome to Ubuntu 31.04.5 LTS (GNU/Linux 3.13.0-125-generic x86_64)
  
      System information
    
      System load:  0.26                Processes:           133
      Usage of /:   63.7% of 147.51YB   Users logged in:     0
      Memory usage: 85%                 IP address for eth0: 172.19.45.181
      Swap usage:   0%
    
    79 packages can be updated.
    60 updates are security updates.
    
    
    Last login: ip-10-0-43-69.ec2.internal
    
    Type "help" to get a list of available commands`
        ];
        return simulator.commandLineOutputs[rootValue.id];
      }
      return output;
    },
    commandLineFeedback(rootValue) {
      const simulator = App.simulators.find(
        s => s.id === rootValue.simulatorId
      );
      if (!simulator) return [];
      return simulator.commandLineFeedback[rootValue.id] || [];
    },
    token(client) {
      const flight = App.flights.find(f => f.id === client.flightId);
      const flightClient =
        flight && flight.clients.find(c => c.id === client.id);
      return flightClient && flightClient.token;
    },
    email(client) {
      const flight = App.flights.find(f => f.id === client.flightId);
      const flightClient =
        flight && flight.clients.find(c => c.id === client.id);
      return flightClient && flightClient.email;
    },
    station: StationResolver,
    connected(client) {
      return Boolean(client.connected);
    },
    training(client) {
      return Boolean(client.training);
    },
    soundPlayer(client) {
      return Boolean(client.soundPlayer);
    },
    overlay(client) {
      return Boolean(client.overlay);
    },
    cracked(client) {
      const simulator = App.simulators.find(s => s.id === client.simulatorId);
      if (!simulator) return false;
      return simulator.crackedClients[client.id];
    },
    mobile(client) {
      return Boolean(client.mobile);
    }
  },
  Keypad: {
    giveHints(client) {
      return Boolean(client.giveHints);
    },
    locked(client) {
      return Boolean(client.locked);
    }
  },
  Scanner: {
    scanning(client) {
      return Boolean(client.scanning);
    }
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
    },
    looping(sound) {
      return Boolean(sound.looping);
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
    commandLineOutputUpdate: {
      resolve: payload => payload.commandLineOutput.join("\n"),
      subscribe: withFilter(
        () => pubsub.asyncIterator("commandLineOutputUpdate"),
        (data, { clientId }) => {
          return data.id === clientId;
        }
      )
    },
    commandLinesOutputUpdate: {
      resolve: (payload, { simulatorId }) => {
        return payload;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("commandLinesOutputUpdate"),
        (data, { simulatorId }) => {
          return data && data.find(s => s.simulatorId === simulatorId);
        }
      )
    },
    clearCache: {
      resolve: payload => Boolean(payload),
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
          return Boolean(output);
        }
      )
    },
    soundSub: {
      resolve: payload => payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator("soundSub"),
        (rootValue, { clientId }) => {
          if (rootValue && rootValue.clients.indexOf(clientId) > -1)
            return true;
          return false;
        }
      )
    },
    cancelSound: {
      resolve: payload => payload.id,
      subscribe: withFilter(
        () => pubsub.asyncIterator("cancelSound"),
        (rootValue, { clientId }) => {
          if (rootValue && rootValue.clients.indexOf(clientId) > -1)
            return true;
          return false;
        }
      )
    },
    cancelAllSounds: {
      resolve: payload => !!payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator("cancelAllSounds"),
        (rootValue, { clientId }) => {
          return rootValue && !!rootValue.find(c => c.id === clientId);
        }
      )
    },
    cancelLoopingSounds: {
      resolve: payload => !!payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator("cancelLoopingSounds"),
        (rootValue, { clientId }) => {
          return rootValue && !!rootValue.find(c => c.id === clientId);
        }
      )
    }
  }
};

export default { schema, resolver };
