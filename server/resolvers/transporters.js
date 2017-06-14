import App from '../../app.js';

export const TransporterQueries = {
  transporters(_, { simulatorId }) {
    return App.systems.filter((sys) => {
      return (sys.type === 'Transporters' && sys.simulatorId === simulatorId);
    });
  },
};

export const TransporterMutations = {
  createTransporter(_, { transporter }, context) {
    App.handleEvent({ transporter }, 'createTransporter', context.clientId);
    return '';
  },
  setTransportDestination(_, { transporter, destination }, context) {
    App.handleEvent({ transporter, destination },
      'setTransportDestination', context.clientId);
    return '';
  },
  setTransportTarget(_, { transporter, target }, context) {
    App.handleEvent({ transporter, target }, 'setTransportTarget', context.clientId);
    return '';
  },
  beginTransportScan(_, { transporter }, context) {
    App.handleEvent({ transporter }, 'beginTransportScan', context.clientId);
    return '';
  },
  cancelTransportScan(_, { transporter }, context) {
    App.handleEvent({ transporter }, 'cancelTransportScan', context.clientId);
    return '';
  },
  clearTransportTargets(_, { transporter }, context) {
    App.handleEvent({ transporter }, 'clearTransportTargets', context.clientId);
    return '';
  },
  setTransportCharge(_, { transporter, charge }, context) {
    App.handleEvent({ transporter, charge }, 'setTransportCharge', context.clientId);
    return '';
  },
  completeTransport(_, { transporter, target }, context) {
    App.handleEvent({ transporter, target }, 'completeTransport', context.clientId);
    return '';
  },
  setTransporterTargets(_, { transporter, targets }, context) {
    App.handleEvent({ transporter, targets }, 'setTransporterTargets', context.clientId);
    return '';
  },
};

export const TransporterSubscriptions = {
  transporterUpdate(rootValue) {
    return rootValue;
  },
};
