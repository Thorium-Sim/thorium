import uuid from "uuid";

export default class Message {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.type = "Message";
    this.class = "Message";
    this.simulatorId = params.simulatorId || null;
    this.destination = params.destination || null;
    this.sender = params.sender || null;
    this.timestamp = new Date().toString();
    this.content = params.content || null;
  }
}
