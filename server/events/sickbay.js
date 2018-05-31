import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

function performAction(id, action) {
  const sys = App.systems.find(s => s.id === id);
  if (sys) {
    action(sys);
  }
  pubsub.publish(
    "sickbayUpdate",
    App.systems.filter(s => s.class === "Sickbay")
  );
}

App.on("setSickbayBunks", ({ id, count }) => {
  performAction(id, sys => sys.setBunkCount(count));
});

App.on("addSickbayCrew", ({ id, crew }) => {
  performAction(id, sys => sys.addRoster(crew));
});

App.on("removeSickbayCrew", ({ id, crewId }) => {
  performAction(id, sys => sys.removeRoster(crewId));
});

App.on("updateSickbayCrew", ({ id, crewId, crew }) => {
  performAction(id, sys => sys.updateRoster(crewId, crew));
});

App.on("scanSickbayBunk", ({ id, bunkId, request }) => {
  performAction(id, sys => sys.scanBunk(bunkId, request));
});

App.on("cancelSickbayBunkScan", ({ id, bunkId }) => {
  performAction(id, sys => sys.cancelBunkScan(bunkId));
});

App.on("sickbayBunkScanResponse", ({ id, bunkId, response }) => {
  performAction(id, sys => sys.bunkScanResponse(bunkId, response));
});

App.on("assignPatient", ({ id, bunkId, crewId }) => {
  performAction(id, sys => sys.assignBunk(bunkId, crewId));
});

App.on("dischargePatient", ({ id, bunkId }) => {
  performAction(id, sys => sys.dischargeBunk(bunkId));
});
