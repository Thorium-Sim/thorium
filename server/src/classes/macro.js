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

class MacroButton extends Macro {
  constructor(params) {
    super(params);
    this.color = params.color || "primary";
    this.category = params.category || "general";
  }
  setColor(color) {
    this.color = color;
  }
  setCategory(category) {
    this.category = category;
  }
}

export class MacroButtonConfig {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "MacroButtonConfig";
    this.name = params.name || "Macro Button";
    this.buttons = [];
    (params.buttons || []).forEach(b => this.buttons.push(new MacroButton(b)));
  }
  rename(name) {
    this.name = name;
  }
  removeButton(id) {
    this.buttons = this.buttons.filter(b => b.id !== id);
  }
  addButton(name) {
    const button = new MacroButton({ name });
    this.buttons.push(button);
    return button;
  }
  getButton(id) {
    return this.buttons.find(b => b.id === id);
  }
}
