import uuid from "uuid";

export type DMXChannelProperty =
  | "red"
  | "green"
  | "blue"
  | "amber"
  | "white"
  | "uv"
  | "intensity"
  | "strobe"
  | "generic"
  | "nothing";

class DMXDevice {
  class: "DMXDevice" = "DMXDevice";
  id: string;
  name: string;
  channels: DMXChannelProperty[];
  constructor(params: Partial<DMXDevice> = {}) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "DMX Device";
    this.channels = params.channels || [];
  }
  setName(name: string) {
    this.name = name;
  }
  setChannels(channels: DMXChannelProperty[]) {
    this.channels = channels;
  }
}

export default DMXDevice;
