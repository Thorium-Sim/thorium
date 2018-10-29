import uuid from "uuid";

export default class CoreFeed {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.class = "CoreFeed";
    this.simulatorId = params.simulatorId || null;
    this.component = params.component || null;
    this.ignored = params.ignored || false;
    this.station = params.station || "";
    this.timestamp = params.timestamp ? new Date(params.timestamp) : new Date();
    this.title = params.title || "New Event";
    this.body = params.body || "";
    this.color = params.color || "info";
  }

  ignore() {
    this.ignored = true;
  }
}
