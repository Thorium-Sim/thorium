import App from "../../app";

export const ShipQueries = {
  //Handled by simulator
};

export const ShipMutations = {
  shipDockingChange(root, args, context) {
    App.handleEvent(args, "shipDockingChange", context);
  },
  remoteAccessSendCode(root, args, context) {
    App.handleEvent(args, "remoteAccessSendCode", context);
  },
  remoteAccessUpdateCode(root, args, context) {
    App.handleEvent(args, "remoteAccessUpdateCode", context);
  },
  setSelfDestructTime(root, args, context) {
    App.handleEvent(args, "setSelfDestructTime", context);
  },
  setSelfDestructCode(root, args, context) {
    App.handleEvent(args, "setSelfDestructCode", context);
  },
  setSelfDestructAuto(root, args, context) {
    App.handleEvent(args, "setSelfDestructAuto", context);
  }
};

export const ShipSubscriptions = {
  notify: (rootValue, { simulatorId, station, trigger }) => {
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
  },
  widgetNotify: (rootValue, { simulatorId, station }) => {
    let returnVal = rootValue;
    if (simulatorId) {
      returnVal = returnVal.simulatorId === simulatorId && returnVal;
    }
    if (station) {
      returnVal = returnVal.station === station && returnVal;
    }
    return returnVal.widget;
  }
};
