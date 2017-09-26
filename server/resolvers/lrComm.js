import App from "../../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const LRCommQueries = {
  longRangeCommunications(root, { simulatorId, crew, sent }) {
    let lrComm = App.systems.filter(s => s.type === "LongRangeComm");
    if (simulatorId) lrComm = lrComm.filter(s => s.simulatorId === simulatorId);
    if (typeof crew !== "undefined") {
      lrComm = lrComm.map(s => {
        const sys = Object.assign({}, s);
        sys.messages = sys.messages.filter(m => m.crew === crew);
        return sys;
      });
    }
    if (typeof sent !== "undefined") {
      lrComm = lrComm.map(s => {
        const sys = Object.assign({}, s);
        sys.messages = sys.messages.filter(m => m.sent === sent);
        return sys;
      });
    }
    if (typeof sent !== "undefined" && typeof crew !== "undefined") {
      if (sent !== true && crew === false) {
        lrComm = lrComm.map(s => {
          const sys = Object.assign({}, s);
          sys.messages = sys.messages.filter(m => m.deleted === false);
          return sys;
        });
      }
    }
    return lrComm;
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
  }
};

export const LRCommSubscriptions = {
  longRangeCommunicationsUpdate: {
    resolve(rootValue, { simulatorId, crew, sent }) {
      if (simulatorId)
        rootValue = rootValue.filter(s => s.simulatorId === simulatorId);
      if (typeof crew !== "undefined") {
        rootValue = rootValue.map(s =>
          Object.assign({}, s, {
            messages: s.messages.filter(m => m.crew === crew)
          })
        );
      }
      if (typeof sent !== "undefined") {
        rootValue = rootValue.map(s =>
          Object.assign({}, s, {
            messages: s.messages.filter(m => m.sent === sent)
          })
        );
      }
      if (typeof sent !== "undefined" && typeof crew !== "undefined") {
        if (sent !== true && crew === false) {
          rootValue = rootValue.map(s =>
            Object.assign({}, s, {
              messages: s.messages.filter(m => m.deleted === false)
            })
          );
        }
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("longRangeCommunicationsUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
