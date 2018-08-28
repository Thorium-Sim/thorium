import { System } from "./generic";
import HeatMixin from "./generic/heatMixin";

export default class Railgun extends HeatMixin(System) {
  constructor(params) {
    super(params);
    this.class = "Railgun";
    this.type = "Railgun";
    this.name = params.name || "Railgun";
    this.displayName = params.displayName || "Railgun";
    this.maxAmmo = params.maxAmmo || 25;
    this.ammo = params.ammo || 0;
    this.availableAmmo = params.availableAmmo || 250;
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
    this.heat += 0.1;
  }
}
