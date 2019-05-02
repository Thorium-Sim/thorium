import App from "../app";
import { randomFromList } from "../classes/generic/damageReports/constants";
import reportReplace from "../helpers/reportReplacer";

export default [
  {
    // The unique name for the task definition
    name: "Change Reactor Efficiency",
    // The category that it will be included in.
    class: "Reactor",
    // A function determining if the particular action is even applicable.
    active({ simulator }) {
      if (!simulator) return false;
      // Check cards
      return (
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ReactorControl")
        ) &&
        App.systems.find(
          s =>
            s.simulatorId === simulator.id &&
            s.type === "Reactor" &&
            s.model === "reactor"
        )
      );
    },
    // What stations can perform this action
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ReactorControl")
        )
      );
    },
    // Possible input values. Always include preamble as an explanation of why the action must happen
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "The reactor efficiency is not at the correct level."
      },
      efficiency: {
        input: ({ simulator }) => {
          if (!simulator) return "text";
          const reactor = App.systems.find(
            s =>
              s.simulatorId === simulator.id &&
              s.type === "Reactor" &&
              s.model === "reactor"
          );
          return reactor.efficiencies.map(e => ({
            label: e.label,
            value: e.efficiency
          }));
        },
        value: ({ simulator }) => {
          if (!simulator) return 1;
          const reactor = App.systems.find(
            s =>
              s.simulatorId === simulator.id &&
              s.type === "Reactor" &&
              s.model === "reactor"
          );
          return randomFromList(reactor.efficiencies.map(e => e.efficiency));
        }
      }
    },
    // Provide instructions for the crew, including the values set above.
    instructions({
      simulator,
      requiredValues: { preamble, efficiency, system },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "ReactorControl")
      );

      const reactor = App.systems.find(
        s =>
          s.simulatorId === simulator.id &&
          s.type === "Reactor" &&
          s.model === "reactor"
      );
      const efficiencyObject = reactor.efficiencies.find(
        e => e.efficiency === parseFloat(efficiency)
      );
      const efficiencyName = efficiencyObject
        ? efficiencyObject.label
        : "Cruise";

      // If we have assigned the task to the station that will perform
      // the action, tell them to just do it.
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Set the reactor efficiency to ${efficiencyName}.`,
          {
            simulator,
            system
          }
        );

      // Otherwise, tell them to tell the person who needs to do it to do it.
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of the reactor"
        } to set the reactor efficiency to ${efficiencyName}.`,
        { simulator, system }
      );
    },
    verify({ simulator, requiredValues = {} }) {
      // Make sure the task has been properly acomplished.
      const reactor = App.systems.find(
        s =>
          s.simulatorId === simulator.id &&
          s.type === "Reactor" &&
          s.model === "reactor"
      );
      return parseFloat(requiredValues.efficiency) === reactor.efficiency;
    }
  }
];
