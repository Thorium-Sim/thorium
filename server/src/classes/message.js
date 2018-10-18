import uuid from "uuid";
import reportReplace from "../helpers/reportReplacer";

export default class Message {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.type = "Message";
    this.class = "Message";
    this.simulatorId = params.simulatorId || null;
    this.destination = params.destination ? params.destination.trim() : null;
    this.sender = params.sender ? params.sender.trim() : null;
    this.timestamp = new Date().toString();
    this.content = params.content || null;
  }
  static tasks = [
    {
      name: "Compose Intership Message",
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
        requiredValues: { preamble, destination, message }
      }) {
        return reportReplace(
          `${preamble} Send the following message:
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
}
