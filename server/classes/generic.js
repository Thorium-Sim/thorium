import uuid from 'uuid';

const defaultPower = {
  power: 5,
  powerLevels: [5],
};

export class System {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || null;
    this.power = params.power || defaultPower;
  }
  setPower(powerLevel) {
    this.power.power = powerLevel;
  }
}
