import App from "../app";
import reportReplace from "../helpers/reportReplacer";
import {
  randomFromList,
  partsList
} from "../classes/generic/damageReports/constants";

export default [
  {
    name: "Send Exocomp",
    class: "Exocomps",
    active({ simulator }) {
      if (!simulator) return false;
      // Check cards
      return (
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "Exocomps")
        ) && App.exocomps.filter(e => e.simulatorId === simulator.id).length > 0
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "Exocomps")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "An exocomp must be sent to operate on a system."
      },
      destination: {
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
      parts: {
        input: () => "partsPicker",
        value: () =>
          Array(Math.round(Math.random() * 3 + 1))
            .fill(0)
            .map(() => randomFromList(partsList))
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, destination, parts, system },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "Exocomps")
      );
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Send an exocomp to the #SYSTEMNAME with the following parts: ${parts.join(
            ", "
          )}.`,
          { system: system || destination, simulator }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of exocomps"
        } to send an exocomp to the #SYSTEMNAME with the following parts: ${parts.join(
          ", "
        )}.`,
        { system: system || destination, simulator }
      );
    },
    verify({ simulator, requiredValues }) {
      const exocomps = App.exocomps.filter(s => s.simulatorId === simulator.id);
      return exocomps.find(e => {
        if (e.destination !== requiredValues.destination) return false;
        // Figuring out parts is hard, especially when a system needs to have multiple parts
        // provided. There probably needs to be a property added to the system to collect parts.
        //if (requiredValues.filter(v => ).length > 0) return false;
        return true;
      });
    }
  }
];
