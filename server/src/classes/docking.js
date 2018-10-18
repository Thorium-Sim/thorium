import App from "../app";
import { System } from "./generic";
import { randomFromList } from "./generic/damageReports/constants";
import reportReplace from "../helpers/reportReplacer";

export default class DockingPort extends System {
  constructor(params) {
    super(params);
    this.class = "DockingPort";
    this.type = params.type || "shuttlebay";
    if (this.type === "shuttlebay") {
      this.clamps = params.clamps || true;
      this.compress = params.compress || true;
      this.doors = params.doors || true; // Doors are closed
      this.image = params.image || "/Docking Images/Default.png";
      this.docked = params.docked || true;
    } else {
      this.clamps = params.clamps || false;
      this.compress = params.compress || false;
      this.doors = params.doors || false; // Doors are closed
      this.image = params.image || "/Docking Images/Default.png";
      this.docked = params.docked || false;
    }
  }
  static tasks = [
    {
      name: "Undock Shuttle",
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
          : App.dockingPorts.filter(s => s.simulatorId === simulator.id)[
              shuttle
            ];
        const station = simulator.stations.find(s =>
          s.cards.find(c => c.component === "Shuttles")
        );
        if (task.station === station.name) {
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
                    s =>
                      s.simulatorId === simulator.id && s.type === "shuttlebay"
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
          : App.dockingPorts.filter(s => s.simulatorId === simulator.id)[
              shuttle
            ];
        const station = simulator.stations.find(s =>
          s.cards.find(c => c.component === "Shuttles")
        );
        if (task.station === station.name) {
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
                    s =>
                      s.simulatorId === simulator.id && s.type === "shuttlebay"
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
                        s.simulatorId === simulator.id &&
                        s.type === "shuttlebay"
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
        if (task.station === station.name) {
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
        if (task.station === station.name) {
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
  updateDockingPort({ name, type, clamps, compress, doors, image, docked }) {
    if (name || name === "") {
      this.name = name;
    }
    if (type) {
      this.type = type;
    }
    if (clamps || clamps === false) {
      this.clamps = clamps;
    }
    if (compress || compress === false) {
      this.compress = compress;
    }
    if (doors || doors === false) {
      this.doors = doors;
    }
    if (image) {
      this.image = image;
    }
    if (docked || docked === false) {
      this.docked = docked;
    }
  }
}
