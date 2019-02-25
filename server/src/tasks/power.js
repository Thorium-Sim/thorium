import reportReplace from "../helpers/reportReplacer";
import App from "../app";
import { randomFromList } from "../classes/generic/damageReports/constants";
import getDamageSystem from "../helpers/getDamageSystem";

export default [
  {
    name: "Remove Power",
    class: "Power",
    active({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "PowerDistribution")
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "PowerDistribution")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "Power must be removed from the #SYSTEMNAME system."
      },
      system: {
        input: ({ simulator }) =>
          simulator
            ? App.systems
                .filter(s => s.simulatorId === simulator.id)
                .map(s => ({ value: s.id, label: s.displayName || s.name }))
            : "text",
        value: ({ simulator }) =>
          simulator
            ? randomFromList(
                App.systems
                  .filter(s => s.simulatorId === simulator.id)
                  .map(s => s.id)
              )
            : ""
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, system: sys },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "PowerDistribution")
      );
      const system = getDamageSystem(sys);
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Remove all power from the ${system.displayName ||
            system.name} system.`,
          { simulator, system }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : `person in charge of power distribution`
        } to remove all power from the ${system.displayName ||
          system.name} system.`,
        { simulator, system }
      );
    },
    verify({ simulator, requiredValues }) {
      if (!simulator) return false;
      const system = App.systems.find(
        s => s.id === system || s.name === system || s.displayName === system
      );
      if (!system) return false;
      return system.power.power === 0;
    }
  },
  {
    name: "Restore Power",
    class: "Power",
    active({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "PowerDistribution")
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "PowerDistribution")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "Power must be restored to the #SYSTEMNAME system."
      },
      system: {
        input: ({ simulator }) =>
          simulator
            ? App.systems
                .filter(s => s.simulatorId === simulator.id)
                .map(s => ({ value: s.id, label: s.displayName || s.name }))
            : "text",
        value: ({ simulator }) =>
          simulator
            ? randomFromList(
                App.systems
                  .filter(s => s.simulatorId === simulator.id)
                  .map(s => s.id)
              )
            : ""
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, system: sys },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "PowerDistribution")
      );
      const system = getDamageSystem(sys);
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Restore power in the ${system.displayName ||
            system.name} system to operational levels.`,
          { simulator, system }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : `person in charge of power distribution`
        } to restore power in the ${system.displayName ||
          system.name} system to operational levels.`,
        { simulator, system }
      );
    },
    verify({ simulator, requiredValues }) {
      if (!simulator) return false;
      const system = App.systems.find(
        s => s.id === system || s.name === system || s.displayName === system
      );
      if (!system) return false;
      const powerLevel = system.power.powerLevels[0];
      return system.power.power >= powerLevel;
    }
  },
  {
    name: "Set Power",
    class: "Power",
    active({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "PowerDistribution")
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "PowerDistribution")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () =>
          "The power level of the #SYSTEMNAME system must be changed."
      },
      system: {
        input: ({ simulator }) =>
          simulator
            ? App.systems
                .filter(s => s.simulatorId === simulator.id)
                .map(s => ({ value: s.id, label: s.displayName || s.name }))
            : "text",
        value: ({ simulator }) =>
          simulator
            ? randomFromList(
                App.systems
                  .filter(s => s.simulatorId === simulator.id)
                  .map(s => s.id)
              )
            : ""
      },
      power: {
        input: ({ simulator }) => ({ type: "number", min: 1, max: 40 }),
        value: ({ simulator }) => Math.floor(Math.random() * 30 + 10)
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, system: sys, power },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "PowerDistribution")
      );
      const system = getDamageSystem(sys);
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Set the power level of the ${system.displayName ||
            system.name} system to ${power}.`,
          { simulator, system }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : `person in charge of power distribution`
        } to set the power level of the ${system.displayName ||
          system.name} system to ${power}.`,
        { simulator, system }
      );
    },
    verify({ simulator, requiredValues }) {
      if (!simulator) return false;
      const system = App.systems.find(
        s => s.id === system || s.name === system || s.displayName === system
      );
      if (!system) return false;
      return system.power.power === requiredValues.power;
    }
  }
];
