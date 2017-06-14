import App from '../../app';

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
  },
};

export const ClientMutations = {
  clientConnect: (root, args, context) => {
    App.handleEvent(args, 'clientConnect', context.clientId);
    return '';
  },
  clientDisconnect: (root, args, context) => {
    App.handleEvent(args, 'clientDisconnect', context.clientId);
    return '';
  },
  clientPing: (root, args, context) => {
    App.handleEvent(args, 'clientPing', context.clientId);
    return '';
  },
  clientSetFlight: (root, args, context) => {
    App.handleEvent(args, 'clientSetFlight', context.clientId);
    return '';
  },
  clientSetSimulator: (root, args, context) => {
    App.handleEvent(args, 'clientSetSimulator', context.clientId);
    return '';
  },
  clientSetStation: (root, args, context) => {
    App.handleEvent(args, 'clientSetStation', context.clientId);
    return '';
  },
  clientLogin: (root, args, context) => {
    App.handleEvent(args, 'clientLogin', context.clientId);
    return '';
  },
  clientLogout: (root, args, context) => {
    App.handleEvent(args, 'clientLogout', context.clientId);
    return '';
  },
  clientDiagnostic: (root, args, context) => {
    App.handleEvent(args, 'clientDiagnostic', context.clientId);
    return '';
  },
  clientReset: (root, args, context) => {
    App.handleEvent(args, 'clientReset', context.clientId);
    return '';
  },
  clientLockScreen: (root, args, context) => {
    App.handleEvent(args, 'clientLockScreen', context.clientId);
    return '';
  },
  clientUnlockScreen: (root, args, context) => {
    App.handleEvent(args, 'clientUnlockScreen', context.clientId);
    return '';
  },
  clientOfflineState: (root, args, context) => {
    App.handleEvent(args, 'clientOfflineState', context.clientId);
    return '';
  }
};

export const ClientSubscriptions = {
  clientConnect(rootValue) {
    return rootValue;
  },
  clientDisconnect(rootValue) {
    return rootValue;
  },
  clientChanged: (rootValue, { client }) => {
    if (client) {
      return rootValue.filter((c) => c.id === client);
    }
    return rootValue.filter(c => c.connected);
  },
  clientPing: (rootValue, { client }) => {
    if (rootValue.id === client) {
      return rootValue.sentPing;
    }
    return null;
  },
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
      const flight = App.flights.find(f => f.id === rootValue.flightId);
      if (flight) {
        const flightSimulator = flight.simulators.find(f => f.id === rootValue.simulatorId);
        if (flightSimulator) {
          const stationSet = App.stationSets.find(s => s.id === flightSimulator.stationSet);
          if (stationSet) {
            return stationSet.stations.find(s => s.name === rootValue.station);
          }
        }
      }
      return {};
    },
  },
};
