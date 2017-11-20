import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

App.on("updateViewscreenName", ({ id, name }) => {
  const viewscreen = App.viewscreens.find(v => v.id === id);
  viewscreen.updateName(name);
  pubsub.publish("viewscreensUpdate", App.viewscreens);
});
App.on("updateViewscreenComponent", ({ id, simulatorId, component, data }) => {
  const viewscreen = App.viewscreens.find(
    v => v.id === id || v.simulatorId === simulatorId
  );
  // First de-auto the viewscreen, since we want to force this component;
  viewscreen.updateAuto(false);
  viewscreen.updateComponent(component, data);
  pubsub.publish("viewscreensUpdate", App.viewscreens);
});
App.on("updateViewscreenData", ({ id, data }) => {
  const viewscreen = App.viewscreens.find(v => v.id === id);
  viewscreen.updateData(data);
  pubsub.publish("viewscreensUpdate", App.viewscreens);
});
App.on("updateViewscreenAuto", ({ id, simulatorId, auto }) => {
  const viewscreen = App.viewscreens.find(
    v => v.id === id || v.simulatorId === simulatorId
  );
  viewscreen.updateAuto(auto);
  pubsub.publish("viewscreensUpdate", App.viewscreens);
});
App.on("setViewscreenToAuto", ({ id, simulatorId }) => {
  const viewscreen = App.viewscreens.find(
    v => v.id === id || v.simulatorId === simulatorId
  );
  viewscreen.updateAuto(true);
  pubsub.publish("viewscreensUpdate", App.viewscreens);
});
