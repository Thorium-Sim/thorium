import uuid from 'uuid';

const defaultPower = {
  power: 5,
  powerLevels: [5],
};

const defaultDamage = {
  damaged: false,
  report: null,
  requested: false
};

export class System {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || null;
    this.power = params.power || defaultPower;
    this.damage = params.damage || defaultDamage
  }
  setPower(powerLevel) {
    this.power.power = powerLevel;
  }
  break(report) {
    // TODO: Generate the damage report if
    // The report is null or blank.
    this.damage.damaged = true;
    this.damage.report = report;
    this.damage.requested = false;
  }
  damageReport(report) {
    this.damage.report = report;
    this.damage.requested = false;
  }
  repair() {
    this.damage.damaged = false;
    this.damage.report = null;
    this.damage.requested = false;
  }
  requestReport() {
    this.damage.requested = true;
  }
}
