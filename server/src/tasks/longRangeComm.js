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
  },
  {
    name: "Decode Long Range Message",
    class: "Long Range Comm",
    active({ simulator }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "LongRangeComm"
      );
      const notDecoded = system.messages.filter(
        m => m.f !== m.rf || m.a !== m.ra
      );
      return (
        simulator.stations.find(
          s =>
            s.widgets.indexOf("composer") > -1 ||
            s.cards.find(c => c.component === "CommDecoding")
        ) &&
        system &&
        notDecoded.length > 0
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(
          s =>
            s.widgets.indexOf("composer") > -1 ||
            s.cards.find(c => c.component === "CommDecoding")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () =>
          "A long range message has been recieved and needs to be decoded."
      },
      messageOrDestination: {
        input: ({ simulator }) => {
          if (!simulator) return "text";
          const system = App.systems.find(
            s => s.simulatorId === simulator.id && s.type === "LongRangeComm"
          );
          if (!system) return "text";
          const notDecoded = system.messages.filter(
            m => m.f !== m.rf || m.a !== m.ra
          );
          if (notDecoded.length === 0) return "text";
          return notDecoded.map(m => ({ value: m.id, label: m.sender }));
        },
        value: ({ simulator }) => {
          if (!simulator) return "Starbase 74";
          const system = App.systems.find(
            s => s.simulatorId === simulator.id && s.type === "LongRangeComm"
          );
          if (!system) return "";
          const notDecoded = system.messages
            .filter(m => m.f !== m.rf || m.a !== m.ra)
            .map(m => m.id);
          return randomFromList(notDecoded);
        }
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, messageOrDestination },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "CommDecoding")
      );
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "LongRangeComm"
      );
      const m = system.messages.find(m => m.id === messageOrDestination) || {
        sender: messageOrDestination
      };
      if (station && station.name === task.station)
        return reportReplace(
          `${preamble} Decode the message sent by "${m.sender}".`,
          { simulator }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of decoding long range messages"
        } to decode the message sent by "${m.sender}".`,
        { simulator }
      );
    },
    verify({ simulator, requiredValues }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "LongRangeComm"
      );
      if (!system) return;
      const m = system.messages.find(
        m => m.id === requiredValues.messageOrDestination
      );
      if (!m) return;
      return m.f === m.rf && m.a === m.ra;
    }
  }
];
