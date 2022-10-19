import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import uuid from "uuid";
import {Simulator, Station} from "../classes";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  input SimulatorInput {
    simulatorId: ID!
    stationSet: ID!
    missionId: ID
  }

  type Simulator {
    id: ID!
    name: String
    alertlevel: String
    alertLevelLock: Boolean
    layout: String
    caps: Boolean
    template: Boolean
    templateId: ID
    systems: [System!]
    stations: [Station!]
    mission: Mission
    missionConfigs: JSON
    currentTimelineStep: Int
    executedTimelineSteps: [ID!]
    timelines: [TimelineInstance!]
    decks: [Deck]
    rooms: [Room]
    ship: Ship
    stepDamage: Boolean
    verifyStep: Boolean
    requiredDamageSteps: [DamageStep]
    optionalDamageSteps: [DamageStep]
    exocomps: Int
    training: Boolean
    panels: [ID]
    commandLines: [ID]
    triggers: [ID]
    triggersPaused: Boolean
    interfaces: [ID]
    midiSets: [ID]
    bridgeOfficerMessaging: Boolean
    hasPrinter: Boolean
    hasLegs: Boolean
    spaceEdventuresId: String
    flipped: Boolean
    capabilities: SimulatorCapabilities
    documents: [Document!]
  }

  type Document {
    id: ID!
    name: String!
    asset: String!
  }
  type SimulatorCapabilities {
    systems: [String!]!
    cards: [String!]!
    spaceEdventures: Boolean
    docking: Boolean
  }

  extend type Query {
    simulators(template: Boolean, id: ID): [Simulator!]!
  }
  extend type Mutation {
    createSimulator(name: String!, template: Boolean): String
    removeSimulator(simulatorId: ID!): String
    triggerMacros(simulatorId: ID!, macros: [MacroInput]!): String
    """
    Macro: Timeline: Auto-Advance Timeline Step (Use with Delay)
    """
    autoAdvance(simulatorId: ID!, prev: Boolean, limited: Boolean): String
    """
    Macro: Flight: Start Training Mode
    """
    trainingMode(simulatorId: ID!): String

    """
    Macro: Simulator: Set Alert Condition Lock
    """
    setAlertConditionLock(simulatorId: ID!, lock: Boolean!): String

    """
    Macro: Simulator: Rename Simulator
    """
    renameSimulator(simulatorId: ID!, name: String!): String

    """
    Macro: Simulator: Change Simulator Layout
    """
    changeSimulatorLayout(simulatorId: ID!, layout: String!): String

    changeSimulatorCaps(simulatorId: ID!, caps: Boolean!): String

    """
    Macro: Simulator: Change Alert Level
    """
    changeSimulatorAlertLevel(simulatorId: ID!, alertLevel: String!): String

    """
    Macro: Station: Hide Card
    """
    hideSimulatorCard(simulatorId: ID!, cardName: String!, delay: Int): String
    """
    Macro: Station: Unhide Card
    """
    unhideSimulatorCard(simulatorId: ID!, cardName: String!): String

    stationAssignCard(
      simulatorId: ID!
      assignedToStation: String!
      cardName: String!
    ): String
    stationUnassignCard(simulatorId: ID!, cardName: String!): String

    """
    Macro: Simulator: Flip Simulator
    """
    flipSimulator(simulatorId: ID!, flip: Boolean!): String

    toggleSimulatorCardHidden(
      simulatorId: ID!
      cardName: String!
      toggle: Boolean!
    ): String
    changeSimulatorExocomps(simulatorId: ID!, exocomps: Int!): String
    changeSimulatorBridgeCrew(simulatorId: ID!, crew: Int!): String
    changeSimulatorExtraPeople(simulatorId: ID!, crew: Int!): String
    changeSimulatorRadiation(simulatorId: ID!, radiation: Float!): String
    setSimulatorTimelineStep(
      simulatorId: ID!
      timelineId: ID
      step: Int!
    ): String

    """
    Macro: Timeline: Change Timeline Mission or Step
    """
    setSimulatorMission(simulatorId: ID!, missionId: ID!, stepId: ID): String
    setSimulatorMissionConfig(
      simulatorId: ID!
      missionId: ID!
      stationSetId: ID!
      actionId: ID!
      args: JSON!
    ): String
    updateSimulatorPanels(simulatorId: ID!, panels: [ID]!): String
    updateSimulatorCommandLines(simulatorId: ID!, commandLines: [ID]!): String
    updateSimulatorTriggers(simulatorId: ID!, triggers: [ID]!): String
    setSimulatorTriggersPaused(simulatorId: ID!, paused: Boolean!): String
    updateSimulatorInterfaces(simulatorId: ID!, interfaces: [ID]!): String

    setStepDamage(simulatorId: ID!, stepDamage: Boolean!): String
    setVerifyDamage(simulatorId: ID!, verifyStep: Boolean!): String
    setBridgeMessaging(id: ID!, messaging: Boolean!): String
    setSimulatorAssets(id: ID!, assets: SimulatorAssetsInput!): String
    setSimulatorSoundEffects(id: ID!, soundEffects: JSON!): String
    setSimulatorHasPrinter(simulatorId: ID!, hasPrinter: Boolean!): String
    setSimulatorHasLegs(simulatorId: ID!, hasLegs: Boolean!): String

    setSimulatorSpaceEdventuresId(
      simulatorId: ID!
      spaceEdventuresId: String!
    ): String

    ## Stations
    addSimulatorStationCard(
      simulatorId: ID!
      station: String!
      cardName: String!
      cardComponent: String!
    ): String
    removeSimulatorStationCard(
      simulatorId: ID!
      station: String!
      cardName: String!
    ): String
    editSimulatorStationCard(
      simulatorId: ID!
      station: String!
      cardName: String!
      newCardName: String
      cardComponent: String
    ): String
    setSimulatorStationMessageGroup(
      simulatorId: ID!
      station: String!
      group: String!
      state: Boolean!
    ): String
    setSimulatorStationLogin(
      simulatorId: ID!
      station: String!
      login: Boolean!
    ): String
    setSimulatorStationLayout(
      simulatorId: ID!
      station: String!
      layout: String!
    ): String
    setSimulatorStationExecutive(
      simulatorId: ID!
      station: String!
      exec: Boolean!
    ): String
    setSimulatorStationWidget(
      simulatorId: ID!
      station: String!
      widget: String!
      state: Boolean!
    ): String

    """
    Macro: Document: Add Document
    """
    documentAdd(simulatorId: ID!, name: String!, asset: String!): String
    documentRemove(simulatorId: ID!, id: ID!): String
  }
  extend type Subscription {
    simulatorsUpdate(simulatorId: ID, template: Boolean): [Simulator]
  }
