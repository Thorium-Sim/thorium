import uuid from "uuid";

export default class Objective {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Objective";
    this.simulatorId = params.simulatorId || null;
    this.station = params.station || null;
    this.title = params.title || "Objective";
    this.description = params.description || "";
    this.completed = params.completed || false;
  }
  complete() {
    this.completed = true;
  }
}
