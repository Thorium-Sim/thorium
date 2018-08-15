import uuid from "uuid";

export default class OfficerLog {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "OfficerLog";
    this.flightId = params.flightId || null;
    this.clientId = params.clientId || null;
    this.timestamp = params.timestamp || new Date().toString();
    this.log = params.log || "";
  }
}
