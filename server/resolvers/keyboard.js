import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const KeyboardQueries = {
  keyboard(root, { simulatorId }) {
    let returnVal = [];
    if (simulatorId)
      returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
    return returnVal;
  }
};

export const KeyboardMutations = {
  addKeyboard(root, args, context) {
    App.handleEvent(args, "addKeyboard", context);
  },
  removeKeyboard(root, args, context) {
    App.handleEvent(args, "removeKeyboard", context);
  },
  renameKeyboard(root, args, context) {
    App.handleEvent(args, "renameKeyboard", context);
  },
  updateKeyboardKey(root, args, context) {
    App.handleEvent(args, "updateKeyboardKey", context);
  }
};

export const KeyboardSubscriptions = {
  keyboardUpdate: {
    resolve(rootValue) {
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("keyboardUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};
