import {System} from "./generic";

export default class Railgun extends System {
  maxAmmo: number;
  ammo: number;
  availableAmmo: number;
  heat: number;
  heatRate: number;
  coolant: number;
  cooling: boolean;
  constructor(params) {
    super({name: "Railgun", ...params});
    this.class = "Railgun";
    this.type = "Railgun";
    this.wing = params.wing || "left";

    this.maxAmmo = params.maxAmmo || 25;
    this.ammo = params.ammo || 0;
    this.availableAmmo = params.availableAmmo || 250;
    this.cooling = false;
    this.heat = params.heat || 0;
    this.heatRate = params.heatRate || 1;
    this.coolant = params.coolant || 1;
  }
  setHeat(heat) {
    this.heat = Math.min(1, Math.max(0, heat));
  }
  setCoolant(coolant) {
    this.coolant = Math.min(1, Math.max(0, coolant));
  }
  setRate(rate) {
    this.heatRate = rate;
  }
  applyCoolant() {
    this.coolant = this.coolant - 0.037;
    this.heat = this.heat - 0.89;
  }
  cool(state = true) {
    this.cooling = state;
  }
  setAmmo(ammo) {
    this.ammo = ammo;
  }
  setMaxAmmo(ammo) {
    this.maxAmmo = ammo;
  }
  setAvailableAmmo(ammo) {
    this.availableAmmo = ammo;
  }
  load() {
    if (this.ammo === this.maxAmmo || this.availableAmmo - 1 < 0) return;
    this.ammo = this.ammo + 1;
    this.availableAmmo = this.availableAmmo - 1;
  }
  fire() {
    if (this.ammo <= 0) {
      this.ammo = 0;
      return;
    }
    this.ammo = this.ammo - 1;
    this.heat = Math.min(1, this.heat + 0.08);
  }
}
