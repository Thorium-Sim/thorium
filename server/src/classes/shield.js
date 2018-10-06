import App from "../app";
import { System } from "./generic";
import { randomFromList } from "./generic/damageReports/constants";

export default class Shield extends System {
  constructor(params) {
    super(params);
    this.class = "Shield";
    this.type = "Shield";
    this.name = params.name || "Full";
    this.displayName =
      params.displayName ||
      (this.name === "Full" ? "Shields" : this.name + " Shields");
    // One of '0,1,2,3,4,5,6'
    this.position = params.position || 0;
    this.frequency = params.frequency || 260.5;
    this.state = params.state || false;
    this.integrity = params.integrity || 1;
  }
  static tasks = [
    {
      name: "Raise All Shields",
      active({ stations }) {
        return stations.find(s =>
          s.cards.find(c => c.component === "ShieldControl")
        );
      },
      verify({ simulator }) {
        const shields = App.systems.filter(
          s => s.simulatorId === simulator.id && s.type === "Shields"
        );
        return !shields.find(s => s.state === false);
      }
    },
    {
      name: "Lower All Shields",
      active({ stations }) {
        return stations.find(s =>
          s.cards.find(c => c.component === "ShieldControl")
        );
      },
      verify({ simulator }) {
        const shields = App.systems.filter(
          s => s.simulatorId === simulator.id && s.type === "Shields"
        );
        return !shields.find(s => s.state === true);
      }
    },
    {
      name: "Raise Shield",
      active({ requiredValues, stations }) {
        // Check cards and system
        const { id } = requiredValues.shield;
        const system = App.systems.find(s => s.id === id);
        return (
          system.state !== true &&
          stations.find(s => s.cards.find(c => c.component === "ShieldControl"))
        );
      },
      values: {
        shield: {
          input: ({ simulator }) =>
            simulator
              ? App.systems
                  .filter(
                    s => s.simulatorId === simulator.id && s.type === "Shield"
                  )
                  .map(s => ({ value: s.id, label: s.displayName || s.name }))
              : "text",
          value: ({ simulator }) =>
            randomFromList(
              App.systems
                .filter(
                  s => s.simulatorId === simulator.id && s.type === "Shield"
                )
                .map(s => s.id)
            )
        }
      },
      verify({ requiredValues }) {
        const id = requiredValues.shield;
        const system = App.systems.find(s => s.id === id);
        return system.state === false;
      }
    },
    {
      name: "Lower Shield",
      active({ requiredValues, stations }) {
        // Check cards
        const { id } = requiredValues.shield;
        const system = App.systems.find(s => s.id === id);
        return (
          system.state !== false &&
          stations.find(s => s.cards.find(c => c.component === "ShieldControl"))
        );
      },
      values: {
        shield: {
          input: ({ simulator }) =>
            simulator
              ? App.systems
                  .filter(
                    s => s.simulatorId === simulator.id && s.type === "Shield"
                  )
                  .map(s => ({ value: s.id, label: s.displayName || s.name }))
              : "text",
          value: ({ simulator }) =>
            randomFromList(
              App.systems
                .filter(
                  s => s.simulatorId === simulator.id && s.type === "Shield"
                )
                .map(s => s.id)
            )
        }
      },
      verify({ requiredValues }) {
        const id = requiredValues.shield;
        const system = App.systems.find(s => s.id === id);
        return system.state === false;
      }
    },
    {
      name: "Set Shield Frequency",
      active({ stations }) {
        // Check cards
        return stations.find(s =>
          s.cards.find(c => c.component === "ShieldControl")
        );
      },
      values: {
        shield: {
          input: ({ simulator }) =>
            simulator
              ? App.systems
                  .filter(
                    s => s.simulatorId === simulator.id && s.type === "Shield"
                  )
                  .map(s => ({ value: s.id, label: s.displayName || s.name }))
              : "text",
          value: ({ simulator }) =>
            randomFromList(
              App.systems
                .filter(
                  s => s.simulatorId === simulator.id && s.type === "Shield"
                )
                .map(s => s.id)
            )
        },
        frequency: {
          input: { type: "number", min: 100, max: 350 },
          value: () => Math.round(Math.random() * 250 * 10) / 10 + 100
        }
      },
      verify({ requiredValues }) {
        const id = requiredValues.shield;
        const system = App.systems.find(s => s.id === id);
        return system.frequency === requiredValues.frequency;
      }
    }
  ];
  get stealthFactor() {
    return this.state ? this.integrity : 0;
  }
  break(report, destroyed, which) {
    this.state = false;
    super.break(report, destroyed, which);
  }
  repair() {
    super.repair();
    this.integrity = 1;
  }
  setPower(powerLevel) {
    if (
      this.power.powerLevels.length &&
      powerLevel < this.power.powerLevels[0]
    ) {
      this.state = false;
    }
    super.setPower(powerLevel);
  }
  shieldState(state) {
    if (!this.damage.damaged) {
      this.state = state;
    }
  }
  setIntegrity(integrity) {
    this.integrity = Math.min(1, Math.max(0, integrity));
    if (this.integrity === 0) {
      this.break();
    }
  }
  setFrequency(frequency) {
    this.frequency = frequency;
  }
}
