// A set is a collection of clients
import uuid from "uuid";

export class MidiControl {
  id: string;
  channel: number | null;
  messageType: number | null;
  key: number | null;
  controllerNumber: number | null;
  channelModeMessage: number | null;
  actionMode: string;
  config: Record<string, any>;
  constructor(params: Partial<MidiControl> = {}) {
    this.id = params.id || uuid.v4();
    this.channel = params.channel ?? null;
    this.messageType = params.messageType ?? null;
    this.key = params.key ?? null;
    this.controllerNumber = params.controllerNumber ?? null;
    this.channelModeMessage = params.channelModeMessage ?? null;
    this.actionMode = params.actionMode || "macro";
    this.config = params.config || {};
  }
  update({actionMode, config}) {
    this.actionMode = actionMode;
    this.config = config;
  }
}
export class MidiSet {
  id: string;
  class: string;
  name: string;
  deviceName: string;
  controls: MidiControl[];
  constructor(params: Partial<MidiSet> = {}) {
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
  setControl({id, ...control}: MidiControl) {
    const ctrl = this.controls.find(
      c =>
        c.channel === control.channel &&
        c.messageType === control.messageType &&
        c.key === control.key &&
        c.controllerNumber === control.controllerNumber &&
        c.channelModeMessage === control.channelModeMessage,
    );
    if (!ctrl) {
      this.controls.push(new MidiControl(control));
    } else {
      ctrl.update(control);
    }
  }
}
