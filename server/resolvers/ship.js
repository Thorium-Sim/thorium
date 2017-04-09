import App from '../../app';

export const ShipQueries = {
  //Handled by simulator
};

export const ShipMutations = {
  shipDockingChange(root, args) {
    App.handleEvent(args, 'shipDockingChange');
  },
  remoteAccessSendCode(root, args) {
    App.handleEvent(args, 'remoteAccessSendCode');
  },
  remoteAccessUpdateCode(root, args) {
    App.handleEvent(args, 'remoteAccessUpdateCode');
  },
};

export const ShipSubscriptions = {
  notify: (rootValue, {simulatorId, station, trigger}) => {
    let returnVal = rootValue;
    if (simulatorId) {
      returnVal = returnVal.simulatorId === simulatorId && returnVal;
    }
    if (station) {
      returnVal = returnVal.station === station && returnVal;
    }
    if (trigger) {
      returnVal = returnVal.trigger === trigger && returnVal;
    }
    return returnVal;
  }
};
