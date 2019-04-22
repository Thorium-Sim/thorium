import App from "../app";
import { randomFromList } from "../classes/generic/damageReports/constants";
import reportReplace from "../helpers/reportReplacer";

export default [
  {
    name: "Admit Patient",
    class: "Sickbay",
    active({ simulator }) {
      if (!simulator) return false;
      // Check cards
      return (
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "Sickbay")
        ) &&
        App.systems.find(
          s => s.simulatorId === simulator.id && s.type === "Sickbay"
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "Sickbay")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () =>
          "A crew member has been experiencing some symptoms and needs a checkup."
      },
      crew: {
        input: ({ simulator }) =>
          simulator
            ? App.crew
                .filter(s => s.simulatorId === simulator.id)
                .map(s => ({ value: s.id, label: s.fullName }))
            : "text",
        value: ({ simulator }) =>
          simulator
            ? randomFromList(
                App.crew
                  .filter(s => s.simulatorId === simulator.id)
                  .map(s => s.id)
              )
            : "Ensign Jenkins"
      }
    },

    instructions({
      simulator,
      requiredValues: { preamble, crew, system },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "Sickbay")
      );
      const crewmember = App.crew.find(c => c.id === crew) || {
        fullName: crew,
        rank: ""
      };
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Admit ${crewmember.rank} ${
            crewmember.fullName
          } to the sickbay and perform a full treatment diagnostic.`,
          {
            simulator,
            system
          }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of the sickbay"
        } to admit ${crewmember.rank} ${
          crewmember.fullName
        } to the sickbay and perform a full treatment diagnostic.`,
        { simulator, system }
      );
    },
    verify({ simulator, requiredValues = {} }) {
      const sickbay = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "Sickbay"
      );
      if (!sickbay) return;
      return sickbay.bunks.find(b => b.patient === requiredValues.crew);
    }
  }
];
