import App from "../app";
import uuid from "uuid";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const FlightStructureQueries = {
  events: () => {
    return Object.keys(App._events);
  },
  simulators: (root, { template, id }) => {
    let returnVal = App.simulators;
    if (id) returnVal = returnVal.filter(s => s.id === id);
    if (template) returnVal = returnVal.filter(s => s.template);
    return returnVal;
  },
  flights(root, { running, id }) {
    let returnRes = App.flights;
    if (running) {
      returnRes = returnRes.filter(f => f.running);
    }
    if (id) {
      returnRes = returnRes.filter(f => f.id === id);
    }
    return returnRes;
  },
  stations() {
    return App.stationSets;
  },
  missions(root, { id }) {
    if (id) return App.missions.filter(m => m.id === id);
    return App.missions;
  }
};

export const FlightStructureMutations = {
  test(root, args, context) {
    App.test(args);
    return "";
  },

  // Mission
  createMission(root, args, context) {
    const id = uuid.v4();
    App.handleEvent(Object.assign(args, { id }), "createMission", context);
    return id;
  },
  removeMission(root, args, context) {
    App.handleEvent(args, "removeMission", context);
  },
  editMission(root, args, context) {
    App.handleEvent(args, "editMission", context);
  },
  importMission(root, args, context) {
    App.handleEvent(args, "importMission", context);
  },

  // Flight
  startFlight(root, args, context) {
    const flightId = uuid.v4();
    App.handleEvent(
      Object.assign(args, { id: flightId }),
      "startFlight",
      context
    );
    return flightId;
  },
  resetFlight(root, args, context) {
    App.handleEvent(args, "resetFlight", context);
  },
  deleteFlight(root, args, context) {
    App.handleEvent(args, "deleteFlight", context);
  },
  pauseFlight(root, args, context) {
    App.handleEvent(args, "pauseFlight", context);
  },
  resumeFlight(root, args, context) {
    App.handleEvent(args, "resumeFlight", context);
  },
  // Simulator
  createSimulator(root, args, context = {}) {
    App.handleEvent(
      Object.assign(args, { id: uuid.v4() }),
      "createSimulator",
      context
    );
  },
  removeSimulator(root, args, context) {
    App.handleEvent(args, "removeSimulator", context);
  },
  renameSimulator(root, args, context) {
    App.handleEvent(args, "renameSimulator", context);
  },
  changeSimulatorLayout(root, args, context) {
    App.handleEvent(args, "changeSimulatorLayout", context);
  },
  changeSimulatorAlertLevel(root, args, context) {
    App.handleEvent(args, "changeSimulatorAlertLevel", context);
  },
  changeSimulatorExocomps(root, args, context) {
    App.handleEvent(args, "changeSimulatorExocomps", context);
  },
  changeSimulatorBridgeCrew(root, args, context) {
    App.handleEvent(args, "changeSimulatorBridgeCrew", context);
  },
  changeSimulatorRadiation(root, args, context) {
    App.handleEvent(args, "changeSimulatorRadiation", context);
  },
  setSimulatorTimelineStep(root, args, context) {
    App.handleEvent(args, "setSimulatorTimelineStep", context);
  },
  addSimulatorDamageStep(rootValue, params, context) {
    App.handleEvent(params, "addSimulatorDamageStep", context);
  },
  updateSimulatorDamageStep(rootValue, params, context) {
    App.handleEvent(params, "updateSimulatorDamageStep", context);
  },
  removeSimulatorDamageStep(rootValue, params, context) {
    App.handleEvent(params, "removeSimulatorDamageStep", context);
  },
  setSimulatorMission(rootValue, params, context) {
    App.handleEvent(params, "setSimulatorMission", context);
  },
  updateSimulatorPanels(rootValue, params, context) {
    App.handleEvent(params, "updateSimulatorPanels", context);
  },
  setStepDamage(rootValue, params, context) {
    App.handleEvent(params, "setStepDamage", context);
  },
  setVerifyDamage(rootValue, params, context) {
    App.handleEvent(params, "setVerifyDamage", context);
  },
  setBridgeMessaging(rootValue, params, context) {
    App.handleEvent(params, "setBridgeMessaging", context);
  },
  setSimulatorAssets(rootValue, params, context) {
    App.handleEvent(params, "setSimulatorAssets", context);
  },
  // Timeline
  addTimelineStep(root, args, context) {
    App.handleEvent(
      Object.assign(args, { timelineStepId: uuid.v4() }),
      "addTimelineStep",
      context
    );
  },
  removeTimelineStep(root, args, context) {
    App.handleEvent(args, "removeTimelineStep", context);
  },
  duplicateTimelineStep(root, args, context) {
    App.handleEvent(args, "duplicateTimelineStep", context);
  },
  reorderTimelineStep(root, args, context) {
    App.handleEvent(args, "reorderTimelineStep", context);
  },
  updateTimelineStep(root, args, context) {
    App.handleEvent(args, "updateTimelineStep", context);
  },
  addTimelineItemToTimelineStep(root, args, context) {
    App.handleEvent(
      Object.assign(args, { timelineItemId: uuid.v4() }),
      "addTimelineItemToTimelineStep",
      context
    );
  },
  removeTimelineStepItem(root, args, context) {
    App.handleEvent(args, "removeTimelineStepItem", context);
  },
  updateTimelineStepItem(root, args, context) {
    App.handleEvent(args, "updateTimelineStepItem", context);
  },
  triggerMacros(root, { simulatorId, macros }) {
    const simulator = App.simulators.find(s => s.id === simulatorId);
    macros.forEach(({ stepId, event, args, delay = 0 }) => {
      simulator.executeTimelineStep(stepId);
      setTimeout(() => {
        App.handleEvent(
          Object.assign({ simulatorId }, JSON.parse(args)),
          event
        );
      }, delay);
    });
    pubsub.publish("simulatorsUpdate", App.simulators);
  },
  autoAdvance(root, args, context) {
    App.handleEvent(args, "autoAdvance", context);
  },
  // Station
  createStationSet(root, args, context) {
    App.handleEvent(args, "createStationSet", context);
  },
  removeStationSet(root, args, context) {
    App.handleEvent(args, "removeStationSet", context);
  },
  renameStationSet(root, args, context) {
    App.handleEvent(args, "renameStationSet", context);
  },
  addStationToStationSet(root, args, context) {
    App.handleEvent(args, "addStationToStationSet", context);
  },
  removeStationFromStationSet(root, args, context) {
    App.handleEvent(args, "removeStationFromStationSet", context);
  },
  editStationInStationSet(root, args, context) {
    App.handleEvent(args, "editStationInStationSet", context);
  },
  addCardToStation(root, args, context) {
    App.handleEvent(args, "addCardToStation", context);
  },
  removeCardFromStation(root, args, context) {
    App.handleEvent(args, "removeCardFromStation", context);
  },
  editCardInStationSet(root, args, context) {
    App.handleEvent(args, "editCardInStationSet", context);
  },
  setStationLogin(root, args, context) {
    App.handleEvent(args, "setStationLogin", context);
  },
  setStationExecutive(root, args, context) {
    App.handleEvent(args, "setStationExecutive", context);
  },
  toggleStationWidgets(root, args, context) {
    App.handleEvent(args, "toggleStationWidgets", context);
  },
  trainingMode(root, args, context) {
    App.handleEvent(args, "trainingMode", context);
  }
};

