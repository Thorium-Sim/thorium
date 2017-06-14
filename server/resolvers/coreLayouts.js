import App from '../../app';

export const CoreLayoutQueries = {
  coreLayouts(_, { name = 'default' }) {
    return App.coreLayouts.filter(layout => (layout.name === name));
  },
};

export const CoreLayoutMutations = {
  updateCoreLayout(_, { layout }, context) {
    App.handleEvent({ layout }, 'updateCoreLayout', context.clientId);
  },
  addCoreLayout(_, { layout }, context) {
    App.handleEvent({ layout }, 'addCoreLayout', context.clientId);
  },
  removeCoreLayout(_, { id }, context) {
    App.handleEvent({ id }, 'removeCoreLayout', context.clientId);
  },
};

export const CoreLayoutSubscriptions = {
  coreLayoutChange(rootQuery) {
    return rootQuery;
  },
};

