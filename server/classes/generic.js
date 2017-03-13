import uuid from 'uuid';

const defaultPower = {
  power: 5,
  powerLevels: [5],
};

const defaultDamage = {
  damaged: true,
  report: null
};

export class System {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || null;
    this.power = params.power || defaultPower;
    this.damage = params.damage || defaultDamage
  }
  setPower(powerLevel) {
    this.power.power = powerLevel;
  }
  damage(report) {
    this.damage.damaged = true;
    this.damage.report = report;
  }
  repair() {
    this.damage.damaged = false;
    this.damage.report = null;
  }
}
