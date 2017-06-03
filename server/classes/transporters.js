import uuid from 'uuid';
import { System } from './generic';

export default class Transporters extends System {
  constructor(params) {
    super(params);
    this.type = 'Transporters';
    this.class = 'Transporters';
    this.name = params.name || 'Transporters';
    this.targets = params.targets || [];
    this.requestedTarget = params.requestedTarget || null;
    this.destination = params.destination || null;
    this.charge = params.charge || 0;
    // One of 'Inactive', 'Scanning', 'Targeting', 'Charging'
    this.state = params.state || 'Inactive';
    this.stealthCompromised = false;
  }
  get stealthFactor() {
    if (this.state === 'Scanning') return 0.6;
    if (this.state === 'Charging') {
      return this.charge;
    }
    if (this.stealthCompromised) return 1;
    return 0;
  }
  addTargets(number, icon = 'Triangle', moving = false) {
    this.state = 'Targeting';
    for (let i = 0; i < number; i++) {
      this.targets.push({
        id: uuid.v4(),
        icon,
        moving,
        position: {
          x: Math.random(),
          y: Math.random(),
          z: Math.random(),
        },
      });
    }
  }
  break(report) {
    this.clearTargets();
    super.break(report);
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
    this.destination = null;
    this.charge = 0;
    this.requestedTarget = null;
    this.targets = [];
  }
  beginScan() {
    this.state = 'Scanning';
  }
  cancelScan() {
    this.state = 'Inactive';
  }
  setCharge(charge) {
    if (charge > 0 && this.targets.length > 0) {
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
    this.state = 'Targeting';
    if (this.targets.length === 0) {
      this.state = 'Inactive';
      this.requestedTarget = null;
      this.destination = null;
    }
    this.stealthCompromised = true;
    setTimeout((() => this.stealthCompromised = false), 4 * 1000);
  }
}
