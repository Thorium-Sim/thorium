import App from '../../app';

export const CoreLayoutQueries = {
  coreLayouts(_, { name = 'default' }) {
    return App.coreLayouts.filter(layout => (layout.name === name));
  },
};

export const CoreLayoutMutations = {
  updateCoreLayout(_, { layout }) {
    App.handleEvent({ layout }, 'updateCoreLayout');
  },
  addCoreLayout(_, { layout }) {
    App.handleEvent({ layout }, 'addCoreLayout');
  },
  removeCoreLayout(_, { id }) {
    App.handleEvent({ id }, 'removeCoreLayout');
  },
};

export const CoreLayoutSubscriptions = {
  coreLayoutChange(rootQuery) {
    return rootQuery;
  },
};

