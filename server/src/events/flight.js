import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";
import tokenGenerator from "../helpers/tokenGenerator";

export const aspectList = [
  "systems",
  "decks",
  "rooms",
  "crew",
  "teams",
  "inventory",
  "dockingPorts",
  "isochips",
  "coreFeed",
  "viewscreens",
  "messages",
  "officerLogs",
  "exocomps",
  "libraryDatabase",
  "softwarePanels",
  "surveyForms",
  "objectives",
  "commandLine",
  "triggerGroups",
  "interfaces",
  "tasks"
];

export function addAspects(template, sim, data = App) {
  // Duplicate all of the other stuff attached to the simulator too.
  aspectList.forEach(aspect => {
    if (aspect === "softwarePanels" || aspect === "commandLines") return;
    const filterAspect = data[aspect].filter(
      a => a.simulatorId === template.simulatorId
    );
    filterAspect.forEach(a => {
      const newAspect = Object.assign({}, a);
      newAspect.id = null;
      newAspect.simulatorId = sim.id;
      // Rooms need to reference their deck
      if (aspect === "rooms") {
        const oldDeck = data.decks.find(d => d.id === newAspect.deckId);
        const deck = App.decks.find(
          d =>
            d &&
            oldDeck &&
            d.simulatorId === sim.id &&
            d.number === oldDeck.number
        );
        if (!deck) return;
        newAspect.deckId = deck.id;
      }
      // Docking ports also need to reference their deck
      if (aspect === "dockingPorts") {
        const oldDeck = data.decks.find(d => d.id === newAspect.deckId);
        const deck = App.decks.find(
          d =>
            d &&
            oldDeck &&
            d.simulatorId === sim.id &&
            d.number === oldDeck.number
        );
        if (deck) {
          newAspect.deckId = deck.id;
        }
      }
      if (aspect === "inventory") {
        // Inventory needs to reference the correct room
        const rooms = Object.keys(newAspect.roomCount);
        const newRoomCount = {};
        rooms.forEach(room => {
          const oldRoom = data.rooms.find(r => r.id === room);
          if (!oldRoom) {
            return;
          }
          const oldDeck = data.decks.find(d => d.id === oldRoom.deckId);
          const deck = App.decks.find(
            d =>
              d &&
              oldDeck &&
              d.simulatorId === sim.id &&
              d.number === oldDeck.number
          );
          const newRoomObj = App.rooms.find(
            r =>
              deck &&
              r.name === oldRoom.name &&
              r.simulatorId === sim.id &&
              r.deckId === deck.id
          );
          if (!newRoomObj) return;
          const newRoom = newRoomObj.id;
          newRoomCount[newRoom] = newAspect.roomCount[room];
        });
        newAspect.roomCount = newRoomCount;
      }
      if (aspect === "systems") {
        // Create a new isochip for that system, if one exists
        const isochip = data.isochips.find(i => i.system === a.id);
        // Override the system ID
        newAspect.id = uuid.v4();
        if (isochip) {
          isochip.id = uuid.v4();
          isochip.system = newAspect.id;
          isochip.simulatorId = sim.id;
          data.isochips.push(new Classes.Isochip(isochip));
        }
        if (newAspect.power && newAspect.power.powerLevels.length) {
          newAspect.power.power =
            newAspect.power.defaultLevel || newAspect.power.defaultLevel === 0
              ? newAspect.power.powerLevels[newAspect.power.defaultLevel]
                ? newAspect.power.powerLevels[newAspect.power.defaultLevel]
                : newAspect.power.powerLevels[0]
              : newAspect.power.powerLevels[0];
          if (newAspect.power.defaultLevel === -1) newAspect.power.power = 0;
        }
        if (newAspect.power && !newAspect.power.powerLevels.length) {
          newAspect.power.power = 0;
        }
        if (newAspect.heat) {
          newAspect.heat = 0;
        }
      }
      const classItem = new Classes[newAspect.class](
        Object.assign({}, newAspect),
        true
      );
      App[aspect].push(classItem);
    });
  });
  // Add the panels
  sim.panels = sim.panels
    .map(p => {
      const panelData = data.softwarePanels.find(s => s.id === p);
      if (!panelData) return null;
      const panel = { ...panelData };
      const id = uuid.v4();
      sim.stations = sim.stations.map(s => ({
        ...s,
        cards: s.cards.map(c => ({
          ...c,
          component: c.component === p ? id : c.component
        }))
      }));
      data.softwarePanels.push(
        new Classes.SoftwarePanel({
          id,
          name: panel.name,
          simulatorId: sim.id,
          cables: panel.cables,
          components: panel.components,
          connections: panel.connections
        })
      );
      return id;
    })
    .filter(Boolean);

  // And the command lines
  sim.commandLines = sim.commandLines
    .map(c => {
      const commandLineData = data.commandLine.find(s => s.id === c);
      if (!commandLineData) return null;
      const id = uuid.v4();
      const commandLine = {
        ...commandLineData,
        templateId: commandLineData.id,
        id,
        simulatorId: sim.id
      };
      data.commandLine.push(new Classes.CommandLine(commandLine));
      return id;
    })
    .filter(Boolean);

  // And the triggers
  sim.triggers = sim.triggers
    .map(c => {
      const triggerData = data.triggerGroups.find(s => s.id === c);
      if (!triggerData) return null;
      const id = uuid.v4();
      const trigger = {
        ...triggerData,
        templateId: triggerData.id,
        id,
        simulatorId: sim.id
      };
      data.triggerGroups.push(new Classes.Trigger(trigger));
      return id;
    })
    .filter(Boolean);

  // And the interfaces
  sim.interfaces = sim.interfaces
    .map(c => {
      const interfaceData = data.interfaces.find(s => s.id === c);
      if (!interfaceData) return null;
      const id = uuid.v4();
      const interfaceObj = {
        ...interfaceData,
        templateId: interfaceData.id,
        id,
        simulatorId: sim.id
      };
      data.interfaces.push(new Classes.Interface(interfaceObj));
      return id;
    })
    .filter(Boolean);
}
// Flight
App.on(
  "startFlight",
  ({ id = uuid.v4(), name, simulators, flightType, cb }) => {
    // Loop through all of the simulators
    const simIds = simulators.map(s => {
      const template = Object.assign(
        {},
        App.simulators.find(sim => sim.id === s.simulatorId)
      );
      template.id = null;
      const sim = new Classes.Simulator(template);
      sim.template = false;
      sim.templateId = s.simulatorId;
      sim.mission = s.missionId;
      sim.executedTimelineSteps = [];
      const stationSet = App.stationSets.find(ss => ss.id === s.stationSet);
      sim.stations = stationSet.stations.map(s => new Classes.Station(s));

      sim.stationSet = stationSet.id;
      sim.ship.bridgeCrew = stationSet.crewCount || 14;

      App.simulators.push(sim);
      addAspects(s, sim);

      // Create exocomps for the simulator
      App.handleEvent(
        { simulatorId: sim.id, count: sim.exocomps },
        "setSimulatorExocomps"
      );
      return sim.id;
    });
    App.flights.push(
      new Classes.Flight({ id, name, simulators: simIds, flightType })
    );
    pubsub.publish("flightsUpdate", App.flights);
    cb && cb(id);
  }
);

