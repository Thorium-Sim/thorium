import reportReplace from "../helpers/reportReplacer";
import App from "../app";
import { randomFromList } from "../classes/generic/damageReports/constants";

export default [
  {
    name: "Raise All Shields",
    class: "Shields",
    active({ simulator }) {
      if (!simulator) return false;
      return simulator.stations.find(s =>
        s.cards.find(c => c.component === "ShieldControl")
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ShieldControl")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "The shields need to be raised."
      }
    },
    instructions({ simulator, requiredValues: { preamble }, task = {} }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "ShieldControl")
      );
      if (station && task.station === station.name)
        return reportReplace(`${preamble} Raise all shields`, { simulator });
      return reportReplace(
        `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of shields"
        } to raise all shields`,
        { simulator }
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
    class: "Shields",
    active({ simulator }) {
      if (!simulator) return false;
      return simulator.stations.find(s =>
        s.cards.find(c => c.component === "ShieldControl")
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ShieldControl")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "The shields need to be lowered."
      }
    },
    instructions({ simulator, requiredValues: { preamble }, task = {} }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "ShieldControl")
      );
      if (station && task.station === station.name)
        return reportReplace(`${preamble} Lower all shields`, { simulator });
      return reportReplace(
        `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of shields"
        } to lower all shields`,
        { simulator }
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
    class: "Shields",
    active({ requiredValues = {}, simulator }) {
      if (!simulator) return false;
      // Check cards and system
      const id = requiredValues.shield;
      const system = App.systems.find(s => s.id === id);
      const hasCard = simulator.stations.find(s =>
        s.cards.find(c => c.component === "ShieldControl")
      );
      if (!system) return hasCard;
      return system.state !== true && hasCard;
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ShieldControl")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "The #SYSTEMNAME need to be raised."
      },
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
          simulator
            ? randomFromList(
                App.systems
                  .filter(
                    s => s.simulatorId === simulator.id && s.type === "Shield"
                  )
                  .map(s => s.id)
              )
            : ""
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, shield },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "ShieldControl")
      );
      const system = App.systems.find(
        s =>
          s.id === shield ||
          (s.name === shield && s.simulatorId === simulator.id) ||
          (s.displayName === shield && s.simulatorId === simulator.id)
      );
      if (station && task.station === station.name)
        return reportReplace(`${preamble} Raise the #SYSTEMNAME.`, {
          system,
          simulator
        });
      return reportReplace(
        `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of shields"
        } to raise the #SYSTEMNAME.`,
        { system, simulator }
      );
    },
    verify({ requiredValues }) {
      const id = requiredValues.shield;
      const system = App.systems.find(s => s.id === id);
      return system.state === false;
    }
  },
  {
    name: "Lower Shield",
    class: "Shields",
    active({ requiredValues = {}, simulator }) {
      if (!simulator) return false;

      // Check cards
      const id = requiredValues.shield;
      const system = App.systems.find(s => s.id === id);
      const hasCard = simulator.stations.find(s =>
        s.cards.find(c => c.component === "ShieldControl")
      );
      if (!system) {
        return hasCard;
      }
      return system.state !== false && hasCard;
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ShieldControl")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "The #SYSTEMNAME need to be lowered."
      },
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
          simulator
            ? randomFromList(
                App.systems
                  .filter(
                    s => s.simulatorId === simulator.id && s.type === "Shield"
                  )
                  .map(s => s.id)
              )
            : ""
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, shield },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "ShieldControl")
      );
      const system = App.systems.find(
        s =>
          s.id === shield ||
          (s.name === shield && s.simulatorId === simulator.id) ||
          (s.displayName === shield && s.simulatorId === simulator.id)
      );
      if (station && task.station === station.name)
        return reportReplace(`${preamble} Lower the #SYSTEMNAME.`, {
          system,
          simulator
        });
      return reportReplace(
        `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of shields"
        } to lower the #SYSTEMNAME.`,
        { system, simulator }
      );
    },
    verify({ requiredValues }) {
      const id = requiredValues.shield;
      const system = App.systems.find(s => s.id === id);
      return system.state === false;
    }
  },
  {
    name: "Set Shield Frequency",
    class: "Shields",
    active({ simulator }) {
      if (!simulator) return false;
      // Check cards
      return simulator.stations.find(s =>
        s.cards.find(c => c.component === "ShieldControl")
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ShieldControl")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "The frequency of the #SYSTEMNAME needs to be changed."
      },
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
          simulator
            ? randomFromList(
                App.systems
                  .filter(
                    s => s.simulatorId === simulator.id && s.type === "Shield"
                  )
                  .map(s => s.id)
              )
            : ""
      },
      frequency: {
        input: () => ({ type: "number", min: 100, max: 350 }),
        value: () => Math.round(Math.random() * 250 * 10) / 10 + 100
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, shield, frequency },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "ShieldControl")
      );
      const system = App.systems.find(
        s =>
          s.id === shield ||
          (s.name === shield && s.simulatorId === simulator.id) ||
          (s.displayName === shield && s.simulatorId === simulator.id)
      );
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Set the frequency of the #SYSTEMNAME to ${frequency} MHz.`,
          { system, simulator }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of shields"
        } to set the frequency of the #SYSTEMNAME to ${frequency} MHz.`,
        { system, simulator }
      );
      // TODO: Make it so it knows if the task is assigned to the station
      // performing the task, or if it needs to be delegated to another station
    },
    verify({ requiredValues }) {
      const id = requiredValues.shield;
      const system = App.systems.find(s => s.id === id);
      return system.frequency === requiredValues.frequency;
    }
  }
];
