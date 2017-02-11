import App from '../../app';

export const CoreLayoutQueries = {
  coreLayouts(_, { name = 'default' }) {
    return App.coreLayouts.filter(layout => (layout.name === name));
  },
};

export const CoreLayoutMutations = {
  updateCoreLayout(_, { layout }) {
    App.handleEvent({ layout }, 'updateCoreLayout', 'updatedCoreLayout');
  },
  addCoreLayout(_, { layout }) {
    App.handleEvent({ layout }, 'addCoreLayout', 'addedCoreLayout');
  },
  removeCoreLayout(_, { id }) {
    App.handleEvent({ id }, 'removeCoreLayout', 'removedCoreLayout');
  },
};

export const CoreLayoutSubscriptions = {
  coreLayoutChange(rootQuery) {
    return rootQuery;
  },
};

