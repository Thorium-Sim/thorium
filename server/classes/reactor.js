import { System } from './generic';

export default class Reactor extends System {
  constructor(params) {
    super(params);
    this.class = 'Reactor';
    this.type = 'Reactor';
    this.name = params.name || 'Reactor';
    this.ejected = params.ejected || false;
    this.type = params.type || 'reactor';
    this.powerOutput = params.powerOutput || 120;
    this.efficiency = params.efficiency || 1;
    this.powerMode = params.powerMode || 'internal';
    this.batteryChargeLevel = params.batteryChargeLevel || 1;
    this.batteryChargeRate = params.batteryChargeRate || 1/1000;
  }
}