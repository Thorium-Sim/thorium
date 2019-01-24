import reportReplace from "../helpers/reportReplacer";

export default [
  {
    name: "Compose Intership Message",
    class: "Intership Messaging",
    active({ simulator }) {
      return simulator.stations.find(
        s =>
          s.cards.find(c => c.component === "Messages") ||
          s.widgets.indexOf("messages") > -1
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s => s =>
          s.cards.find(c => c.component === "Messages") ||
          s.widgets.indexOf("messages") > -1
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "A message should be sent inside the ship."
      },
      destination: {
        input: () => "text",
        value: () => ""
      },
      message: {
        input: () => "textarea",
        value: () => ""
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, destination, message, system }
    }) {
      return reportReplace(
        `${preamble} Send the following message:
Destination: ${destination}
Message: ${message}`,
        { simulator, system }
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
