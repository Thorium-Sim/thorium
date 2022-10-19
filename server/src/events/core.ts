import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import * as Classes from "../classes";

App.on("updateCoreLayout", param => {
  const coreLayout = App.coreLayouts.find(l => l.id === param.layout.id);
  if (!coreLayout) return;
  coreLayout.config = param.layout.config;
  pubsub.publish("coreLayoutChange", App.coreLayouts);
});

App.on("addCoreLayout", ({layout}) => {
  App.coreLayouts.push(new Classes.CoreLayout(layout));
  pubsub.publish("coreLayoutChange", App.coreLayouts);
});
App.on("removeCoreLayout", param => {
  App.coreLayouts = App.coreLayouts.filter(layout => {
    return layout.id !== param.id;
  });
  pubsub.publish("coreLayoutChange", App.coreLayouts);
});
App.on("reorderCoreLayouts", ({layouts}) => {
  App.coreLayouts = layouts
    .reduce((prev, next) => {
      return prev.concat(App.coreLayouts.find(({id}) => id === next));
    }, [])
    .filter(Boolean);
  pubsub.publish("coreLayoutChange", App.coreLayouts);
});
