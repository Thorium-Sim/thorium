import uuid from "uuid";

export default class Message {
  id: string;
  type: string;
  class: string;
  simulatorId: string | null;
  destination: string | null;
  sender: string | null;
  timestamp: string;
  content: string | null;
  constructor(params: Partial<Message> = {}) {
    this.id = params.id || uuid.v4();
    this.type = "Message";
    this.class = "Message";
    this.simulatorId = params.simulatorId || null;
    this.destination = params.destination ? params.destination.trim() : null;
    this.sender = params.sender ? params.sender.trim() : null;
    this.timestamp = new Date().toString();
    this.content = params.content || null;
  }
}
