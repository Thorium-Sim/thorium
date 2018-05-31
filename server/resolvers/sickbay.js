import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const SickbayQueries = {
  sickbay(root, { simulatorId }) {
    let returnVal = [];
    if (simulatorId)
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    return returnVal;
  }
};

export const SickbayMutations = {
  setSickbayBunks(rootValue, args, context) {
    App.handleEvent(args, "setSickbayBunks", context);
  },
  addSickbayCrew(root, args, context) {
    App.handleEvent(args, "addSickbayCrew", context);
  },
  removeSickbayCrew(root, args, context) {
    App.handleEvent(args, "removeSickbayCrew", context);
  },
  updateSickbayCrew(root, args, context) {
    App.handleEvent(args, "updateSickbayCrew", context);
  },
  scanSickbayBunk(root, args, context) {
    App.handleEvent(args, "scanSickbayBunk", context);
  },
  cancelSickbayBunkScan(root, args, context) {
    App.handleEvent(args, "cancelSickbayBunkScan", context);
  },
  sickbayBunkScanResponse(root, args, context) {
    App.handleEvent(args, "sickbayBunkScanResponse", context);
  },
  assignPatient(root, args, context) {
    App.handleEvent(args, "assignPatient", context);
  },
  dischargePatient(root, args, context) {
    App.handleEvent(args, "dischargePatient", context);
  }
};

export const SickbaySubscriptions = {
  sickbayUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("sickbayUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
