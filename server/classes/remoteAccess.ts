import uuid from "uuid";

interface RemoteAccessParams {
  id?: string;
  code?: string;
  state?: "Denied" | "Accepted" | "sent";
  station?: string;
  timestamp?: string;
}
export default class RemoteAccess {
  id: string;
  code: string;
  state: "Denied" | "Accepted" | "sent";
  station: string;
  timestamp: string;
  constructor(params: RemoteAccessParams = {}) {
    this.id = params.id || uuid.v4();
    this.code = params.code || "";
    this.state = params.state || "sent";
    this.station = params.station || "";
    this.timestamp = params.timestamp || new Date().toISOString();
  }
}
