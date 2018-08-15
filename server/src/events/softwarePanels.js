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

  // Remove the panels from simulators
  App.simulators.forEach(s =>
    s.updatePanels(s.panels.filter(p => p !== panel))
  );

  // Remove from station sets
  App.stationSets.forEach(s => {
    s.stations.forEach(st => {
      const card = st.cards.find(c => c.component === panel);
      st.removeCard(card.name);
    });
  });
  pubsub.publish("softwarePanelsUpdate", App.softwarePanels);
});
