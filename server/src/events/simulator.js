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
  if (simulator && alertLevel !== simulator.alertlevel) {
    simulator.setAlertLevel(alertLevel);
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: simulator.id,
      type: "Alert Condition",
      station: "Core",
      title: `Alert Level ${alertLevel}`,
      body: "",
      color: "info"
    });
    App.handleEvent(
      {
        simulatorId: simulator.id,
        title: `Alert Level ${alertLevel}`,
        component: "AlertConditionCore",
        body: null,
        color: "info"
      },
      "addCoreFeed"
    );
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
App.on("setStepDamage", ({ simulatorId, stepDamage }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  simulator.stepDamage = stepDamage;
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setVerifyDamage", ({ simulatorId, verifyStep }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  simulator.verifyStep = verifyStep;
  pubsub.publish("simulatorsUpdate", App.simulators);
});

const allowedMacros = [
  "updateViewscreenComponent",
  "setViewscreenToAuto",
  "showViewscreenTactical"
];

App.on("autoAdvance", ({ simulatorId, prev }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  const { mission, currentTimelineStep, executedTimelineSteps } = sim;
  const missionObj = App.missions.find(m => m.id === mission);
  if (!missionObj) return;
  if (prev && currentTimelineStep - 2 < 0) return;
  const timelineStep =
    missionObj.timeline[currentTimelineStep - (prev ? 2 : 0)];
  if (!timelineStep) return;
  timelineStep.timelineItems
    .filter(
      t =>
        executedTimelineSteps.indexOf(t.id) === -1 ||
        allowedMacros.indexOf(t.event) > -1
    )
    .forEach(({ id, event, args, delay = 0 }) => {
      sim.executeTimelineStep(id);

      setTimeout(() => {
        App.handleEvent(
          Object.assign({ simulatorId }, JSON.parse(args)),
          event
        );
      }, delay);
    });
  sim.setTimelineStep(currentTimelineStep + (prev ? -1 : 1));
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setBridgeMessaging", ({ id, messaging }) => {
  const sim = App.simulators.find(s => s.id === id);
  sim.bridgeOfficerMessaging = messaging;
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSimulatorAssets", ({ id, assets }) => {
  const sim = App.simulators.find(s => s.id === id);
  sim.setAssets(assets);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
const lightingTimeouts = {};
App.on("updateSimulatorLighting", ({ id, lighting }) => {
  const sim = App.simulators.find(s => s.id === id);
  sim.updateLighting(lighting);
  pubsub.publish("simulatorsUpdate", App.simulators);
  if (
    (lighting.action === "shake" && lighting.transitionDuration) ||
    (lighting.action === "fade" &&
      (lighting.intensity || lighting.intensity === 0))
  ) {
    // It was a shake or fade button press. Wait for the duration,
    // then trigger an update to cancel the shake
    clearTimeout(lightingTimeouts[id]);
    const duration =
      lighting.transitionDuration || sim.lighting.transitionDuration;
    lightingTimeouts[id] = setTimeout(() => {
      sim.updateLighting({ action: "normal" });
      pubsub.publish("simulatorsUpdate", App.simulators);
    }, duration);
  }
});
