import uuid from "uuid";

export default class DamageStep {
  constructor(params = {}) {
    // Since each object (simulator and station) can
    // only have one of a given task template assigned
    // as a damage step, the ID is the task template's ID
    this.id = params.id;
    this.required = params.required || false;
    // An array of damage step (task template) IDs
    this.nextSteps = params.nextSteps || [];
  }
  update({ required, nextSteps }) {
    if (required || required === false) this.required = required;
    if (nextSteps) this.nextSteps = nextSteps;
  }
}
