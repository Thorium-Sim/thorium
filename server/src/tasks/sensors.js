import reportReplace from "../helpers/reportReplacer";
import App from "../app";
import Fuzz from "fuse.js";
export default [
  {
    name: "Perform Sensor Scan",
    class: "Sensors",
    active({ simulator }) {
      return (
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(
            c => c.component === "Sensors" || c.component === "SensorScans"
          )
        ) &&
        App.systems.find(
          s => s.simulatorId === simulator.id && s.class === "Sensors"
        )
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(
            c => c.component === "Sensors" || c.component === "SensorScans"
          )
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "A scan should be performed."
      },
      scanText: {
        input: () => "text",
        value: () => ""
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, scanText, system },
      task = {}
    }) {
      const station =
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(
            c => c.component === "Sensors" || c.component === "SensorScans"
          )
        );
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Perform the following sensors scan: "${scanText}"`,
          { simulator, system }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge sensors"
        } to perform the following sensors scan: "${scanText}"`,
        { simulator, system }
      );
    },
    verify({ simulator, requiredValues: { scanText } }) {
      const systems = App.systems.filter(
        s => s.simulatorId === simulator.id && s.class === "Sensors"
      );
      // Create a fuzzy matcher
      const matcher = new Fuzz([scanText], { threshold: 0.2 });
      return systems.find(s => {
        if (matcher.search(s.scanRequest).length > 0) return true;
        if (
          s.scans.find(
            scan => scan.scanning && matcher.search(scan.request).length > 0
          )
        )
          return true;
        return false;
      });
    }
  }
];
