import App from "../app";
import reportReplace from "../helpers/reportReplacer";
import { randomFromList } from "../classes/generic/damageReports/constants";

export default [
  // Simple, generic task definition.
  // Always available, must be manually verified
  {
    name: "Reactivation Code",
    class: "Generic",
    active() {
      return true;
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () =>
          "A reactivation code must be applied to the #SYSTEMNAME system."
      },
      system: {
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
      code: {
        input: () => ({ disabled: true, placeholder: "Cannot configure code" }),
        value: () =>
          Array(8)
            .fill("")
            .map(() =>
              randomFromList(["¥", "Ω", "∏", "-", "§", "∆", "£", "∑", "∂"])
            )
            .join("")
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, system: sys, code },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "DamageControl")
      );
      const system = App.systems.find(
        s => s.id === sys || s.name === sys || s.displayName === sys
      );
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Enter the following reactivation code for the #SYSTEMNAME system: ${code}.`,

          {
            simulator,
            system
          }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of damage reports"
        } to enter the following reactivation code for the #SYSTEMNAME system: ${code}.`,
        { simulator, system }
      );
    },
    verify({ simulator, requiredValues: { system: sys, code } }) {
      const system = App.systems.find(
        s => s.id === sys || s.name === sys || s.displayName === sys
      );
      return system && system.damage && system.damage.reactivationCode === code;
    }
  }
];
