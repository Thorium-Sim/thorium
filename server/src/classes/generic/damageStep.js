import uuid from "uuid";

export default class DamageStep {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "generic";
    this.args = params.args || {};
  }
  update({ name, args }) {
    if (name) this.name = name;
    if (args) this.args = Object.assign({}, this.args, args);
  }
}
