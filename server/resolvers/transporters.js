import App from '../../app.js';

export const TransporterQueries = {
  transporters(_, { simulatorId }) {
    return App.systems.filter((sys) => {
      return (sys.type === 'Transporters' && sys.simulatorId === simulatorId);
    });
  },
};

export const TransporterMutations = {
  createTransporter(_, { transporter }) {
    App.handleEvent({ transporter }, 'createTransporter');
    return '';
  },
  setTransportDestination(_, { transporter, destination }) {
    App.handleEvent({ transporter, destination },
      'setTransportDestination');
    return '';
  },
  setTransportTarget(_, { transporter, target }) {
    App.handleEvent({ transporter, target }, 'setTransportTarget');
    return '';
  },
  beginTransportScan(_, { transporter }) {
    App.handleEvent({ transporter }, 'beginTransportScan');
    return '';
  },
  cancelTransportScan(_, { transporter }) {
    App.handleEvent({ transporter }, 'cancelTransportScan');
    return '';
  },
  clearTransportTargets(_, { transporter }) {
    App.handleEvent({ transporter }, 'clearTransportTargets');
    return '';
  },
  setTransportCharge(_, { transporter, charge }) {
    App.handleEvent({ transporter, charge }, 'setTransportCharge');
    return '';
  },
  completeTransport(_, { transporter, target }) {
    App.handleEvent({ transporter, target }, 'completeTransport');
    return '';
  },
  setTransporterTargets(_, { transporter, targets }) {
    App.handleEvent({ transporter, targets }, 'setTransporterTargets');
    return '';
  },
};

export const TransporterSubscriptions = {
  transporterUpdate(rootValue) {
    return rootValue;
  },
};
