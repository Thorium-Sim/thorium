import { System } from "./generic";
import App from "../app";
import reportReplace from "../helpers/reportReplacer";
class Sector {
  constructor(params, powerLevel = 0) {
    this.level = params.level || Math.floor(powerLevel / 4);
    this.offset = params.offset || 0;
  }
  setLevel(level) {
    this.level = level;
  }
  setOffset(offset) {
    this.offset = Math.min(1, Math.max(0, offset));
  }
}

/*
If a sector has more power than it needs
*/
export default class JumpDrive extends System {
  constructor(params) {
    super(params);
    this.class = "JumpDrive";
    this.type = "JumpDrive";
    this.name = params.name || "Jump Drive";
    this.displayName = params.displayName || "Jump Drive";
    this.simulatorId = params.simulatorId || null;
    this.power = params.power || {
      power: 5,
      powerLevels: [10, 16, 22, 28, 34, 40],
      defaultLevel: 0
    };
    this.sectors = {
      fore: new Sector(
        params.sectors ? params.sectors.fore : {},
        this.power.powerLevels[0]
      ),
      aft: new Sector(
        params.sectors ? params.sectors.aft : {},
        this.power.powerLevels[0]
      ),
      starboard: new Sector(
        params.sectors ? params.sectors.starboard : {},
        this.power.powerLevels[0]
      ),
      port: new Sector(
        params.sectors ? params.sectors.port : {},
        this.power.powerLevels[0]
      )
    };
    this.env = params.env || 0;
    this.activated = params.activated || false;
  }
  static tasks = [
    {
      name: "Activate Jump Drive",
      active({ simulator }) {
        if (!simulator) return false;
        // Check cards
        return (
          simulator.stations.find(s =>
            s.cards.find(c => c.component === "JumpDrive")
          ) &&
          App.systems.find(
            s => s.simulatorId === simulator.id && s.type === "JumpDrive"
          )
        );
      },
      stations({ simulator }) {
        return (
          simulator &&
          simulator.stations.filter(s =>
            s.cards.find(c => c.component === "JumpDrive")
          )
        );
      },
      values: {
        preamble: {
          input: () => "textarea",
          value: () => "The #SYSTEMNAME should be activated."
        }
      },
      instructions({ simulator, requiredValues: { preamble }, task = {} }) {
        const station = simulator.stations.find(s =>
          s.cards.find(c => c.component === "JumpDrive")
        );
        const system = App.systems.find(
          s => s.simulatorId === simulator.id && s.type === "JumpDrive"
        );
        if (station && task.station === station.name)
          return reportReplace(
            `${preamble} Activate the ${system.displayName || system.name}.`,
            { simulator, system }
          );
        return reportReplace(
          `${preamble} Ask the ${
            station
              ? `${station.name} Officer`
              : `person in charge of the ${system.displayName || system.name}`
          } to activate the ${system.displayName || system.name}.`,
          { simulator, system }
        );
      },
      verify({ simulator }) {
        return App.systems.find(
          s =>
            s.simulatorId === simulator.id &&
            s.type === "JumpDrive" &&
            s.activated === true
        );
      }
    },
    {
      name: "Stabilize Jump Drive",
      active({ simulator }) {
        if (!simulator) return false;
        // Check cards
        const system = App.systems.find(
          s => s.simulatorId === simulator.id && s.type === "JumpDrive"
        );
        return (
          simulator.stations.find(s =>
            s.cards.find(c => c.component === "JumpDrive")
          ) &&
          system &&
          system.stress > 0.5
        );
      },
      stations({ simulator }) {
        return (
          simulator &&
          simulator.stations.filter(s =>
            s.cards.find(c => c.component === "JumpDrive")
          )
        );
      },
      values: {
        preamble: {
          input: () => "textarea",
          value: () => "The #SYSTEMNAME is dangerously unstable."
        }
      },
      instructions({ simulator, requiredValues: { preamble }, task = {} }) {
        const station = simulator.stations.find(s =>
          s.cards.find(c => c.component === "JumpDrive")
        );
        const system = App.systems.find(
          s => s.simulatorId === simulator.id && s.type === "JumpDrive"
        );
        if (station && task.station === station.name)
          return reportReplace(`${preamble} Stabilize the #SYSTEMNAME.`, {
            system,
            simulator
          });
        return reportReplace(
          `${preamble} Ask the ${
            station
              ? `${station.name} Officer`
              : `person in charge of the #SYSTEMNAME`
          } to stabilize the #SYSTEMNAME.`,
          { system, simulator }
        );
      },
      verify({ simulator }) {
        return !App.systems.find(
          s =>
            s.simulatorId === simulator.id &&
            s.type === "Engine" &&
            s.stress < 0.1
        );
      }
    }
  ];
  get stealthFactor() {
    return this.activated ? Math.min(1, this.stress) : 0;
  }
  get stress() {
    // Get the difference between the desired levels and levels of each of the sectors.
    const sectors = ["fore", "aft", "starboard", "port"];
    return (
      sectors.reduce((prev, next) => prev + this.sectors[next].offset, 0) / 4
    );
  }
  setEnv(env) {
    this.env = env;
  }
  setActivated(activated) {
    this.activated = activated;
  }
  setSectorLevel(sector, level) {
    this.sectors[sector].setLevel(level);
  }
  addSectorOffset(sector, add) {
    this.sectors[sector].setOffset(this.sectors[sector].offset + add);
  }
  setSectorOffset(sector, offset) {
    this.sectors[sector].setOffset(offset);
  }
  break(report, destroyed, which) {
    this.activated = false;
    super.break(report, destroyed, which);
  }
  setPower(powerLevel) {
    // Decrease the env level to the level indicated by the power;
    if (this.power.powerLevels[0] > powerLevel) {
      this.activated = false;
    }
    const envLevel = this.power.powerLevels.reduce((prev, next, i) => {
      if (next <= powerLevel) return i + 1;
      return prev;
    }, 1);
    if (envLevel < this.env) this.env = envLevel;
    super.setPower(powerLevel);
  }
}