App.on("deleteFlight", ({ flightId, cb }) => {
  const flight = App.flights.find(f => f.id === flightId);
  // We need to remove all reference to this flight.
  // Loop over the simulators
  // Reset the clients
  App.clients
    .concat()
    .filter(c => c.flightId === flightId)
    .forEach(c => {
      c.reset(true);
    });
  App.tacticalMaps = App.tacticalMaps.filter(t => t.flightId !== flightId);
  flight.simulators.forEach(simId => {
    // Remove all of the systems, inventory, crew, etc.
    aspectList.forEach(aspect => {
      App[aspect] = App[aspect].filter(a => a.simulatorId !== simId);
    });
    App.simulators = App.simulators.filter(s => s.id !== simId);
  });
  App.flights = App.flights.filter(f => f.id !== flightId);
  pubsub.publish("flightsUpdate", App.flights);
  pubsub.publish("clientChanged", App.clients);
  cb();
});

App.on("resetFlight", ({ flightId, simulatorId, full, cb }) => {
  const flight = App.flights.find(
    f => f.id === flightId || f.simulators.indexOf(simulatorId) > -1
  );
  flightId = flight.id;
  // Log out the clients
  App.clients
    .concat()
    .filter(c => c.flightId === flightId)
    .forEach(c => {
      c.reset();
    });
  App.tacticalMaps = App.tacticalMaps.filter(t => t.flightId !== flightId);

  // Create new simulators, then delete the old ones
  flight.simulators.forEach(simId => {
    const sim = App.simulators.find(s => s.id === simId);
    const viewscreens = App.viewscreens.filter(s => s.simulatorId === sim.id);
    const tempId = sim.templateId;
    // Remove all of the systems, inventory, crew, etc.
    aspectList.forEach(aspect => {
      App[aspect] = App[aspect].filter(a => a.simulatorId !== simId);
    });
    App.simulators = App.simulators.filter(s => s.id !== simId);

    // Create new simulators based on the template
    const template = Object.assign(
      {},
      App.simulators.find(tempSim => tempSim.id === tempId)
    );
    template.id = sim.id;
    const newSim = new Classes.Simulator(template);
    newSim.template = false;
    newSim.templateId = tempId;
    newSim.mission = sim.missionId;
    newSim.stations = sim.stations;
    newSim.executedTimelineSteps = [];

    newSim.stationSet = sim.stationSet;
    const stationSet = App.stationSets.find(s => s.id === newSim.stationSet);
    newSim.ship.bridgeCrew = stationSet.crewCount || 14;

    // If this isn't a full reset, transfer over the mission information too
    if (!full) {
      newSim.mission = sim.mission;
      newSim.currentTimelineStep = sim.currentTimelineStep;
      newSim.executedTimelineSteps = sim.executedTimelineSteps;
    }
    viewscreens.forEach(v =>
      App.viewscreens.push(
        new Classes.Viewscreen({
          id: v.id,
          simulatorId: newSim.id,
          name: v.name,
          secondary: v.secondary
        })
      )
    );
    App.simulators.push(newSim);
    addAspects({ simulatorId: tempId }, newSim);
    // Create exocomps for the simulator
    App.handleEvent(
      { simulatorId: newSim.id, count: newSim.exocomps },
      "setSimulatorExocomps"
    );
    pubsub.publish("flightsUpdate", App.flights);
    pubsub.publish("clientChanged", App.clients);
    pubsub.publish(
      "clearCache",
      App.clients
        .filter(c => c.flightId === flightId)
        .concat(App.flights.filter(f => f.id === flightId))
    );
    pubsub.publish("simulatorsUpdate", App.simulators);
  });
  cb && cb();
});
App.on("pauseFlight", ({ flightId }) => {
  const flight = App.flights.find(f => f.id === flightId);
  flight.pause();
  pubsub.publish("flightsUpdate", App.flights);
});
App.on("resumeFlight", ({ flightId }) => {
  const flight = App.flights.find(f => f.id === flightId);
  flight.resume();
  pubsub.publish("flightsUpdate", App.flights);
});
App.on("clientAddExtra", ({ flightId, simulatorId, name }) => {
  const flight = App.flights.find(f => f.id === flightId);
  const extra = {
    id: name,
    token: tokenGenerator(),
    simulatorId,
    name
  };
  flight.loginClient(extra);
  pubsub.publish("flightsUpdate", App.flights);
});
