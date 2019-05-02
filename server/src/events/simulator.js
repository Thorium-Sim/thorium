import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

// Simulator
App.on(
  "createSimulator",
  ({ id = uuid.v4(), name, template, flightId, timeline, stationSet }) => {
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
App.on("changeSimulatorCaps", ({ simulatorId, caps }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.caps = caps;
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
App.on("addSimulatorDamageTask", ({ simulatorId, task }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim.addDamageTask(task);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("updateSimulatorDamageTask", ({ simulatorId, task }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim.updateDamageTask(task);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("removeSimulatorDamageTask", ({ simulatorId, taskId }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim.removeDamageTask(taskId);
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
App.on("updateSimulatorCommandLines", ({ simulatorId, commandLines }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  simulator.updateCommandLines(commandLines);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("updateSimulatorTriggers", ({ simulatorId, triggers }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  simulator.updateTriggers(triggers);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("updateSimulatorInterfaces", ({ simulatorId, interfaces }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  simulator.updateInterfaces(interfaces);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSimulatorTriggersPaused", ({ simulatorId, paused }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  simulator.setTriggersPaused(paused);
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
  "showViewscreenTactical",
  "autoAdvance"
];
App.on("triggerMacros", ({ simulatorId, macros }) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  const flight = App.flights.find(f => f.simulators.indexOf(simulatorId) > -1);
  const context = { simulator, flight };
  macros.forEach(({ stepId, event, args, delay = 0 }) => {
    if (stepId) {
      simulator.executeTimelineStep(stepId);
    }
    setTimeout(() => {
      const parsedArgs = typeof args === "string" ? JSON.parse(args) : args;
      App.handleEvent(
        {
          ...parsedArgs,
          simulatorId
        },
        event,
        context
      );
    }, delay);
  });
  pubsub.publish("simulatorsUpdate", App.simulators);
});

App.on("autoAdvance", ({ simulatorId, prev }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  const { mission, currentTimelineStep, executedTimelineSteps } = sim;
  const missionObj = App.missions.find(m => m.id === mission);
  if (!missionObj) return;
  if (prev && currentTimelineStep - 2 < 0) return;
  const timelineStep =
    missionObj.timeline[currentTimelineStep - (prev ? 2 : 0)];
  if (!timelineStep) return;

  const macros = timelineStep.timelineItems.filter(t => {
    if (executedTimelineSteps.indexOf(t.id) === -1) return true;
    if (allowedMacros.indexOf(t.event) > -1) return true;
    if (executedTimelineSteps.indexOf(t.id) > -1) return false;
    return true;
  });

  macros.forEach(({ id }) => {
    sim.executeTimelineStep(id);
  });
  App.handleEvent({ simulatorId, macros }, "triggerMacros");
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
App.on("updateSimulatorAmbiance", ({ id, ambiance, cb }) => {
  const sim = App.simulators.find(s => s.id === id);
  sim.updateAmbiance(ambiance);
  pubsub.publish("simulatorsUpdate", App.simulators);
  cb && cb();
});
App.on("addSimulatorAmbiance", ({ id, name, cb }) => {
  const sim = App.simulators.find(s => s.id === id);
  sim.addAmbiance({ name });
  pubsub.publish("simulatorsUpdate", App.simulators);
  cb && cb();
});
App.on("removeSimulatorAmbiance", ({ id, ambianceId, cb }) => {
  const sim = App.simulators.find(s => s.id === id);
  sim.removeAmbiance(ambianceId);
  pubsub.publish("simulatorsUpdate", App.simulators);
  cb && cb();
});
App.on(
  "addSimulatorStationCard",
  ({ simulatorId, station, cardName, cardComponent, cb }) => {
    const sim = App.simulators.find(s => s.id === simulatorId);
    const stat = sim.stations.find(s => s.name === station);
    stat.addCard({
      name: cardName,
      component: cardComponent
    });
    pubsub.publish("simulatorsUpdate", App.simulators);
    cb && cb();
  }
);
App.on("removeSimulatorStationCard", ({ simulatorId, station, cardName }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  const stat = sim.stations.find(s => s.name === station);
  stat.removeCard(cardName);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on(
  "editSimulatorStationCard",
  ({ simulatorId, station, cardName, newCardName, cardComponent }) => {
    const sim = App.simulators.find(s => s.id === simulatorId);
    const stat = sim.stations.find(s => s.name === station);
    stat.updateCard(cardName, {
      name: newCardName,
      component: cardComponent
    });
    pubsub.publish("simulatorsUpdate", App.simulators);
  }
);
App.on(
  "setSimulatorStationMessageGroup",
  ({ simulatorId, station, group, state }) => {
    const sim = App.simulators.find(s => s.id === simulatorId);
    const stat = sim.stations.find(s => s.name === station);
    stat.setMessageGroup(group, state);
    pubsub.publish("simulatorsUpdate", App.simulators);
  }
);
App.on("setSimulatorStationLogin", ({ simulatorId, station, login }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  const stat = sim.stations.find(s => s.name === station);
  stat.setLogin(login);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSimulatorStationLayout", ({ simulatorId, station, layout }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  const stat = sim.stations.find(s => s.name === station);
  stat.setLayout(layout);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSimulatorStationExecutive", ({ simulatorId, station, exec }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  const stat = sim.stations.find(s => s.name === station);
  stat.setExec(exec);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on(
  "setSimulatorStationWidget",
  ({ simulatorId, station, widget, state }) => {
    const sim = App.simulators.find(s => s.id === simulatorId);
    const stat = sim.stations.find(s => s.name === station);
    stat.setWidgets(widget, state);
    pubsub.publish("simulatorsUpdate", App.simulators);
  }
);
App.on("setAlertConditionLock", ({ simulatorId, lock }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim.setAlertLevelLock(lock);
  pubsub.publish("simulatorsUpdate", App.simulators);
});

App.on("setSimulatorHasPrinter", ({ simulatorId, hasPrinter }) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  sim.setHasPrinter(hasPrinter);
  pubsub.publish("simulatorsUpdate", App.simulators);
});

App.on(
  "setSimulatorSpaceEdventuresId",
  ({ simulatorId, spaceEdventuresId }) => {
    const sim = App.simulators.find(s => s.id === simulatorId);
    sim.setSpaceEdventuresId(spaceEdventuresId);
    pubsub.publish("simulatorsUpdate", App.simulators);
  }
);
