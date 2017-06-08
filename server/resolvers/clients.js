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
  clientConnect: (root, args) => {
    App.handleEvent(args, 'clientConnect');
    return '';
  },
  clientDisconnect: (root, args) => {
    App.handleEvent(args, 'clientDisconnect');
    return '';
  },
  clientPing: (root, args) => {
    App.handleEvent(args, 'clientPing');
    return '';
  },
  clientSetFlight: (root, args) => {
    App.handleEvent(args, 'clientSetFlight');
    return '';
  },
  clientSetSimulator: (root, args) => {
    App.handleEvent(args, 'clientSetSimulator');
    return '';
  },
  clientSetStation: (root, args) => {
    App.handleEvent(args, 'clientSetStation');
    return '';
  },
  clientLogin: (root, args) => {
    App.handleEvent(args, 'clientLogin');
    return '';
  },
  clientLogout: (root, args) => {
    App.handleEvent(args, 'clientLogout');
    return '';
  },
  clientDiagnostic: (root, args) => {
    App.handleEvent(args, 'clientDiagnostic');
    return '';
  },
  clientReset: (root, args) => {
    App.handleEvent(args, 'clientReset');
    return '';
  },
  clientLockScreen: (root, args) => {
    App.handleEvent(args, 'clientLockScreen');
    return '';
  },
  clientUnlockScreen: (root, args) => {
    App.handleEvent(args, 'clientUnlockScreen');
    return '';
  },
  clientOfflineState: (root, args) => {
    App.handleEvent(args, 'clientOfflineState');
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
