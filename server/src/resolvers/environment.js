import App from "../app.js";

export const EnvironmentMutations = {
  updateEnvironment(root, args, context) {
    App.handleEvent(args, "updateEnvironment", context);
  }
};
