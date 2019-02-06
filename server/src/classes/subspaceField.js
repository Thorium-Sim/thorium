import { System } from "./generic";

const baseSector = { required: 50, value: 0 };
export default class SubspaceField extends System {
  static sectors = ["fore", "aft", "port", "starboard", "ventral", "dorsal"];
  constructor(params) {
    super(params);
    this.class = "SubspaceField";
    this.type = "SubspaceField";
    this.name = params.name || "Subspace Field";
    this.power = params.power || {
      power: 0,
      powerLevels: [],
      defaultLevel: 0
    };
    this.totalPower = params.totalPower || 300;
    this.fore = params.fore || { ...baseSector };
    this.aft = params.aft || { ...baseSector };
    this.port = params.port || { ...baseSector };
    this.starboard = params.starboard || { ...baseSector };
    this.ventral = params.ventral || { ...baseSector };
    this.dorsal = params.dorsal || { ...baseSector };
  }
  flux(which) {
    if (!which) {
      SubspaceField.sectors.forEach(v => this.flux(v));
      this.totalPower = SubspaceField.sectors.reduce(
        (prev, next) => prev + this[next].required,
        0
      );
      return;
    }
    if (!SubspaceField.sectors.includes(which)) return;
    this[which].required = Math.ceil(Math.random() * 100);
  }
  normal(which) {
    if (!which) {
      SubspaceField.sectors.forEach(v => this.normal(v));
      this.totalPower = 300;
      return;
    }
    if (!SubspaceField.sectors.includes(which)) return;
    this.totalPower = SubspaceField.sectors.reduce(
      (prev, next) => prev + this[next].required,
      0
    );
    this[which].required = 50;
  }
  setValue(which, value) {
    if (!SubspaceField.sectors.includes(which)) return;
    this[which].value = value;
  }
}
