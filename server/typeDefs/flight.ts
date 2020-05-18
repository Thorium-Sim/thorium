import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";
import * as Classes from "../classes";
import cloneDeep from "lodash.clonedeep";
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
  "tasks",
  "taskReports",
  "dmxFixtures",
  "taskFlows",
];

export function addAspects(template, sim: Classes.Simulator, data = App) {
  // Duplicate all of the other stuff attached to the simulator too.
  aspectList.forEach(aspect => {
    if (
      aspect === "softwarePanels" ||
      aspect === "commandLines" ||
      aspect === "triggers" ||
      aspect === "midiSets" ||
      aspect === "interfaces" ||
      aspect === "dmxFixtures" ||
      aspect === "taskFlows"
    ) {
      return;
    }
    const filterAspect = data[aspect].filter(
      a => a.simulatorId === template.simulatorId,
    );
    filterAspect.forEach(a => {
      const newAspect = cloneDeep(a);
      newAspect.templateId = newAspect.id;
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
            d.number === oldDeck.number,
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
            d.number === oldDeck.number,
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
              d.number === oldDeck.number,
          );
          const newRoomObj = App.rooms.find(
            r =>
              deck &&
              r.name === oldRoom.name &&
              r.simulatorId === sim.id &&
              r.deckId === deck.id,
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
        if (newAspect.heat && newAspect.class === "Reactor") {
          newAspect.heat = 0;
        }
      }
      const classItem = new Classes[newAspect.class](
        cloneDeep(newAspect),
        true,
      );
      App[aspect].push(classItem);
    });
  });
  // Add the panels
  sim.panels = sim.panels
    .map(p => {
      const panelData = data.softwarePanels.find(s => s.id === p);
      if (!panelData) return null;
      const panel = {...panelData};
      const id = uuid.v4();
      sim.stations = sim.stations.map(
        s =>
          new Classes.Station({
            ...s,
            cards: s.cards.map(
              c =>
                new Classes.Card({
                  ...c,
                  component: c.component === p ? id : c.component,
                }),
            ),
          }),
      );
      data.softwarePanels.push(
        new Classes.SoftwarePanel({
          id,
          templateId: panel.id,
          name: panel.name,
          simulatorId: sim.id,
          cables: panel.cables,
          components: panel.components,
          connections: panel.connections,
        }),
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
        simulatorId: sim.id,
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
        simulatorId: sim.id,
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
        simulatorId: sim.id,
      };
      data.interfaces.push(new Classes.Interface(interfaceObj));

      // Update any clients assigned to this interface as a station
      App.clients
        .filter(
          client =>
            client.simulatorId === sim.id &&
            client.station === `interface-id:${c}`,
        )
        .forEach(client => {
          client.setStation(`interface-id:${id}`);
        });
      return id;
    })
    .filter(Boolean);
}

// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Flight {
    id: ID!
    name: String
    date: String
    running: Boolean
    timelineStep: Int
    simulators: [Simulator]
    flightType: String
    transmitted: Boolean
    clients: [SpaceEdventuresClient]
  }

  type SpaceEdventuresClient {
    id: ID
    token: String
    name: String
    email: String
  }
  extend type Query {
    flights(running: Boolean, id: ID): [Flight!]!
    events: [String]
  }
  extend type Mutation {
    startFlight(
      name: String
      simulators: [SimulatorInput!]!
      flightType: String
    ): String
    """
    Macro: Flight: Reset Flight
    """
    resetFlight(flightId: ID!, full: Boolean): String
    deleteFlight(flightId: ID!): String
    """
    Macro: Flight: Pause Flight
    """
    pauseFlight(flightId: ID!): String
    """
    Macro: Flight: Resume Flight
    """
    resumeFlight(flightId: ID!): String

    # Space EdVentures
    """
    Macro: Space EdVentures: Add Extra Crew Member
    Requires:
      - Space EdVentures
    """
    clientAddExtra(flightId: ID!, simulatorId: ID!, name: String!): String
  }
  extend type Subscription {
    flightsUpdate(running: Boolean, id: ID): [Flight]
  }
