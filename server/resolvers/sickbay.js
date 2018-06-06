import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const SickbayQueries = {
  sickbay(root, { simulatorId }) {
    let returnVal = App.systems.filter(s => s.class === "Sickbay");
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
  },
  startDeconProgram(root, args, context) {
    App.handleEvent(args, "startDeconProgram", context);
  },
  updateDeconOffset(root, args, context) {
    App.handleEvent(args, "updateDeconOffset", context);
  },
  cancelDeconProgram(root, args, context) {
    App.handleEvent(args, "cancelDeconProgram", context);
  },
  completeDeconProgram(root, args, context) {
    App.handleEvent(args, "completeDeconProgram", context);
  },
  setDeconAutoFinish(root, args, context) {
    App.handleEvent(args, "setDeconAutoFinish", context);
  },
  updatePatientChart(root, args, context) {
    App.handleEvent(args, "updatePatientChart", context);
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

export const SickbayTypes = {
  SickbayBunk: {
    patient(bunk) {
      const sickbay = App.systems.find(s => s.id === bunk.sickbayId);
      return App.crew
        .concat(sickbay ? sickbay.sickbayRoster : [])
        .find(c => c.id === bunk.patient);
    }
  }
};