export const FlightStructureSubscriptions = {
  stationSetUpdate: {
    resolve(rootValue) {
      return rootValue;
    },
    subscribe: () => pubsub.asyncIterator("stationSetUpdate")
  },
  missionsUpdate: {
    resolve: (rootValue, { missionId }) => {
      if (missionId) {
        return rootValue.filter(m => m.id === missionId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("missionsUpdate"),
      (rootValue, { missionId }) => {
        if (missionId) {
          return !!rootValue.find(m => m.id === missionId);
        }
        return true;
      }
    )
  },
  simulatorsUpdate: {
    resolve(rootValue, { simulatorId, template }) {
      let returnVal = rootValue;
      if (template) returnVal = returnVal.filter(s => s.template);
      if (simulatorId) returnVal = returnVal.filter(s => s.id === simulatorId);
      return returnVal.length > 0 ? returnVal : null;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("simulatorsUpdate"),
      (rootValue, { simulatorId, template }) => {
        let returnVal = rootValue;
        if (template) returnVal = returnVal.filter(s => s.template);
        if (simulatorId)
          returnVal = returnVal.filter(s => s.id === simulatorId);
        return returnVal.length > 0 ? true : false;
      }
    )
  },
  flightsUpdate: {
    resolve(payload, { id }) {
      if (id) return payload.filter(s => s.id === id);
      return payload;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("flightsUpdate"),
      rootValue => {
        return !!rootValue;
      }
    )
  }
};

export const FlightStructureTypes = {
  Simulator: {
    decks(rootValue) {
      return App.decks.filter(d => d.simulatorId === rootValue.id);
    },
    rooms(rootValue) {
      return App.rooms.filter(r => r.simulatorId === rootValue.id);
    },
    systems(rootValue) {
      return App.systems.filter(s => s.simulatorId === rootValue.id);
    },
    stationSets(rootValue) {
      return App.stationSets.filter(s => s.simulatorId === rootValue.id);
    },
    stationSet(rootValue) {
      return App.stationSets.find(s => s.id === rootValue.stationSet);
    }
  },
  Stationset: {
    simulator(rootValue) {
      return App.simulators.find(s => s.id === rootValue.simulatorId);
    }
  },
  Flight: {
    date(rootValue) {
      const date = new Date(rootValue.date);
      return date.toISOString();
    },
    simulators(rootValue) {
      return rootValue.simulators.map(s =>
        App.simulators.find(sim => sim.id === s)
      );
    }
  },
  Mission: {
    id(rootValue) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      return mission.id;
    },
    name(rootValue) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      return mission.name;
    },
    description(rootValue) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      return mission.description;
    },
    timeline(rootValue) {
      const mission = rootValue.timeline
        ? rootValue
        : App.missions.find(m => m.id === rootValue);
      return mission.timeline;
    }
  }
};
