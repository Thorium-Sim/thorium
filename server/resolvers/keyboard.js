import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const KeyboardQueries = {
  keyboard() {
    return App.keyboards;
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
      rootValue => !!rootValue
    )
  }
};
