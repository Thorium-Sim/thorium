import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

function performAction(id, action) {
  const sim = App.simulators.find(s => s.id === id);
  if (sim) {
    action(sim);
  }
  pubsub.publish("recordSnippetsUpdate", sim.recordSnippets);
}

App.on("recordsCreate", ({ simulatorId, contents, timestamp, category }) => {
  performAction(simulatorId, sim =>
    sim.createRecord({ contents, timestamp, category })
  );
});
App.on("recordsCreateSnippet", ({ simulatorId, recordIds, name, type }) => {
  performAction(simulatorId, sim =>
    sim.createRecordSnippet({ records: recordIds, name, type })
  );
});
App.on("recordsAddToSnippet", ({ simulatorId, snippetId, recordIds }) => {
  performAction(simulatorId, sim =>
    sim.addRecordToSnippet(snippetId, recordIds)
  );
});
App.on("recordsRemoveFromSnippet", ({ simulatorId, snippetId, recordId }) => {
  performAction(simulatorId, sim =>
    sim.removeRecordFromSnippet(snippetId, recordId)
  );
});
