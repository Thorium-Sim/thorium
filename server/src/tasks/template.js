import App from "../app";
import { randomFromList } from "../classes/generic/damageReports/constants";
import reportReplace from "../helpers/reportReplacer";

export default [
  {
    // The unique name for the task definition
    name: "Template",
    // The category that it will be included in.
    class: "Template",
    // A function determining if the particular action is even applicable.
    active({ simulator }) {
      if (!simulator) return false;
      // Check cards
      return (
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "Sickbay")
        ) &&
        App.systems.find(
          s => s.simulatorId === simulator.id && s.type === "template"
        )
      );
    },
    // What stations can perform this action
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "Template")
        )
      );
    },
    // Possible input values. Always include preamble as an explanation of why the action must happen
    values: {
      preamble: {
        input: () => "textarea",
        value: () =>
          "This is a template task."
      },
    },
    // Provide instructions for the crew, including the values set above.
    instructions({
      simulator,
      requiredValues: { preamble, system },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "Template")
      );

      // If we have assigned the task to the station that will perform
      // the action, tell them to just do it.
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Perform the template action.`,
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
            : "person in charge of the sickbay"
        } to perform the template action`,
        { simulator, system }
      );
    },
    verify({ simulator, requiredValues = {} }) {
     // Make sure the task has been properly acomplished.
     return true;
    }
  }
];
