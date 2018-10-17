import App from "../app";
import { System } from "./generic";
import { randomFromList } from "./generic/damageReports/constants";

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
      active({ requiredValues, stations }) {
        const { id } = requiredValues.shuttle;
        const system = App.systems.find(s => s.id === id);
        // Check cards
        return (
          system.type === "shuttlebay" &&
          stations.find(s => s.cards.find(c => c.component === "Shuttles")) &&
          system.docked === true &&
          (system.clamps || system.compress || system.doors)
        );
      },
      instructions({ simulator, requiredValues: { shuttle, preamble } }) {
        // This method takes the requiredValues and apply them to create
        // the human readable instructions
        // First, get some values
        const shuttleBay = isNaN(parseInt(shuttle, 10))
          ? App.dockingPorts.find(s => s.id === shuttle)
          : App.dockingPorts.filter(s => s.simulatorId === simulator.id)[
              shuttle
            ];
        const station = simulator.stations.find(s =>
          s.cards.find(c => c.component === "Shuttles")
        );
        return `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of shuttles"
        } to undock the shuttle in shuttlebay ${shuttleBay.name}.`;
        // TODO: Make it so it knows if the task is assigned to the station
        // performing the task, or if it needs to be delegated to another station
      },
      values: {
        preamble: {
          input: () => "text",
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
      active({ requiredValues, stations }) {
        const { id } = requiredValues.shuttle;
        const system = App.systems.find(s => s.id === id);
        // Check cards
        return (
          system.type === "shuttlebay" &&
          stations.find(s => s.cards.find(c => c.component === "Shuttles")) &&
          system.docked === true &&
          (system.clamps || system.compress || system.doors)
        );
      },
      instructions({ simulator, requiredValues: { shuttle, preamble } }) {
        // First, get some values
        const shuttleBay = isNaN(parseInt(shuttle, 10))
          ? App.dockingPorts.find(s => s.id === shuttle)
          : App.dockingPorts.filter(s => s.simulatorId === simulator.id)[
              shuttle
            ];
        const station = simulator.stations.find(s =>
          s.cards.find(c => c.component === "Shuttles")
        );
        return `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of shuttles"
        } to dock the shuttle in shuttlebay ${shuttleBay.name}.`;
        // TODO: Make it so it knows if the task is assigned to the station
        // performing the task, or if it needs to be delegated to another station
      },
      values: {
        preamble: {
          input: () => "text",
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
      active({ stations }) {
        return stations.find(s =>
          s.cards.find(c => c.component === "Shuttles")
        );
      },
      instructions({ simulator, requiredValues: { preamble } }) {
        const station = simulator.stations.find(s =>
          s.cards.find(c => c.component === "Shuttles")
        );
        return `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of shuttles"
        } to undock all of the shuttles in shuttlebay.`;
        // TODO: Make it so it knows if the task is assigned to the station
        // performing the task, or if it needs to be delegated to another station
      },
      values: {
        preamble: {
          input: () => "text",
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
      active({ stations }) {
        return stations.find(s =>
          s.cards.find(c => c.component === "Shuttles")
        );
      },
      instructions({ simulator, requiredValues: { preamble } }) {
        const station = simulator.stations.find(s =>
          s.cards.find(c => c.component === "Shuttles")
        );
        return `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of shuttles"
        } to dock all of the shuttles in shuttlebay.`;
        // TODO: Make it so it knows if the task is assigned to the station
        // performing the task, or if it needs to be delegated to another station
      },
      values: {
        preamble: {
          input: () => "text",
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
