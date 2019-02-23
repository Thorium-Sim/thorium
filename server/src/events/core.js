import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

function move(array, old_index, new_index) {
  if (new_index >= array.length) {
    var k = new_index - array.length;
    while (k-- + 1) {
      array.push(undefined);
    }
  }
  array.splice(new_index, 0, array.splice(old_index, 1)[0]);
  return array; // for testing purposes
}

App.on("updateCoreLayout", param => {
  App.coreLayouts.find(l => l.id === param.layout.id).config =
    param.layout.config;
  pubsub.publish("coreLayoutChange", App.coreLayouts);
});

App.on("addCoreLayout", ({ layout }) => {
  App.coreLayouts.push(new Classes.CoreLayout(layout));
  pubsub.publish("coreLayoutChange", App.coreLayouts);
});
App.on("removeCoreLayout", param => {
  App.coreLayouts = App.coreLayouts.filter(layout => {
    return layout.id !== param.id;
  });
  pubsub.publish("coreLayoutChange", App.coreLayouts);
});
App.on("reorderCoreLayouts", ({ id, order }) => {
  App.coreLayouts = move(
    App.coreLayouts,
    App.coreLayouts.findIndex(t => t.id === id),
    order
  );
  pubsub.publish("coreLayoutChange", App.coreLayouts);
});
