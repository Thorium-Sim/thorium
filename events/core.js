import App from '../app';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../data/classes';

App.on('updatedCoreLayout', (param) => {
  param.layout.forEach(layout => {
    const appLayout = App.coreLayouts.find(l => layout.id === l.id);
    if (appLayout) {
      appLayout.x = layout.x;
      appLayout.y = layout.y;
      appLayout.w = layout.w;
      appLayout.h = layout.h;
    }
  });
  pubsub.publish('coreLayoutChange', App.coreLayouts);
});
App.on('addedCoreLayout', ({ layout }) => {
  App.coreLayouts.push(new Classes.CoreLayout(layout));
  pubsub.publish('coreLayoutChange', App.coreLayouts);
});
App.on('removedCoreLayout', (param) => {
  App.coreLayouts = App.coreLayouts.filter((layout) => {
    return (layout.id !== param.id);
  });
  pubsub.publish('coreLayoutChange', App.coreLayouts);
});
