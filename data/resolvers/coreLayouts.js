import App from '../../app';

export const CoreLayoutQueries = {
  coreLayouts(_, { name = 'default' }) {
    console.log(name, App.coreLayouts);
    return App.coreLayouts.filter(layout => (layout.name === name));
  },
};

export const CoreLayoutMutations = {
  updateCoreLayout(_, { layout }) {
    App.updateCoreLayout({ layout });
  },
  addCoreLayout(_, { layout }) {
    App.addCoreLayout({ layout });
  },
  removeCoreLayout(_, { id }) {
    App.removeCoreLayout({ id });
  },
};

export const CoreLayoutSubscriptions = {
  coreLayoutChange(rootQuery) {
    return rootQuery;
  },
};

