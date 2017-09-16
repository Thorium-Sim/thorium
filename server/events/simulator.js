import App from "../../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

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
