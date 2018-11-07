import reportReplace from "../helpers/reportReplacer";
import App from "../app";
import { randomFromList } from "../classes/generic/damageReports/constants";

export default [
  {
    name: "Activate Engines",
    class: "Engines",
    active({ simulator }) {
      if (!simulator) return false;
      // Check cards
      return (
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "EngineControl")
        ) &&
        App.systems.find(
          s => s.simulatorId === simulator.id && s.type === "Engine"
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "EngineControl")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "The engines need to be activated."
      },
      speed: {
        input: ({ simulator }) =>
          simulator
            ? App.systems
                .filter(
                  s => s.simulatorId === simulator.id && s.class === "Engine"
                )
                .reduce((prev, next) => prev.concat(next.speeds), [])
                .map(s => ({ value: s.text, label: s.text }))
            : "text",
        value: ({ simulator }) =>
          simulator
            ? randomFromList(
                App.systems
                  .filter(
                    s => s.simulatorId === simulator.id && s.class === "Engine"
                  )
                  .reduce((prev, next) => prev.concat(next.speeds), [])
                  .map(s => s.text)
              )
            : "Warp 1"
      }
    },

    instructions({
      simulator,
      requiredValues: { preamble, speed },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "EngineControl")
      );
      if (station && task.station === station.name)
        return reportReplace(`${preamble} Activate the engines to ${speed}.`, {
          simulator
        });
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of the engines"
        } to activate the engines to ${speed}.`,
        { simulator }
      );
    },
    verify({ simulator, requiredValues }) {
      return App.systems.find(
        s =>
          s.simulatorId === simulator.id &&
          s.type === "Engine" &&
          s.on === true &&
          s.speeds.findIndex(speed => speed.text === requiredValues.speed) ===
            s.speed - 1
      );
    }
  },
  {
    name: "Deactivate Engines",
    class: "Engines",
    active({ simulator }) {
      if (!simulator) return false;
      // Check cards
      return (
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "EngineControl")
        ) &&
        App.systems.find(
          s => s.simulatorId === simulator.id && s.type === "Engine"
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "EngineControl")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "The engines need to be deactivated."
      }
    },
    instructions({ simulator, requiredValues: { preamble }, task = {} }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "EngineControl")
      );
      if (station && task.station === station.name)
        return reportReplace(`${preamble} Deactivate the engines.`, {
          simulator
        });
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of the engines"
        } to deactivate the engines.`,
        { simulator }
      );
    },
    verify({ simulator }) {
      return !App.systems.find(
        s =>
          s.simulatorId === simulator.id && s.type === "Engine" && s.on === true
      );
    }
  },
  {
    name: "Cool Engine",
    class: "Engines",
    active({ simulator }) {
      const systems = App.systems.filter(
        s => s.simulatorId === simulator.id && s.type === "Engine"
      );
      return (
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "EngineControl")
        ) &&
        systems.length > 0 &&
        systems.filter(s => s.heat > 0.75).length > 0
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "EngineControl")
        )
      );
    },
    values: {
      engine: {
        input: ({ simulator }) =>
          simulator
            ? App.systems
                .filter(
                  s => s.simulatorId === simulator.id && s.type === "Engine"
                )
                .map(s => ({ value: s.id, label: s.displayName || s.name }))
            : "text",
        value: ({ simulator }) =>
          simulator
            ? randomFromList(
                App.systems
                  .filter(
                    s =>
                      s.simulatorId === simulator.id &&
                      s.type === "Engine" &&
                      s.heat > 0.75
                  )
                  .map(s => s.id)
              )
            : ""
      },
      preamble: {
        input: () => "textarea",
        value: () => "An engine is overheating."
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, engine: id },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "EngineControl")
      );
      const engine = App.systems.find(s => s.id === id);
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Cool the ${
            engine ? engine.displayName || engine.name : "engines"
          }.`,
          { simulator, system: engine }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of the engines"
        } to cool the ${
          engine ? engine.displayName || engine.name : "engines"
        }.`,
        { simulator, system: engine }
      );
    },
    verify({ simulator, requiredValues }) {
      const engine = App.systems.find(s => s.id === requiredValues.engine);
      return engine.heat <= 0.1;
    }
  }
];
