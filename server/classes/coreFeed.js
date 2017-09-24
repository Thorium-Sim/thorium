import uuid from "uuid";

export default class CoreFeed {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "CoreFeed";
    this.simulatorId = params.simulatorId || null;
    this.component = params.component || null;
    this.ignored = params.ignored || false;
  }
  ignore() {
    this.ignored = true;
  }
}
