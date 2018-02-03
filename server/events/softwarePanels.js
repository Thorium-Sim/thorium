import App from "../app";
import * as Classes from "../classes";
import { pubsub } from "../helpers/subscriptionManager.js";

App.on("createSoftwarePanel", ({ panel }) => {
  App.softwarePanels.push(new Classes.SoftwarePanel(panel));
  pubsub.publish("softwarePanelsUpdate", App.softwarePanels);
});
App.on("updateSoftwarePanel", ({ panel }) => {
  const p = App.softwarePanels.find(s => s.id === panel.id);
  p && p.update(panel);
  pubsub.publish("softwarePanelsUpdate", App.softwarePanels);
});
App.on("removeSoftwarePanel", ({ panel }) => {
  App.softwarePanels = App.softwarePanels.filter(s => s.id !== panel);
  pubsub.publish("softwarePanelsUpdate", App.softwarePanels);
});
