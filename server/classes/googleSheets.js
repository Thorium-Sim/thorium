import uuid from "uuid";

export default class GoogleSheets {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "GoogleSheets";
    this.simulatorId = params.simulatorId || null;
  }
}
