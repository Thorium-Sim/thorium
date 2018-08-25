import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

export const aspectList = [
  "assetObjects",
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
  "objectives"
];

function addAspects(template, sim) {
  // Duplicate all of the other stuff attached to the simulator too.
  aspectList.forEach(aspect => {
    if (aspect === "softwarePanels") return;
    const filterAspect = App[aspect].filter(
      a => a.simulatorId === template.simulatorId
    );
    filterAspect.forEach(a => {
      const newAspect = Object.assign({}, a);
      newAspect.id = null;
      newAspect.simulatorId = sim.id;
      // Rooms need to reference their deck
      if (aspect === "rooms") {
        const oldDeck = App.decks.find(d => d.id === newAspect.deckId);
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
      if (aspect === "inventory") {
        // Inventory needs to reference the correct room
        const rooms = Object.keys(newAspect.roomCount);
        const newRoomCount = {};
        rooms.forEach(room => {
          const oldRoom = App.rooms.find(r => r.id === room);
          if (!oldRoom) {
            console.log("Failed to load room: ", room);
            return;
          }
          const oldDeck = App.decks.find(d => d.id === oldRoom.deckId);
          const deck = App.decks.find(
            d =>
              d &&
              oldDeck &&
              d.simulatorId === sim.id &&
              d.number === oldDeck.number
          );
          const newRoom = App.rooms.find(
            r =>
              r.name === oldRoom.name &&
              r.simulatorId === sim.id &&
              r.deckId === deck.id
          ).id;
          newRoomCount[newRoom] = newAspect.roomCount[room];
        });
        newAspect.roomCount = newRoomCount;
      }
      if (aspect === "systems") {
        // Create a new isochip for that system, if one exists
        const isochip = App.isochips.find(i => i.system === a.id);
        // Override the system ID
        newAspect.id = uuid.v4();
        if (isochip) {
          isochip.id = uuid.v4();
          isochip.system = newAspect.id;
          isochip.simulatorId = sim.id;
          App.isochips.push(new Classes.Isochip(isochip));
        }
        if (newAspect.power && newAspect.power.powerLevels.length) {
          newAspect.power.power = newAspect.power.defaultLevel
            ? newAspect.power.powerLevels[newAspect.power.defaultLevel]
              ? newAspect.power.powerLevels[newAspect.power.defaultLevel]
              : newAspect.power.powerLevels[0]
            : newAspect.power.powerLevels[0];
        }
        if (newAspect.power && !newAspect.power.powerLevels.length) {
          newAspect.power.power = 0;
        }
        if (newAspect.heat) {
          newAspect.heat = 0;
        }
      }
      App[aspect].push(
        new Classes[newAspect.class](Object.assign({}, newAspect))
      );
    });
  });
  // Add the panels
  const panels =
    App.simulators.find(s => s.id === template.simulatorId).panels || [];
  panels.forEach(p => {
    const panelData = App.softwarePanels.find(s => s.id === p);
    if (!panelData) return;
    const panel = { ...panelData };
    const id = uuid.v4();
    sim.stations = sim.stations.map(s => ({
      ...s,
      cards: s.cards.map(c => ({
        ...c,
        component: c.component === p ? id : c.component
      }))
    }));
    App.softwarePanels.push(
      new Classes.SoftwarePanel({
        id,
        name: panel.name,
        simulatorId: sim.id,
        cables: panel.cables,
        components: panel.components,
        connections: panel.connections
      })
    );
  });
}
// Flight
App.on("startFlight", ({ id, name, simulators }) => {
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
    const stationSet = App.stationSets.find(ss => ss.id === s.stationSet);
    sim.stations = [...stationSet.stations];
    sim.stationSet = stationSet.id;
    App.simulators.push(sim);
    addAspects(s, sim);

    // Create exocomps for the simulator
    App.handleEvent(
      { simulatorId: sim.id, count: sim.exocomps },
      "setSimulatorExocomps"
    );
    return sim.id;
  });
  App.flights.push(new Classes.Flight({ id, name, simulators: simIds }));
  pubsub.publish("flightsUpdate", App.flights);
});

App.on("deleteFlight", ({ flightId }) => {
  const flight = App.flights.find(f => f.id === flightId);
  // We need to remove all reference to this flight.
  // Loop over the simulators
  // Reset the clients
  App.clients
    .concat()
    .filter(c => c.flightId === flightId)
    .forEach(c => {
      c.setTraining(false);
      c.logout();
      c.setOfflineState(null);
      c.setFlight(null);
      c.setHypercard(null);
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
});

App.on("resetFlight", ({ flightId }) => {
  const flight = App.flights.find(f => f.id === flightId);

  // Log out the clients
  App.clients
    .concat()
    .filter(c => c.flightId === flightId)
    .forEach(c => {
      c.setTraining(false);
      c.logout();
      c.setOfflineState(null);
      c.setHypercard(null);
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
    newSim.stationSet = sim.stationSet;
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
      App.clients.filter(c => c.flightId === flightId)
    );
    pubsub.publish("clearCache", App.flights.filter(f => f.id === flightId));
  });
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
