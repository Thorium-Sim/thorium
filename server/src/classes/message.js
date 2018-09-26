import uuid from "uuid";

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
      active({ simulator, stations }) {
        return (
          stations.find(s => s.cards.find(c => c.component === "Messages")) ||
          stations.find(s => s.widgets.indexOf("messages") > -1)
        );
      },
      values: {
        destination: {
          input: () => "text",
          value: () => ""
        },
        message: {
          input: () => "text",
          value: () => ""
        }
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
