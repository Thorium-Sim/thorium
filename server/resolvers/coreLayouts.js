import App from "../app";

export const CoreLayoutQueries = {
  coreLayouts(_, { name = "default" }) {
    return App.coreLayouts.filter(layout => layout.name === name);
  }
};

export const CoreLayoutMutations = {
  updateCoreLayout(_, { layout }, context) {
    App.handleEvent({ layout }, "updateCoreLayout", context);
  },
  addCoreLayout(_, { layout }, context) {
    App.handleEvent({ layout }, "addCoreLayout", context);
  },
  removeCoreLayout(_, { id }, context) {
    App.handleEvent({ id }, "removeCoreLayout", context);
  }
};

export const CoreLayoutSubscriptions = {
  coreLayoutChange(rootQuery) {
    return rootQuery;
  }
};
