import reportReplace from "../helpers/reportReplacer";
import App from "../app";

export default [
  {
    name: "Activate Jump Drive",
    class: "Jump Drive",
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
    class: "Jump Drive",
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
