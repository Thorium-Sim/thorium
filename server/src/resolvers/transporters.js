import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const TransporterQueries = {
  transporters(_, { simulatorId }) {
    return App.systems.filter(sys => {
      return sys.type === "Transporters" && sys.simulatorId === simulatorId;
    });
  }
};

export const TransporterMutations = {
  setTransportDestination(_, { transporter, destination }, context) {
    App.handleEvent(
      { transporter, destination },
      "setTransportDestination",
      context
    );
    return "";
  },
  setTransportTarget(_, { transporter, target }, context) {
    App.handleEvent({ transporter, target }, "setTransportTarget", context);
    return "";
  },
  beginTransportScan(_, { transporter }, context) {
    App.handleEvent({ transporter }, "beginTransportScan", context);
    return "";
  },
  cancelTransportScan(_, { transporter }, context) {
    App.handleEvent({ transporter }, "cancelTransportScan", context);
    return "";
  },
  clearTransportTargets(_, { transporter }, context) {
    App.handleEvent({ transporter }, "clearTransportTargets", context);
    return "";
  },
  setTransportCharge(_, { transporter, charge }, context) {
    App.handleEvent({ transporter, charge }, "setTransportCharge", context);
    return "";
  },
  completeTransport(_, { transporter, target }, context) {
    App.handleEvent({ transporter, target }, "completeTransport", context);
    return "";
  },
  setTransporterTargets(_, { transporter, targets }, context) {
    App.handleEvent({ transporter, targets }, "setTransporterTargets", context);
    return "";
  }
};

export const TransporterSubscriptions = {
  transporterUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (rootValue.simulatorId !== simulatorId) return false;
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("transporterUpdate"),
      rootValue => !!rootValue
    )
  }
};
