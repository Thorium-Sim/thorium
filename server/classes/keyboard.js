import uuid from "uuid";

export default class Keyboard {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Keyboard";
    this.simulatorId = params.simulatorId || null;
  }
}
