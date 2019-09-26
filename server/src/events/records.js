import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

function performAction(id, action) {
  const sim = App.simulators.find(s => s.id === id);
  if (sim) {
    action(sim);
  }
  pubsub.publish("recordSnippetsUpdate", sim.recordSnippets);
}

App.on(
  "recordsCreate",
  ({ simulatorId, contents, timestamp = new Date(), category }) => {
    performAction(simulatorId, sim =>
      sim.createRecord({ contents, timestamp, category })
    );
  }
);
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

/**
 * Record Generation
 */
// Course Change
App.on("navCourseEntry", ({ id, x, y, z }) => {
  const system = App.systems.find(sys => sys.id === id);
  if (
    system.currentCourse.x === system.calculatedCourse.x &&
    system.currentCourse.y === system.calculatedCourse.y &&
    system.currentCourse.z === system.calculatedCourse.z
  ) {
    App.handleEvent({
      simulatorId: system.simulatorId,
      contents: `${system.destination}`,
      category: "Navigation"
    });
  }
});
// Speed Change
// - Handled by the main event because it's tough to tell
// - if the engines speed has changed.

// Weapons Fired
// - Handled by the main event because it's tough to tell
// - Which torpedo type was fired.
//
// Shields Raised/Lowered
// Short Range Comm Line Connected/Disconnected
// LRM Messages w/ destination, including who wrote it
// Alert Status Change
// Transports
// System damaged & repaired
// Probes launched
