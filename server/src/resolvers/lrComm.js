import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const LRCommQueries = {
  longRangeCommunications(root, { simulatorId }) {
    let lrComm = App.systems.filter(s => s.type === "LongRangeComm");
    if (simulatorId) return lrComm.filter(s => s.simulatorId === simulatorId);
    return lrComm;
  }
};

export const LRCommTypes = {
  LRCommunications: {
    messages(sys, { crew, sent, approved }) {
      let returnMessages = sys.messages;
      if (crew) {
        returnMessages = returnMessages.filter(m => m.crew === crew);
      }
      if (crew === false) {
        returnMessages = returnMessages.filter(
          m => m.crew === crew && m.deleted === false
        );
      }
      if (sent || sent === false) {
        returnMessages = returnMessages.filter(m => m.sent === sent);
      }
      if (approved || approved === false) {
        returnMessages = returnMessages.filter(m => m.approved === approved);
      }
      return returnMessages;
    }
  }
};

export const LRCommMutations = {
  sendLongRangeMessage(root, args, context) {
    App.handleEvent(args, "sendLongRangeMessage", context);
  },
  longRangeMessageSend(root, args, context) {
    App.handleEvent(args, "longRangeMessageSend", context);
  },
  deleteLongRangeMessage(root, args, context) {
    App.handleEvent(args, "deleteLongRangeMessage", context);
  },
  updateLongRangeDecodedMessage(root, args, context) {
    App.handleEvent(args, "updateLongRangeDecodedMessage", context);
  },
  updateLongRangeComm(root, args, context) {
    App.handleEvent(args, "updateLongRangeComm", context);
  },
  approveLongRangeMessage(root, args, context) {
    App.handleEvent(args, "approveLongRangeMessage", context);
  },
  encryptLongRangeMessage(root, args, context) {
    App.handleEvent(args, "encryptLongRangeMessage", context);
  },
  setLongRangeSatellites(root, args, context) {
    App.handleEvent(args, "setLongRangeSatellites", context);
  },
  addInterceptionSignal(root, args, context) {
    App.handleEvent(args, "addInterceptionSignal", context);
  },
  removeInterceptionSignal(root, args, context) {
    App.handleEvent(args, "removeInterceptionSignal", context);
  },
  setLongRangePresetMessages(root, args, context) {
    App.handleEvent(args, "setLongRangePresetMessages", context);
  }
};

export const LRCommSubscriptions = {
  longRangeCommunicationsUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.filter(s => s.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("longRangeCommunicationsUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
