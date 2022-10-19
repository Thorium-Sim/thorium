import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import * as Classes from "../classes";
import uuid from "uuid";

function getSimulator(simulatorId: string): Classes.Simulator {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (!simulator) throw new Error("Simulator not found");
  return simulator;
}
// Simulator
App.on("createSimulator", ({id = uuid.v4(), name, template, flightId}) => {
  const simulator = new Classes.Simulator({
    id,
    name,
    template,
  });
  if (flightId) {
    const flight = App.flights.find(f => f.id === flightId);
    flight?.addSimulator(simulator);
  }
  App.simulators.push(simulator);
  // Initialize the simulator.
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("removeSimulator", ({simulatorId}) => {
  App.simulators = App.simulators.filter(s => s.id !== simulatorId);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("renameSimulator", ({simulatorId, name}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (!simulator) return;
  simulator.rename(name);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("changeSimulatorLayout", ({simulatorId, layout}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.setLayout(layout);
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("changeSimulatorCaps", ({simulatorId, caps}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.caps = caps;
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("changeSimulatorAlertLevel", ({simulatorId, alertLevel}) => {
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
      color: "info",
    });
    App.handleEvent(
      {
        simulatorId: simulator.id,
        title: `Alert Level ${alertLevel}`,
        component: "AlertConditionCore",
        body: null,
        color: "info",
      },
      "addCoreFeed",
    );

    // Records Notification
    App.handleEvent(
      {
        simulatorId: simulator.id,
        contents: `${alertLevel}`,
        category: "Alert Condition",
      },
      "recordsCreate",
    );
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("changeSimulatorExocomps", ({simulatorId, exocomps}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.exocomps = exocomps;
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("changeSimulatorBridgeCrew", ({simulatorId, crew}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.bridgeCrew(crew);
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("changeSimulatorExtraPeople", ({simulatorId, crew}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.extraPeople(crew);
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("changeSimulatorRadiation", ({simulatorId, radiation}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.radiation(radiation);
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSimulatorTimelineStep", ({simulatorId, timelineId, step}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator) {
    simulator.setTimelineStep(step, timelineId);
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
  if (timelineId) {
    pubsub.publish("auxTimelinesUpdate", simulator);
  }
});
App.on("addSimulatorDamageStep", ({simulatorId, step}) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  if (!sim) return;
  sim.addDamageStep(step);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("updateSimulatorDamageStep", ({simulatorId, step}) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  if (!sim) return;
  sim.updateDamageStep(step);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("removeSimulatorDamageStep", ({simulatorId, step}) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  if (!sim) return;
  sim.removeDamageStep(step);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("addSimulatorDamageTask", ({simulatorId, task}) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  if (!sim) return;
  sim.addDamageTask(task);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("updateSimulatorDamageTask", ({simulatorId, task}) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  if (!sim) return;
  sim.updateDamageTask(task);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("removeSimulatorDamageTask", ({simulatorId, taskId}) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  if (!sim) return;
  sim.removeDamageTask(taskId);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSimulatorMission", ({simulatorId, missionId, stepId}) => {
  const simulator = getSimulator(simulatorId);
  simulator.mission = missionId;
  const mission = App.missions.find(s => s.id === missionId);
  const stepIndex = mission?.timeline.findIndex(s => s.id === stepId) || -1;
  simulator.setTimelineStep(stepIndex > 0 ? stepIndex : 0);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on(
  "setSimulatorMissionConfig",
  ({simulatorId, missionId, stationSetId, actionId, args}) => {
    const simulator = getSimulator(simulatorId);

    simulator.setMissionConfig(missionId, stationSetId, actionId, args);
    pubsub.publish("simulatorsUpdate", App.simulators);
  },
);
App.on("updateSimulatorPanels", ({simulatorId, panels}) => {
  const simulator = getSimulator(simulatorId);

  simulator.updatePanels(panels);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("updateSimulatorCommandLines", ({simulatorId, commandLines}) => {
  const simulator = getSimulator(simulatorId);

  simulator.updateCommandLines(commandLines);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("updateSimulatorTriggers", ({simulatorId, triggers}) => {
  const simulator = getSimulator(simulatorId);

  simulator.updateTriggers(triggers);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("updateSimulatorInterfaces", ({simulatorId, interfaces}) => {
  const simulator = getSimulator(simulatorId);

  simulator.updateInterfaces(interfaces);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSimulatorTriggersPaused", ({simulatorId, paused}) => {
  const simulator = getSimulator(simulatorId);

  simulator.setTriggersPaused(paused);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setStepDamage", ({simulatorId, stepDamage}) => {
  const simulator = getSimulator(simulatorId);

  simulator.stepDamage = stepDamage;
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setVerifyDamage", ({simulatorId, verifyStep}) => {
  const simulator = getSimulator(simulatorId);

  simulator.verifyStep = verifyStep;
  pubsub.publish("simulatorsUpdate", App.simulators);
});

const allowedMacros = [
  "updateViewscreenComponent",
  "setViewscreenToAuto",
  "showViewscreenTactical",
  "autoAdvance",
];
App.on("triggerMacros", ({simulatorId, macros}) => {
  const simulator = getSimulator(simulatorId);
  const flight = App.flights.find(f => f.simulators.indexOf(simulatorId) > -1);
  if (!flight) return;
  const context = {simulator, flight};
  // Compile the simulator-specific args based on station set
  const actions = Object.values(simulator.missionConfigs)
    .map(m => {
      return m[simulator.stationSet || ""];
    })
    .reduce((acc, next) => ({...acc, ...next}), {});
  macros.forEach(
    ({id, stepId = id, event, args, delay = 0, noCancelOnReset}) => {
      const simArgs = actions[stepId] || {};
      if (stepId) {
        simulator.executeTimelineStep(stepId);
      }
      const timeout = setTimeout(() => {
        const parsedArgs = typeof args === "string" ? JSON.parse(args) : args;
        App.handleEvent(
          {
            ...parsedArgs,
            ...simArgs,
            simulatorId,
          },
          event,
          context,
        );
      }, delay);
      if (!noCancelOnReset) flight.timeouts.push(timeout);
    },
  );
});

App.on("autoAdvance", ({simulatorId, prev}) => {
  const sim = getSimulator(simulatorId);
  const {mission, currentTimelineStep, executedTimelineSteps} = sim;
  const missionObj = App.missions.find(m => m.id === mission);
  if (!missionObj) return;
  if (prev && currentTimelineStep - 2 < 0) return;
  const timelineStep =
    missionObj.timeline[currentTimelineStep - (prev ? 2 : 0)];
  if (!timelineStep) return;

  const macros = timelineStep.timelineItems.filter(t => {
    if (executedTimelineSteps.indexOf(t.id) === -1) return true;
    if (allowedMacros.indexOf(t.event || "") > -1) return true;
    if (executedTimelineSteps.indexOf(t.id) > -1) return false;
    return true;
  });

  macros.forEach(({id}) => {
    sim.executeTimelineStep(id);
  });
  App.handleEvent({simulatorId, macros}, "triggerMacros");
  sim.setTimelineStep(currentTimelineStep + (prev ? -1 : 1));

  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setBridgeMessaging", ({id, messaging}) => {
  const sim = getSimulator(id);

  sim.bridgeOfficerMessaging = messaging;
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSimulatorAssets", ({id, assets}) => {
  const sim = getSimulator(id);
  sim.setAssets(assets);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSimulatorSoundEffects", ({id, soundEffects}) => {
  const sim = getSimulator(id);
  sim.setSoundEffects(soundEffects);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("updateSimulatorAmbiance", ({id, ambiance, cb}) => {
  const sim = getSimulator(id);
  sim.updateAmbiance(ambiance);
  pubsub.publish("simulatorsUpdate", App.simulators);
  cb && cb();
});
App.on("addSimulatorAmbiance", ({id, name, cb}) => {
  const sim = getSimulator(id);
  sim.addAmbiance({name});
  pubsub.publish("simulatorsUpdate", App.simulators);
  cb && cb();
});
App.on("removeSimulatorAmbiance", ({id, ambianceId, cb}) => {
  const sim = getSimulator(id);
  sim.removeAmbiance(ambianceId);
  pubsub.publish("simulatorsUpdate", App.simulators);
  cb && cb();
});
App.on(
  "addSimulatorStationCard",
  ({simulatorId, station, cardName, cardComponent, cb}) => {
    const sim = getSimulator(simulatorId);
    const stat = sim.stations.find(s => s.name === station);
    if (!stat) return;
    stat.addCard({
      name: cardName,
      component: cardComponent,
    });
    pubsub.publish("simulatorsUpdate", App.simulators);
    cb && cb();
  },
);
App.on("removeSimulatorStationCard", ({simulatorId, station, cardName}) => {
  const sim = getSimulator(simulatorId);
  const stat = sim.stations.find(s => s.name === station);
  if (!stat) return;
  stat.removeCard(cardName);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on(
  "editSimulatorStationCard",
  ({simulatorId, station, cardName, newCardName, cardComponent}) => {
    const sim = getSimulator(simulatorId);
    const stat = sim.stations.find(s => s.name === station);
    if (!stat) return;
    stat.updateCard(cardName, {
      name: newCardName,
      component: cardComponent,
    });
    pubsub.publish("simulatorsUpdate", App.simulators);
  },
);
App.on(
  "setSimulatorStationMessageGroup",
  ({simulatorId, station, group, state}) => {
    const sim = getSimulator(simulatorId);
    const stat = sim.stations.find(s => s.name === station);
    if (!stat) return;
    stat.setMessageGroup(group, state);
    pubsub.publish("simulatorsUpdate", App.simulators);
  },
);
App.on("setSimulatorStationLogin", ({simulatorId, station, login}) => {
  const sim = getSimulator(simulatorId);
  const stat = sim.stations.find(s => s.name === station);
  if (!stat) return;
  stat.setLogin(login);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSimulatorStationLayout", ({simulatorId, station, layout, cb}) => {
  const sim = getSimulator(simulatorId);
  const stat = sim.stations.find(s => s.name === station);
  if (!stat) return;
  stat.setLayout(layout);
  pubsub.publish("simulatorsUpdate", App.simulators);
  cb();
});
App.on("setSimulatorStationExecutive", ({simulatorId, station, exec}) => {
  const sim = getSimulator(simulatorId);
  const stat = sim.stations.find(s => s.name === station);
  if (!stat) return;
  stat.setExec(exec);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setSimulatorStationWidget", ({simulatorId, station, widget, state}) => {
  const sim = getSimulator(simulatorId);
  const stat = sim.stations.find(s => s.name === station);
  if (!stat) return;
  stat.setWidgets(widget, state);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("setAlertConditionLock", ({simulatorId, lock}) => {
  const sim = getSimulator(simulatorId);
  sim.setAlertLevelLock(lock);
  pubsub.publish("simulatorsUpdate", App.simulators);
});

App.on("setSimulatorHasPrinter", ({simulatorId, hasPrinter}) => {
  const sim = getSimulator(simulatorId);
  sim.setHasPrinter(hasPrinter);
  pubsub.publish("simulatorsUpdate", App.simulators);
});

App.on("setSimulatorHasLegs", ({simulatorId, hasLegs}) => {
  const sim = getSimulator(simulatorId);
  sim.setHasLegs(hasLegs);
  pubsub.publish("simulatorsUpdate", App.simulators);
});

App.on("setSimulatorSpaceEdventuresId", ({simulatorId, spaceEdventuresId}) => {
  const sim = getSimulator(simulatorId);
  sim.setSpaceEdventuresId(spaceEdventuresId);
  pubsub.publish("simulatorsUpdate", App.simulators);
});
const cardTimeouts = {};
App.on("hideSimulatorCard", ({simulatorId, cardName, delay}) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  if (!sim) return;
  sim.hideCard(cardName);
  if (!isNaN(parseInt(delay, 10))) {
    cardTimeouts[`${simulatorId}-${cardName}`] = setTimeout(() => {
      sim.unhideCard(cardName);
      pubsub.publish("simulatorsUpdate", App.simulators);
      delete cardTimeouts[`${simulatorId}-${cardName}`];
    }, parseInt(delay, 10));
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("unhideSimulatorCard", ({simulatorId, cardName}) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  if (!sim) return sim;
  sim.unhideCard(cardName);

  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("toggleSimulatorCardHidden", ({simulatorId, cardName, toggle}) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  if (!sim) return sim;

  clearTimeout(cardTimeouts[`${simulatorId}-${cardName}`]);
  delete cardTimeouts[`${simulatorId}-${cardName}`];
  if (toggle) {
    sim.hideCard(cardName);
  } else {
    sim.unhideCard(cardName);
  }
  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("flipSimulator", ({simulatorId, flip}) => {
  const sim = App.simulators.find(s => s.id === simulatorId);
  if (!sim) return sim;
  sim.flip(flip);

  pubsub.publish("simulatorsUpdate", App.simulators);
});
App.on("stationAssignCard", ({simulatorId, assignedToStation, cardName}) => {
  const simulator = getSimulator(simulatorId);
  const card = simulator.stations
    .reduce((acc: Classes.Card[], next) => acc.concat(next.cards), [])
    .find(c => c.name === cardName);

  if (!card) return;
  // Remove it so it isn't double-assigned
  simulator.removeStationAssignedCard(cardName);

  simulator.addStationAssignedCard(assignedToStation, card);
  pubsub.publish("simulatorsUpdate", App.simulators);
  pubsub.publish("clientChanged", App.clients);
});
App.on("stationUnassignCard", ({simulatorId, cardName}) => {
  const simulator = getSimulator(simulatorId);
  simulator.removeStationAssignedCard(cardName);
  pubsub.publish("simulatorsUpdate", App.simulators);
  pubsub.publish("clientChanged", App.clients);
});
