import {System} from "./generic";

export default class InternalComm extends System {
  constructor(params = {}) {
    super({
      displayName: "Internal Comm",
      name: "Internal Communications",
      ...params,
    });
    this.type = "InternalComm";
    this.class = "InternalComm";
    this.wing = params.wing || "right";

    this.state = params.state || "idle"; //One of 'idle', 'connected'
    this.outgoing = params.outgoing || null;
    this.incoming = params.incoming || null;
  }
  break(report, destroyed, which) {
    this.state = "idle";
    super.break(report, destroyed, which);
  }
  connectOutgoing() {
    this.state = "connected";
    this.incoming = this.outgoing;
  }
  connectIncoming() {
    this.state = "connected";
    this.outgoing = this.incoming;
  }
  callIncoming(incoming) {
    this.incoming = incoming;
  }
  callOutgoing(outgoing) {
    this.outgoing = outgoing;
  }
  cancelIncomingCall() {
    this.state = "idle";
    if (this.outgoing === this.incoming) this.outgoing = null;
    this.incoming = null;
  }
  cancelOutgoingCall() {
    this.state = "idle";
    if (this.incoming === this.outgoing) this.incoming = null;
    this.outgoing = null;
  }
  setPower(powerLevel) {
    if (
      this.power.powerLevels.length &&
      powerLevel < this.power.powerLevels[0]
    ) {
      this.state = "idle";
    }
    super.setPower(powerLevel);
  }
}
