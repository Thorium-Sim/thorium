import uuid from 'uuid';

export default class Transporters {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.type = 'Transporter';
    this.class = 'Transporters';
    this.targets = params.targets || [];
    this.requestedTarget = params.requestedTarget || null;
    this.destination = params.destination || null;
    this.charge = params.charge || 0;
    // One of 'Inactive', 'Scanning', 'Targeting', 'Charging'
    this.state = params.state || 'Inactive';
  }
  addTargets(number, icon = 'Triangle', moving = false) {
    this.state = 'Targeting';
    for (let i = 0; i < number; i++) {
      this.targets.push({
        id: uuid.v4(),
        icon,
        moving,
        coordinates: {
          x: Math.random(),
          y: Math.random(),
          z: Math.random(),
        },
      });
    }
  }
  removeTargets(number) {
    // Remove targets at random
    // Number represents the remaining targets
    for (let i = 0; i < this.targets.length - number; i ++) {
      const targetIndex = Math.round(Math.random() * this.targets.length - number);
      this.targets.splice(targetIndex, 1);
    }
  }
  setRequestedTarget(target) {
    this.requestedTarget = target;
  }
  setDestination(destination) {
    this.destination = destination;
  }
  clearTargets() {
    this.state = 'Inactive';
    this.targets = [];
  }
  beginScan() {
    this.state = 'Scanning';
  }
  cancelScan() {
    this.state = 'Inactive';
  }
  setCharge(charge) {
    if (charge > 0) {
      this.state = 'Charging';
    }
    this.charge = charge;
  }
  completeTransport(targetId) {
    // Remove the target
    const targetIndex = this.targets.findIndex((target) => {
      if (target.id === targetId) return true;
      return false;
    });
    this.targets.splice(targetIndex, 1);
  }
}
