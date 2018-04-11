import uuid from "uuid";
export default class Sound {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.clients = params.clients || [];
    this.asset = params.asset || "";
    this.volume = params.volume || 1;
    this.playbackRate = params.playbackRate || 1;
    this.channel = params.channel || [0, 1];
    this.looping = params.looping || false;
  }
}
