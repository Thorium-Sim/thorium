import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../classes';

App.on('updateCoreLayout', (param) => {
  param.layout.forEach(layout => {
    const appLayout = App.coreLayouts.find(l => layout.id === l.id);
    if (appLayout) {
      appLayout.x = layout.x;
      appLayout.y = layout.y;
      appLayout.w = layout.w;
      appLayout.h = layout.h;
      if (layout.objectId) appLayout.objectId = layout.objectId;
    }
  });
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
