import uuid from "uuid";
import App from "../../app";
import {DMXChannelProperty} from "./DMXDevice";
export type ChannelConfig = Partial<
  {
    [key in Exclude<DMXChannelProperty, "red" | "green" | "blue"> | "color"]:
      | number
      | string;
  }
>;
export default class DMXFixture {
  class: "DMXFixture" = "DMXFixture";
  id: string;
  name: string;
  DMXDeviceId: string;
  simulatorId: string | null;
  clientId: string | null;
  channel: number;
  mode: "active" | "passive";
  tags: ("main" | "accent" | "work" | "no effects" | string)[];
  passiveChannels: ChannelConfig;
  constructor(params: Partial<DMXFixture> = {}) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "DMX Fixture";
    this.DMXDeviceId = params.DMXDeviceId;
    this.simulatorId = params.simulatorId || null;
    this.clientId = params.clientId || null;
    this.channel = params.channel || 0;
    this.mode = params.mode || "active";
    this.tags = params.tags || ["main"];
    this.passiveChannels = params.passiveChannels || {};
  }
  get DMXDevice() {
    return App.dmxDevices.find(c => c.id === this.DMXDeviceId);
  }
  setName(name: string) {
    this.name = name;
  }
  setDMXDevice(id: string) {
    this.DMXDeviceId = id;
  }
  setChannel(chan: number) {
    this.channel = chan;
  }
  setMode(mode: "active" | "passive") {
    this.mode = mode;
  }
  setTags(tags: string[]) {
    this.tags = tags.map(t => t.trim());
  }
  setPassiveChannels(channels: ChannelConfig) {
    this.passiveChannels = channels;
  }
}
