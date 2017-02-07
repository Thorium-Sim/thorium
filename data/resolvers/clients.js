import App from '../../app';

export const ClientQueries = {
  clients: (root, { clientId }) => {
    if (clientId) {
      return App.clients.filter(c => c.id === clientId);
    }
    return App.clients.filter(c => c.connected);
  },
};

export const ClientMutations = {
  clientConnect: (root, args) => {
    App.handleEvent(args, 'clientConnect', 'clientConnected');
    return '';
  },
  clientDisconnect: (root, args) => {
    App.handleEvent(args, 'clientDisconnect', 'clientDisconnected');
    return '';
  },
  clientPing: (root, args) => {
    App.handleEvent(args, 'clientPing', 'clientPinged');
    return '';
  },
  clientSetFlight: (root, args) => {
    App.handleEvent(args, 'clientSetFlight', 'clientSetedFlight');
    return '';
  },
  clientSetSimulator: (root, args) => {
    App.handleEvent(args, 'clientSetSimulator', 'clientSetedSimulator');
    return '';
  },
  clientSetStation: (root, args) => {
    App.handleEvent(args, 'clientSetStation', 'clientSetedStation');
    return '';
  },
  clientLogin: (root, args) => {
    App.handleEvent(args, 'clientLogin', 'clientLogined');
    return '';
  },
  clientLogout: (root, args) => {
    App.handleEvent(args, 'clientLogout', 'clientLogouted');
    return '';
  },
  clientDiagnostic: (root, args) => {
    App.handleEvent(args, 'clientDiagnostic', 'clientDiagnosticed');
    return '';
  },
  clientReset: (root, args) => {
    App.handleEvent(args, 'clientReset', 'clientReseted');
    return '';
  },
  clientLockScreen: (root, args) => {
    App.handleEvent(args, 'clientLockScreen', 'clientLockScreened');
    return '';
  },
  clientUnlockScreen: (root, args) => {
    App.handleEvent(args, 'clientUnlockScreen', 'clientUnlockScreened');
    return '';
  },
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
