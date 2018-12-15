import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const ClientQueries = {
  clients: (root, { clientId, simulatorId, stationName, flightId }) => {
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
    return returnVal.filter(c => c.connected);
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
};

export const ClientMutations = {
  clientConnect: (root, args, context) => {
    App.handleEvent(args, "clientConnect", context);
    return "";
  },
  clientDisconnect: (root, args, context) => {
    App.handleEvent(args, "clientDisconnect", context);
    return "";
  },
  clientPing: (root, args, context) => {
    App.handleEvent(args, "clientPing", context);
    return "";
  },
  clientSetFlight: (root, args, context) => {
    App.handleEvent(args, "clientSetFlight", context);
    return "";
  },
  clientSetSimulator: (root, args, context) => {
    App.handleEvent(args, "clientSetSimulator", context);
    return "";
  },
  clientSetStation: (root, args, context) => {
    App.handleEvent(args, "clientSetStation", context);
    return "";
  },
  clientLogin: (root, args, context) => {
    App.handleEvent(args, "clientLogin", context);
    return "";
  },
  clientLogout: (root, args, context) => {
    App.handleEvent(args, "clientLogout", context);
    return "";
  },
  clientDiagnostic: (root, args, context) => {
    App.handleEvent(args, "clientDiagnostic", context);
    return "";
  },
  clientReset: (root, args, context) => {
    App.handleEvent(args, "clientReset", context);
    return "";
  },
  clientLockScreen: (root, args, context) => {
    App.handleEvent(args, "clientLockScreen", context);
    return "";
  },
  clientUnlockScreen: (root, args, context) => {
    App.handleEvent(args, "clientUnlockScreen", context);
    return "";
  },
  clientOfflineState: (root, args, context) => {
    App.handleEvent(args, "clientOfflineState", context);
    return "";
  },
  clientSetTraining: (root, args, context) => {
    App.handleEvent(args, "clientSetTraining", context);
  },
  clientAddCache: (root, args, context) => {
    App.handleEvent(args, "clientAddCache", context);
  },
  clientRemoveCache: (root, args, context) => {
    App.handleEvent(args, "clientRemoveCache", context);
  },
  setClientHypercard(root, args, context) {
    App.handleEvent(args, "setClientHypercard", context);
  },
  playSound(root, args, context) {
    App.handleEvent(args, "playSound", context);
  },
  stopAllSounds(root, args, context) {
    App.handleEvent(args, "stopAllSounds", context);
  },
  cancelLoopingSounds(root, args, context) {
    App.handleEvent(args, "cancelLoopingSounds", context);
  },
  applyClientSet(root, args, context) {
    App.handleEvent(args, "applyClientSet", context);
  },
  clientMovieState(root, args, context) {
    App.handleEvent(args, "clientMovieState", context);
  },
  setClientOverlay(root, args, context) {
    App.handleEvent(args, "setClientOverlay", context);
  },
  setKeypadCode(root, args, context) {
    App.handleEvent(args, "setKeypadCode", context);
  },
  setKeypadEnteredCode(root, args, context) {
    App.handleEvent(args, "setKeypadEnteredCode", context);
  },
  setKeypadHint(root, args, context) {
    App.handleEvent(args, "setKeypadHint", context);
  },
  setKeypadLocked(root, args, context) {
    App.handleEvent(args, "setKeypadLocked", context);
  },
  resetKeypad(root, args, context) {
    App.handleEvent(args, "resetKeypad", context);
  },
  setCodeLength(root, args, context) {
    App.handleEvent(args, "setCodeLength", context);
  },
  setKeypadAllowedAttempts(root, args, context) {
    App.handleEvent(args, "setKeypadAllowedAttempts", context);
  },
  handheldScannerScan(root, args, context) {
    App.handleEvent(args, "handheldScannerScan", context);
  },
  handheldScannerCancel(root, args, context) {
    App.handleEvent(args, "handheldScannerCancel", context);
  },
  handheldScannerResponse(root, args, context) {
    App.handleEvent(args, "handheldScannerResponse", context);
  }
};

export const ClientSubscriptions = {
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
          return payload.filter(c => c.simulatorId === simulatorId).length > 0;
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
};

export const StationResolver = rootValue => {
  if (
    rootValue.station &&
    rootValue.station.match(/keyboard:.{8}-.{4}-.{4}-.{4}-.{12}/gi)
  ) {
    return {
      name: rootValue.station,
      cards: [
        {
          name: "Keyboard",
          component: "Keyboard"
        }
      ]
    };
  }
  if (rootValue.station === "Sound") {
    return {
      name: "Sound",
      cards: [
        {
          name: "SoundPlayer",
          component: "SoundPlayer"
        }
      ]
    };
  }
  const simulator = App.simulators.find(s => s.id === rootValue.simulatorId);
  if (simulator) {
    const station = simulator.stations.find(s => s.name === rootValue.station);
    if (station) return station;
    // Fallback for Viewscreen, Blackout, and Mobile
    if (rootValue.station) {
      return {
        name: rootValue.station,
        cards: [
          {
            name: rootValue.station,
            component: rootValue.station
          }
        ]
      };
    }
    return null;
  }
};
export const ClientTypes = {
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
  }
};
