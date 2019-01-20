import App from "../app";
import reportReplace from "../helpers/reportReplacer";
import { randomFromList } from "../classes/generic/damageReports/constants";

export default [
  {
    name: "Undock Shuttle",
    class: "Docking",
    active({ requiredValues = {}, simulator }) {
      const id = requiredValues.shuttle;
      const { stations } = simulator;
      const system = App.systems.find(s => s.id === id);
      const hasCard = stations.find(s =>
        s.cards.find(c => c.component === "Shuttles")
      );
      if (!system) return hasCard;
      // Check cards
      return (
        system.type === "shuttlebay" &&
        hasCard &&
        system.docked === true &&
        (system.clamps || system.compress || system.doors)
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "Shuttles")
        )
      );
    },
    instructions({
      simulator,
      requiredValues: { shuttle, preamble },
      task = {}
    }) {
      // This method takes the requiredValues and apply them to create
      // the human readable instructions
      // First, get some values
      const shuttleBay = isNaN(shuttle)
        ? App.dockingPorts.find(s => s.id === shuttle)
        : App.dockingPorts.filter(s => s.simulatorId === simulator.id)[shuttle];
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "Shuttles")
      );
      if (station && task.station === station.name) {
        return reportReplace(
          `${preamble} Undock the shuttle in shuttlebay ${shuttleBay.name}.`,
          { system: shuttleBay, simulator }
        );
      }
      return reportReplace(
        `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of shuttles"
        } to undock the shuttle in shuttlebay ${shuttleBay.name}.`,
        { system: shuttleBay, simulator }
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "A shuttle needs to be undocked."
      },
      shuttle: {
        input: ({ simulator }) =>
          simulator
            ? App.dockingPorts
                .filter(
                  s => s.simulatorId === simulator.id && s.type === "shuttlebay"
                )
                .map(s => ({ label: s.displayName || s.name, value: s.id }))
            : {
                type: "number",
                min: 0,
                placeholder: "The index of the shuttlebay. Starts at 0"
              },
        value: ({ simulator }) => {
          if (!simulator) return "";
          const shuttleBay = randomFromList(
            App.dockingPorts.filter(
              s => s.simulatorId === simulator.id && s.type === "shuttlebay"
            )
          );
          if (shuttleBay) return shuttleBay.id;
        }
      }
    },
    verify({ requiredValues }) {
      const id = requiredValues.shuttle;
      const system = App.dockingPorts.find(s => s.id === id);
      system.docked = false;
    }
  },
  {
    name: "Dock Shuttle",
    class: "Docking",
    active({ requiredValues = {}, simulator }) {
      const { stations } = simulator;
      const id = requiredValues.shuttle;
      const system = App.systems.find(s => s.id === id);
      const hasCard = stations.find(s =>
        s.cards.find(c => c.component === "Shuttles")
      );
      if (!system) return hasCard;
      // Check cards
      return (
        system.type === "shuttlebay" &&
        hasCard &&
        system.docked === true &&
        (system.clamps || system.compress || system.doors)
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "Shuttles")
        )
      );
    },
    instructions({
      simulator,
      requiredValues: { shuttle, preamble },
      task = {}
    }) {
      // First, get some values
      const shuttleBay = isNaN(shuttle)
        ? App.dockingPorts.find(s => s.id === shuttle)
        : App.dockingPorts.filter(s => s.simulatorId === simulator.id)[shuttle];
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "Shuttles")
      );
      if (station && task.station === station.name) {
        return reportReplace(
          `${preamble} Dock the shuttle in shuttlebay ${shuttleBay.name}.`,
          { system: shuttleBay, simulator }
        );
      }
      return reportReplace(
        `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of shuttles"
        } to dock the shuttle in shuttlebay ${shuttleBay.name}.`,
        { system: shuttleBay, simulator }
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "A shuttle needs to be docked."
      },
      shuttle: {
        input: ({ simulator }) =>
          simulator
            ? App.dockingPorts
                .filter(
                  s => s.simulatorId === simulator.id && s.type === "shuttlebay"
                )
                .map(s => ({ label: s.displayName || s.name, value: s.id }))
            : {
                type: "number",
                min: 0,
                placeholder: "The index of the shuttlebay. Starts at 0"
              },
        value: ({ simulator }) =>
          simulator
            ? randomFromList(
                App.dockingPorts
                  .filter(
                    s =>
                      s.simulatorId === simulator.id && s.type === "shuttlebay"
                  )
                  .map(s => s.id)
              )
            : ""
      }
    },
    verify({ requiredValues }) {
      const id = requiredValues.shuttle;
      const system = App.dockingPorts.find(s => s.id === id);
      return system.clamps && system.compress && system.doors;
    }
  },
  {
    name: "Undock All Shuttles",
    class: "Docking",
    active({ simulator }) {
      if (!simulator) return false;
      return simulator.stations.find(s =>
        s.cards.find(c => c.component === "Shuttles")
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "Shuttles")
        )
      );
    },
    instructions({ simulator, requiredValues: { preamble }, task = {} }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "Shuttles")
      );
      if (station && task.station === station.name) {
        return reportReplace(
          `${preamble} Undock all of the shuttles in the shuttlebay.`,
          { simulator }
        );
      }
      return reportReplace(
        `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of shuttles"
        } to undock all of the shuttles in the shuttlebay.`,
        { simulator }
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "All shuttles needs to be undocked."
      }
    },
    verify({ simulator }) {
      const shuttles = App.dockingPorts.filter(
        d => d.simulatorId === simulator.id && d.type === "shuttlebay"
      );
      return !shuttles.find(s => s.clamps || s.compress || s.doors);
    }
  },
  {
    name: "Dock All Shuttles",
    class: "Docking",
    active({ simulator }) {
      if (!simulator) return false;
      return simulator.stations.find(s =>
        s.cards.find(c => c.component === "Shuttles")
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "Shuttles")
        )
      );
    },
    instructions({ simulator, requiredValues: { preamble }, task = {} }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "Shuttles")
      );
      if (station && task.station === station.name) {
        return reportReplace(
          `${preamble} Dock all of the shuttles in the shuttlebay.`,
          { simulator }
        );
      }
      return reportReplace(
        `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of shuttles"
        } to dock all of the shuttles in the shuttlebay.`,
        { simulator }
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "All shuttles needs to be docked."
      }
    },
    verify({ simulator }) {
      const shuttles = App.dockingPorts.filter(
        d => d.simulatorId === simulator.id && d.type === "shuttlebay"
      );
      return !shuttles.find(s => !s.clamps || !s.compress || !s.doors);
    }
  }
];
