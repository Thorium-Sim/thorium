import uuid from "uuid";

export default class Ambiance {
  id: string;
  class: "Ambiance";
  name: string;
  asset: string;
  volume: number;
  channel: number[] | number;
  playbackRate: number;
  constructor(params: Partial<Ambiance> = {}) {
    this.id = params.id || uuid.v4();
    this.class = "Ambiance";
    this.name = params.name || "Ambiance";
    this.asset = params.asset || "/Sounds/ambiance.ogg";
    this.volume = params.volume || 1;
    this.channel = params.channel || [0, 1];
    this.playbackRate = params.playbackRate || 1;
  }
  update({name, asset, volume, channel, playbackRate}: Partial<Ambiance>) {
    if (name) this.name = name;
    if (asset || asset === "") this.asset = asset;
    if (volume || volume === 0) this.volume = volume;
    if (channel || channel === 0) this.channel = channel;
    if (playbackRate || playbackRate === 0) this.playbackRate = playbackRate;
  }
}
