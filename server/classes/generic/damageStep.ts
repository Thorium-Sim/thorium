import uuid from "uuid";

export default class DamageStep {
  id?: string;
  name?: string;
  args?: any;
  constructor(params: DamageStep = {}) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "generic";
    this.args = params.args || {};
  }
  update?({name, args}: DamageStep) {
    if (name) this.name = name;
    if (args) this.args = Object.assign({}, this.args, args);
  }
}
