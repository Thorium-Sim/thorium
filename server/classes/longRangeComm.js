import uuid from "uuid";
import { System } from "./generic";
import App from "../app";
// TODO: Make it so the stardate is stored separate from the timestamp

const stardate = () => {
  var calculatedDate = new Date().getTime() / 1000 / 60 / 60 / 30 / 2;
  var subtraction = Math.floor(calculatedDate);
  var finalDate = (calculatedDate - subtraction) * 100000;
  return Math.floor(finalDate) / 10;
};

class LRMessage {
  constructor(params = {}, simulatorId) {
    this.id = params.id || uuid.v4();
    this.message = params.message || "";
    this.decodedMessage = params.decodedMessage || "";
    this.datestamp = params.datestamp || stardate();
    this.crew = params.crew || false;
    this.sender = params.sender || "";
    this.encrypted = params.encrypted || false;
    // See if there is a CommReview card on the ship
    const simulator = App.simulators.find(s => s.id === simulatorId);
    let station = false;
    if (simulator) {
      station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "CommReview")
      );
    }
    this.approved = params.approved || station ? false : true;
    this.a = params.a || 10;
    this.f = params.f || 10;
    this.ra = params.ra || Math.round(Math.random() * 10 - 1) * 5 + 5;
    this.rf = params.rf || Math.round(Math.random() * 10 - 1) * 5 + 5;
    this.deleted = false;
    this.sent = params.sent || false;
    if (this.a === 0) this.a = 10;
    if (this.f === 0) this.f = 5;
    if (this.ra === 0) this.ra = 10;
    if (this.rf === 0) this.rf = 5;
  }
  sendMessage() {
    this.sent = true;
  }
  encryptMessage() {
    this.encrypted = true;
  }
  approveMessage() {
    this.approved = true;
  }
  deleteMessage() {
    this.deleted = true;
  }
  updateDecodedMessage(decodedMessage, a, f) {
    if (decodedMessage) this.decodedMessage = decodedMessage;
    if (a) this.a = a;
    if (f) this.f = f;
  }
}

export default class LongRangeComm extends System {
  constructor(params = {}) {
    super(params);
    this.type = "LongRangeComm";
    this.class = "LongRangeComm";
    this.name = params.name || "Long Range Communications";
    this.displayName = "Long Range Comm";
    this.messages = [];
    this.messageSent = false;
    const messages = params.messages || [];
    messages.forEach(m =>
      this.messages.push(new LRMessage(m, this.simulatorId))
    );
    this.interception = params.interception || false;
    this.locked = params.locked || false;
    this.decoded = params.decoded || false;
  }
  get stealthFactor() {
    if (this.messageSent) return 0.4;
    return 0.1;
  }
  trainingMode() {
    this.createMessage(
      `This is a test long range message for you to decode. Congratulations on decoding it!`,
      true,
      false,
      `Training`
    );
    this.createMessage(
      `This is a training message for you to send. Make sure messages are sent in a timely manner.`,
      false,
      true,
      `Training`
    );
  }
  update({ interception, locked, decoded }) {
    if (interception || interception === false) {
      this.interception = interception;
      this.locked = false;
      this.decoded = false;
    }
    if (locked || locked === false) this.locked = locked;
    if (decoded || decoded === false) this.decoded = decoded;
  }
  createMessage(message, crew, decoded, sender) {
    const params = { message, crew, sender, sent: false };
    if (decoded) {
      params.decodedMessage = message;
      params.a = Math.round(Math.random() * 10 - 1) * 5 + 5;
      params.f = Math.round(Math.random() * 10 - 1) * 5 + 5;
      if (params.a === 0) params.a = 10;
      if (params.f === 0) params.f = 5;
      params.ra = params.a;
      params.rf = params.f;
    }
    this.messages.push(new LRMessage(params, this.simulatorId));
  }
  sendMessage(message) {
    this.messages.find(m => m.id === message).sendMessage();
    this.messageSent = true;
    setTimeout(() => (this.messageSent = false), 2000);
  }
  deleteMessage(message) {
    this.messages.find(m => m.id === message).deleteMessage();
  }
  encryptMessage(message) {
    this.messages.find(m => m.id === message).encryptMessage();
  }
  approveMessage(message) {
    this.messages.find(m => m.id === message).approveMessage();
  }
  updateDecodedMessage(id, messageId, decodedMessage, a, f) {
    const m = this.messages.find(mm => mm.id === messageId);
    m.updateDecodedMessage(decodedMessage, a, f);
  }
}
