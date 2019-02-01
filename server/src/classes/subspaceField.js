import uuid from "uuid";

export default class SubspaceField {
  static sectors = ["fore", "aft", "port", "starboard", "ventral", "dorsal"];
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "SubspaceField";
    this.simulatorId = params.simulatorId || null;
    this.totalPower = params.totalPower || 300;
    this.fore = params.fore || {
      required: 50,
      value: 0
    };
    this.aft = params.aft || {
      required: 50,
      value: 0
    };
    this.port = params.port || {
      required: 50,
      value: 0
    };
    this.starboard = params.starboard || {
      required: 50,
      value: 0
    };
    this.ventral = params.ventral || {
      required: 50,
      value: 0
    };
    this.dorsal = params.dorsal || {
      required: 50,
      value: 0
    };
  }
  flux(which) {
    if (!which) {
      SubspaceField.sectors.forEach(v => this.flux(v));
      this.totalPower = SubspaceField.sectors.reduce(
        (prev, next) => prev + next.required,
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
    this[which].required = 50;
  }
  setValue(which, value) {
    if (!SubspaceField.sectors.includes(which)) return;
    this[which].value = value;
  }
}
