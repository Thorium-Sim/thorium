import App from '../../app.js';

export const TransporterQueries = {
  transporters(_, { simulatorId }) {
    return App.systems.filter((sys) => {
      return (sys.type === 'Transporter' && sys.simulatorId === simulatorId);
    });
  },
};

export const TransporterMutations = {
  setTransportDestination(_, { transporter, destination }) {
    App.setTransportDestination({ transporter, destination });
    return '';
  },
  setTransportTarget(_, { transporter, target }) {
    App.setTransportTarget({ transporter, target });
    return '';
  },
  beginTransportScan(_, { transporter }) {
    App.beginTransportScan({ transporter });
    return '';
  },
  cancelTransportScan(_, { transporter }) {
    App.cancelTransportScan({ transporter });
    return '';
  },
  clearTransportTargets(_, { transporter }) {
    App.clearTransportTargets({ transporter });
    return '';
  },
  setTransportCharge(_, { transporter }) {
    App.setTransportCharge({ transporter });
    return '';
  },
  completeTransport(_, { transporter, target }) {
    App.completeTransport({ transporter, target });
    return '';
  },
  setTransporterTargets(_, { transporter, targets }) {
    App.setTransporterTargets({ transporter, targets });
    return '';
  },
};

export const TransporterSubscriptions = {
  transporterUpdate(rootValue) {
    return rootValue;
  },
};