`;

function colorFunc(alertlevel) {
  switch (alertlevel) {
    case "1":
      return "#f00";
    case "2":
      return "#f80";
    case "3":
      return "#ff0";
    case "4":
      return "#0f0";
    case "5":
      return "#08f";
    case "p":
      return "rebeccapurple";
    default:
      return "white";
  }
}

const resolver = {
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
    stations(rootValue) {
      const interfaces = rootValue.interfaces.map(i =>
        App.interfaces.find(({id}) => i === id),
      );
      return rootValue.stations.map(station => {
        if (station)
          return {
            ...station,
            cards: station.cards.map(c => {
              if (
                c.component.match(/interface-id:.{8}-.{4}-.{4}-.{4}-.{12}/gi)
              ) {
                const iface = interfaces.find(
                  i =>
                    i.templateId === c.component.replace("interface-id:", ""),
                );
                return {...c, component: `interface-id:${iface.id}`};
              }
              return c;
            }),
          };
        return station;
      });
    },
    stationSets(rootValue) {
      return App.stationSets.filter(s => s.simulatorId === rootValue.id);
    },
    stationSet(rootValue) {
      return App.stationSets.find(s => s.id === rootValue.stationSet);
    },
    lighting(rootValue) {
      return {
        ...rootValue.lighting,
        color: rootValue.lighting.color || colorFunc(rootValue.alertLevel),
      };
    },
    capabilities(sim: Simulator) {
      const flight = App.flights.find(s => s.simulators.includes(sim.id));
      const cards = sim.stations
        .flatMap((s: Station) =>
          s.cards
            .flatMap(c => c.component)
            .concat(
              s.widgets.map(w => {
                if (w === "Messaging") return "Messages";
                if (w === "Damage Report") return "DamageControl";
                if (w === "Engineering Report") return "EngineeringReports";
                if (w === "R&D Report") return "RnDReports";
                if (w === "Officer Log") return "OfficerLog";
                if (w === "Command Line") return "CommandLine";
                return w;
              }),
            ),
        )
        .filter((c, i, arr) => arr.indexOf(c) === i);
      const systems = App.systems
        .filter(s => s.simulatorId === sim.id)
        .map(s => s.class)
        .filter((c, i, arr) => arr.indexOf(c) === i);
      const docking = App.dockingPorts.find(d => d.simulatorId === sim.id);
      return {
        cards,
        systems,
        spaceEdventures: Boolean(flight?.flightType),
        docking: Boolean(docking),
      };
    },
  },
  Query: {
    simulators: (root, {template, id}) => {
      let returnVal = App.simulators;
      if (id) returnVal = returnVal.filter(s => s.id === id);
      if (template) returnVal = returnVal.filter(s => s.template);
      return returnVal;
    },
  },
  Mutation: {
    documentAdd(root, {simulatorId, name, asset}) {
      const simulator = App.simulators.find(s => s.id === simulatorId);
      if (!simulator) return;
      simulator.documents.push({id: uuid.v4(), name, asset});
      pubsub.publish("simulatorsUpdate", App.simulators);
    },
    documentRemove(root, {simulatorId, id}) {
      const simulator = App.simulators.find(s => s.id === simulatorId);
      if (!simulator) return;
      simulator.documents = simulator.documents.filter(s => s.id !== id);
      pubsub.publish("simulatorsUpdate", App.simulators);
    },
  },
  Subscription: {
    simulatorsUpdate: {
      resolve(rootValue: Simulator[] = [], {simulatorId, template}) {
        let returnVal = rootValue;
        if (template) returnVal = returnVal.filter(s => s.template);
        if (simulatorId)
          returnVal = returnVal.filter(s => s.id === simulatorId);
        return returnVal.length > 0 ? returnVal : null;
      },
      subscribe: withFilter(
        (rootValue, {simulatorId, template}) => {
          const id = uuid.v4();
          process.nextTick(() => {
            let returnVal = App.simulators;
            if (simulatorId)
              returnVal = returnVal.filter(s => s.id === simulatorId);
            if (template) returnVal = returnVal.filter(s => s.template);
            pubsub.publish(id, returnVal);
          });
          return pubsub.asyncIterator([id, "simulatorsUpdate"]);
        },
        (rootValue, {simulatorId, template}) => {
          let returnVal = rootValue;
          if (!returnVal) return false;
          if (template) returnVal = returnVal.filter(s => s.template);
          if (simulatorId)
            returnVal = returnVal.filter(s => s.id === simulatorId);
          return returnVal.length > 0 ? true : false;
        },
      ),
    },
  },
};

export default {schema, resolver};
