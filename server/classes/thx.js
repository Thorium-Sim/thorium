import { System } from "./generic";

class ThxClient {
  constructor(params) {
    this.id = params.id;
    this.charge = params.charge || 0;
    this.lock = params.lock || false;
  }
  updateCharge(charge) {
    this.charge = charge;
  }
  lockClient() {
    this.lock = true;
  }
  unlockClient() {
    this.lock = false;
  }
}

export default class Thx extends System {
  constructor(params) {
    super(params);
    this.class = "Thx";
    this.type = "Thx";
    this.name = params.name || "THX-1138";
    this.displayName = params.displayName || this.name;
    this.activated = params.activated || false;
    this.clients = [];
    (params.clients || []).forEach(c => this.clients.push(new ThxClient(c)));
  }
  activate() {
    this.activated = true;
  }
  deactivate() {
    this.activated = false;
  }
  get stealthFactor() {
    if (this.activated) return 0.9;
    return 0.1;
  }
  break(report, destroyed) {
    this.activated = false;
    super.break(report, destroyed);
  }
  setPower(powerLevel) {
    if (
      this.power.powerLevels.length &&
      powerLevel < this.power.powerLevels[0]
    ) {
      this.activated = false;
    }
    super.setPower(powerLevel);
  }
  reset() {
    this.clients.forEach(c => {
      c.updateCharge(0);
      c.unlockClient();
    });
  }
  chargeClient(clientId, charge) {
    let client = this.clients.find(c => c.id === clientId);
    if (!client) {
      this.clients.push(new ThxClient({ id: clientId }));
      client = this.clients.find(c => c.id === clientId);
    }
    client && client.updateCharge(charge);
  }
  lockClient(clientId) {
    let client = this.clients.find(c => c.id === clientId);
    if (!client) {
      this.clients.push(new ThxClient({ id: clientId }));
      client = this.clients.find(c => c.id === clientId);
    }
    client && client.lockClient();
  }
}
