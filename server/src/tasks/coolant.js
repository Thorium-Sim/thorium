import App from "../app";
import reportReplace from "../helpers/reportReplacer";
import { randomFromList } from "../classes/generic/damageReports/constants";

export default [
  {
    name: "Refill Coolant",
    class: "Coolant",
    active({ simulator }) {
      // Check cards
      return (
        simulator &&
        App.systems.find(
          s => s.simulatorId === simulator.id && s.class === "Coolant"
        ) &&
        App.systems.find(
          s =>
            s.simulatorId === simulator.id &&
            (s.coolant || s.coolant === 0) &&
            s.coolant < 0.2
        ) &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "CoolantControl")
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "CoolantControl")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () =>
          "A system is running low on coolant. More should be transferred into that system."
      },
      system: {
        input: ({ simulator }) => {
          if (!simulator) return "text";
          return App.systems
            .filter(
              s =>
                s.simulatorId === simulator.id && (s.coolant || s.coolant === 0)
            )
            .map(s => ({ label: s.displayName || s.name, value: s.id }));
        },
        value: ({ simulator }) =>
          simulator
            ? randomFromList(
                App.systems
                  .filter(
                    s =>
                      s.simulatorId === simulator.id &&
                      (s.coolant || s.coolant === 0)
                  )
                  .map(s => s.id)
              )
            : "Main Reactor"
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, system: sys },
      task = {}
    }) {
      const system = App.systems.find(
        s =>
          (sys && s.id === sys) ||
          s.name.toLowerCase() === sys.toLowerCase() ||
          s.displayName.toLowerCase() === sys.toLowerCase()
      ) || { name: sys };
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "CoolantControl")
      );
      if (station && task.station === station.name) {
        return reportReplace(
          `${preamble} Fill the coolant in the #SYSTEMNAME to at least 50%`,
          { system, simulator }
        );
      }
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of the computer core"
        } to fill the coolant in the #SYSTEMNAME to at least 50%`,
        { system, simulator }
      );
    },

    verify({ simulator, requiredValues }) {
      const system = App.systems.find(s => s.id === requiredValues.system);
      return system.coolant >= 0.5;
    }
  }
];
