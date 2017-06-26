import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../classes';

App.on('updateCoreLayout', (param) => {
  App.coreLayouts.find(l => l.id === param.layout.id).config = param.layout.config;
  pubsub.publish('coreLayoutChange', App.coreLayouts);
});

App.on('addCoreLayout', ({ layout }) => {
  App.coreLayouts.push(new Classes.CoreLayout(layout));
  pubsub.publish('coreLayoutChange', App.coreLayouts);
});
App.on('removeCoreLayout', (param) => {
  App.coreLayouts = App.coreLayouts.filter((layout) => {
    return (layout.id !== param.id);
  });
  pubsub.publish('coreLayoutChange', App.coreLayouts);
});