`;

interface CacheClearIdentifier {
  id: string;
  connected?: boolean;
}

const resolver = {
  Flight: {
    date(rootValue) {
      const date = new Date(rootValue.date);
      return date.toISOString();
    },
    simulators(rootValue) {
      return rootValue.simulators.map(s =>
        App.simulators.find(sim => sim.id === s),
      );
    },
  },
  Query: {
    events: () => {
      return Object.keys(App._events);
    },
    flights(root, {running, id}) {
      let returnRes = App.flights;
      if (running) {
        returnRes = returnRes.filter(f => f.running);
      }
      if (id) {
        returnRes = returnRes.filter(f => f.id === id);
      }
      return returnRes;
    },
  },
  Mutation: {
    startFlight(rootQuery, {id = uuid.v4(), name, simulators, flightType}) {
      const simIds = simulators.map(
        (s: {simulatorId: string; missionId?: string; stationSet: string}) => {
          const template = cloneDeep(
            App.simulators.find(sim => sim.id === s.simulatorId),
          );
          template.id = null;
          const sim = new Classes.Simulator(template, true);
          sim.template = false;
          sim.templateId = s.simulatorId;
          sim.mission = s.missionId;
          sim.executedTimelineSteps = [];
          sim.clientCards = {};
          sim.stationAssignedCards = {};

          const stationSet = App.stationSets.find(ss => ss.id === s.stationSet);
          sim.stations = stationSet.stations.map(s => new Classes.Station(s));

          sim.stationSet = stationSet.id;
          sim.ship.bridgeCrew = stationSet.crewCount || 14;

          App.simulators.push(sim);
          addAspects(s, sim);

          // Create exocomps for the simulator
          App.handleEvent(
            {simulatorId: sim.id, count: sim.exocomps},
            "setSimulatorExocomps",
          );
          return sim.id;
        },
      );
      App.flights.push(
        new Classes.Flight({id, name, simulators: simIds, flightType}),
      );
      pubsub.publish("interfaceUpdate", App.interfaces);

      pubsub.publish("flightsUpdate", App.flights);
      return id;
    },
    deleteFlight(rootQuery, {flightId}) {
      const flight = App.flights.find(f => f.id === flightId);
      // We need to remove all reference to this flight.
      // Loop over the simulators
      // Reset the clients
      flight.clearTimeouts();

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
      App.entities = App.entities.filter(e => e.flightId !== flightId);
      App.flights = App.flights.filter(f => f.id !== flightId);
      pubsub.publish("flightsUpdate", App.flights);
      pubsub.publish("clientChanged", App.clients);
    },

    resetFlight(rootQuery, {flightId, simulatorId, full}) {
      const flight = App.flights.find(
        f => f.id === flightId || f.simulators.indexOf(simulatorId) > -1,
      );
      flight.clearTimeouts();

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
      flight.simulators.forEach((simId: string) => {
        const sim = App.simulators.find(s => s.id === simId);
        const viewscreens = App.viewscreens.filter(
          s => s.simulatorId === sim.id,
        );
        const tempId = sim.templateId;

        // Update clients with interfaces so they point at the template.
        // We'll change it to point at the simulator interface later.
        App.clients
          .filter(
            client =>
              client.simulatorId === sim.id &&
              client.station &&
              client.station.indexOf(`interface-id:`) > -1,
          )
          .forEach(client => {
            const interfaceId = client.station.replace("interface-id:", "");
            const stationInterface = App.interfaces.find(
              i => i.id === interfaceId,
            );
            client.setStation(`interface-id:${stationInterface.templateId}`);
          });

        // Remove all of the systems, inventory, crew, etc.
        aspectList.forEach(aspect => {
          App[aspect] = App[aspect].filter(
            (a: {simulatorId: string}) => a.simulatorId !== simId,
          );
        });

        App.simulators = App.simulators.filter(s => s.id !== simId);

        // Create new simulators based on the template
        const template = cloneDeep(
          App.simulators.find(tempSim => tempSim.id === tempId),
        );
        template.id = sim.id;
        const newSim = new Classes.Simulator(template, true);
        newSim.template = false;
        newSim.templateId = tempId;
        newSim.mission = sim.mission;
        newSim.stations = sim.stations;
        newSim.executedTimelineSteps = [];
        newSim.clientCards = {};
        newSim.stationAssignedCards = {};

        newSim.stationSet = sim.stationSet;
        const stationSet = App.stationSets.find(
          s => s.id === newSim.stationSet,
        );
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
              secondary: v.secondary,
            }),
          ),
        );
        App.simulators.push(newSim);
        addAspects({simulatorId: tempId}, newSim);
        // Create exocomps for the simulator
        App.handleEvent(
          {simulatorId: newSim.id, count: newSim.exocomps},
          "setSimulatorExocomps",
        );
        pubsub.publish("flightsUpdate", App.flights);
        pubsub.publish("interfaceUpdate", App.interfaces);
        pubsub.publish("clientChanged", App.clients);

        const cacheIdentifiers: CacheClearIdentifier[] = []
          .concat(App.clients.filter(c => c.flightId === flightId))
          .concat(App.flights.filter(f => f.id === flightId));

        pubsub.publish("clearCache", cacheIdentifiers);
        pubsub.publish("simulatorsUpdate", App.simulators);
      });
    },
    pauseFlight(rootQuery, {flightId, simulatorId}) {
      const flight = App.flights.find(
        f => f.id === flightId || f.simulators.includes(simulatorId),
      );
      flight.pause();
      pubsub.publish("flightsUpdate", App.flights);
    },
    resumeFlight(rootQuery, {flightId, simulatorId}) {
      const flight = App.flights.find(
        f => f.id === flightId || f.simulators.includes(simulatorId),
      );
      flight.resume();
      pubsub.publish("flightsUpdate", App.flights);
    },
    clientAddExtra(rootQuery, {flightId, simulatorId, name}) {
      const flight = App.flights.find(
        f => f.id === flightId || f.simulators.includes(simulatorId),
      );
      const extra = {
        id: name,
        token: tokenGenerator(),
        simulatorId,
        name,
      };
      flight.loginClient(extra);
      pubsub.publish("flightsUpdate", App.flights);
    },
  },
  Subscription: {
    flightsUpdate: {
      resolve(payload, {id}) {
        if (id) return payload.filter(s => s.id === id);
        return payload;
      },
      subscribe: withFilter(
        (rootQuery, {running, id}) => {
          const subId = uuid.v4();
          process.nextTick(() => {
            let returnRes = App.flights;
            if (running) {
              returnRes = returnRes.filter(f => f.running);
            }
            if (id) {
              returnRes = returnRes.filter(f => f.id === id);
            }
            pubsub.publish(subId, returnRes);
          });
          return pubsub.asyncIterator([subId, "flightsUpdate"]);
        },
        rootValue => {
          return !!rootValue;
        },
      ),
    },
  },
};

export default {schema, resolver};
