import App from "../../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const ClientQueries = {
  clients: (root, { clientId, simulatorId, stationName }) => {
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
    return returnVal.filter(c => c.connected);
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
  }
};

export const ClientSubscriptions = {
  clientChanged: {
    resolve(payload, { client, simulatorId }) {
      if (client) {
        return payload.filter(c => c.id === client);
      }
      if (simulatorId) {
        return payload.filter(c => c.simulatorId === simulatorId);
      }
      return payload.filter(c => c.connected);
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("clientChanged"),
      rootValue => {
        return !!rootValue.length;
      }
    )
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
    station(rootValue) {
      if (rootValue.station === "Viewscreen") {
        return {
          name: "Viewscreen",
          cards: [
            {
              name: "Viewscreen",
              component: "Viewscreen"
            }
          ]
        };
      }
      if (rootValue.station === "Blackout") {
        return {
          name: "Blackout",
          cards: [
            {
              name: "Blackout",
              component: "Blackout"
            }
          ]
        };
      }
      const simulator = App.simulators.find(
        s => s.id === rootValue.simulatorId
      );
      if (simulator) {
        return simulator.stations.find(s => s.name === rootValue.station);
      }
    }
  }
};
