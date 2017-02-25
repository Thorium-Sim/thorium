import App from '../../app.js';

export const TransporterQueries = {
  transporters(_, { simulatorId }) {
    return App.systems.filter((sys) => {
      return (sys.type === 'Transporter' && sys.simulatorId === simulatorId);
    });
  },
};

export const TransporterMutations = {
  createTransporter(_, { transporter }) {
    App.handleEvent({ transporter }, 'createTransporter', 'createdTransporter');
    return '';
  },
  setTransportDestination(_, { transporter, destination }) {
    App.handleEvent({ transporter, destination },
      'setTransportDestination',
      'settedTransportDestination');
    return '';
  },
  setTransportTarget(_, { transporter, target }) {
    App.handleEvent({ transporter, target }, 'setTransportTarget', 'settedTransportTarget');
    return '';
  },
  beginTransportScan(_, { transporter }) {
    App.handleEvent({ transporter }, 'beginTransportScan', 'beganTransportScan');
    return '';
  },
  cancelTransportScan(_, { transporter }) {
    App.handleEvent({ transporter }, 'cancelTransportScan', 'canceledTransportScan');
    return '';
  },
  clearTransportTargets(_, { transporter }) {
    App.handleEvent({ transporter }, 'clearTransportTargets', 'clearedTransportTargets');
    return '';
  },
  setTransportCharge(_, { transporter, charge }) {
    App.handleEvent({ transporter, charge }, 'setTransportCharge', 'settedTransportCharge');
    return '';
  },
  completeTransport(_, { transporter, target }) {
    App.handleEvent({ transporter, target }, 'completeTransport', 'completedTransport');
    return '';
  },
  setTransporterTargets(_, { transporter, targets }) {
    App.handleEvent({ transporter, targets }, 'setTransporterTargets', 'settedTransporterTargets');
    return '';
  },
};

export const TransporterSubscriptions = {
  transporterUpdate(rootValue) {
    return rootValue;
  },
};
