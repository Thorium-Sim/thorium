// A set is a collection of clients
import uuid from "uuid";

export class MidiControl {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.channel = params.channel || 0;
    this.messageType = params.messageType || "controlchange";
    this.key = params.key || null;
    this.controllerNumber = params.controllerNumber || null;
    this.channelModeMessage = params.channelModeMessage || null;
    this.component = params.component || null;
    this.variables = params.variables || {};
  }
}
export class MidiSet {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.class = "MidiSet";
    this.name = params.name || "Default Midi Set";
    this.deviceName = params.deviceName || "X-TOUCH MINI";
    this.controls = [];
    params.controls &&
      params.controls.forEach(c => this.controls.push(new MidiControl(c)));
  }

  rename(name) {
    this.name = name;
  }
}
