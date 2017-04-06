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
    this.batteryChargeLevel = params.batteryChargeLevel || 1;
    this.batteryChargeRate = params.batteryChargeRate || 1 / 1000;
  }
  eject(tf = true){
    this.ejected = tf;
  }
  changeOutput(output){
    this.powerOutput = output;
  }
  changeEfficiency(efficiency){
    this.efficiency = efficiency;
  }
  changeBatteryChargeLevel(level){
    this.batteryChargeLevel = level;
  }
  changeBatteryChargeRate(rate){
    this.batteryChargeRate = rate;
  }
}