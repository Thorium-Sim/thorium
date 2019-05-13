import uuid from "uuid";

class Action {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Action";
    this.event = params.event || "";
    this.args = params.args || "{}";
    this.delay = params.delay || 0;
  }
}

export default class Macro {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Macro";
    this.name = params.name || "Default Macro";
    this.actions = [];
    params.actions &&
      params.actions.forEach(k => {
        this.actions.push(new Action(k));
      });
  }
  rename(name) {
    this.name = name;
  }
  setActions(actions) {
    this.actions = actions;
  }
}
