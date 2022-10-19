import uuid from "uuid";

export default class OfficerLog {
  id: string;
  class = "OfficerLog";
  simulatorId: string | null;
  flightId: string | null;
  clientId: string | null;
  timestamp: string;
  log: string;
  constructor(params: Partial<OfficerLog>) {
    this.id = params.id || uuid.v4();
    this.class = "OfficerLog";
    this.simulatorId = params.simulatorId || null;
    this.flightId = params.flightId || null;
    this.clientId = params.clientId || null;
    this.timestamp = params.timestamp || new Date().toString();
    this.log = params.log || "";
  }
}
