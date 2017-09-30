import App from "../../app";
import { pubsub } from "../helpers/subscriptionManager.js";

App.on("updateViewscreenName", ({ id, name }) => {
  const viewscreen = App.viewscreens.find(v => v.id === id);
  viewscreen.updateName(name);
  pubsub.publish("viewscreensUpdate", App.viewscreens);
});
App.on("updateViewscreenComponent", ({ id, component, data }) => {
  const viewscreen = App.viewscreens.find(v => v.id === id);
  viewscreen.updateComponent(component, data);
  pubsub.publish("viewscreensUpdate", App.viewscreens);
});
App.on("updateViewscreenData", ({ id, data }) => {
  const viewscreen = App.viewscreens.find(v => v.id === id);
  viewscreen.updateData(data);
  pubsub.publish("viewscreensUpdate", App.viewscreens);
});
