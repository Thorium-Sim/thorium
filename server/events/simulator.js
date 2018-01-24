import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

// Simulator
App.on(
  "createSimulator",
  ({ id, name, template, flightId, timeline, stationSet }) => {
    const simulator = new Classes.Simulator({
      id,
      name,
      template,
      timeline,
      launch: true
    });
    if (flightId) {
      const flight = App.flights.find(f => f.id === flightId);
      flight.addSimulator(simulator, stationSet);
    }
    App.simulators.push(simulator);
    // Initialize the simulator.
    pubsub.publish("simulatorsUpdate", App.simulators);
  }
);
App.on("removeSimulator", ({ simulatorId }) => {
  App.simulators = App.simulators.filter(s => s.id !== simulatorId);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("renameSimulator", ({ simulatorId, name }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  simulator.rename(name);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("changeSimulatorLayout", ({ simulatorId, layout }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.setLayout(layout);
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("changeSimulatorAlertLevel", ({ simulatorId, alertLevel }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.setAlertLevel(alertLevel);
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: simulator.id,
      station: "Core",
      title: `Alert Level ${alertLevel}`,
      body: "",
      color: "info"
    });
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("changeSimulatorExocomps", ({ simulatorId, exocomps }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.exocomps = exocomps;
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("changeSimulatorBridgeCrew", ({ simulatorId, crew }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.bridgeCrew(crew);
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("changeSimulatorRadiation", ({ simulatorId, radiation }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.radiation(radiation);
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSimulatorTimelineStep", ({ simulatorId, step }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.setTimelineStep(step);
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("addSimulatorDamageStep", ({ simulatorId, step }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim.addDamageStep(step);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("updateSimulatorDamageStep", ({ simulatorId, step }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim.updateDamageStep(step);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("removeSimulatorDamageStep", ({ simulatorId, step }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim.removeDamageStep(step);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSimulatorMission", ({ simulatorId, missionId }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  simulator.mission = missionId;
  simulator.setTimelineStep(0);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("updateSimulatorPanels", ({ simulatorId, panels }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  simulator.updatePanels(panels);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
