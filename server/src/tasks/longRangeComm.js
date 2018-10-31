import reportReplace from "../helpers/reportReplacer";
import {
  randomFromList,
  longRangeDestinations
} from "../classes/generic/damageReports/constants";
import App from "../app";

export default [
  {
    name: "Compose Long Range Message",
    class: "Long Range Comm",
    active({ simulator }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "LongRangeComm"
      );
      return (
        simulator.stations.find(
          s =>
            s.widgets.indexOf("composer") > -1 ||
            s.cards.find(c => c.component === "LongRangeComm")
        ) && system
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(
          s =>
            s.widgets.indexOf("composer") > -1 ||
            s.cards.find(c => c.component === "LongRangeComm")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "A long range message needs to be composed."
      },
      destination: {
        input: () => "text",
        value: () => randomFromList(longRangeDestinations)
      },
      message: {
        input: () => "textarea",
        value: () =>
          "We are sending a message to check in. Do you have any information relevant to our mission?"
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, destination, message },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "LongRangeComm")
      );
      if (station && station.name === task.station)
        return reportReplace(
          `${preamble} Send the following message:
Destination: ${destination}
Message: ${message}`,
          { simulator }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of long range messages"
        } to send the following message:
Destination: ${destination}
Message: ${message}`,
        { simulator }
      );
    },
    verify({ simulator, requiredValues }) {
      // Since this requires typing in the
      // exact value, it might be better
      // to manually verify.
      return false;
    }
  }
];
