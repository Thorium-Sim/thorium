import uuid from "uuid";

// from ./taskFlow.ts
function move(array, old_index, new_index) {
  if (new_index >= array.length) {
    // if new spot is outside of the array
    var k = new_index - array.length; // take the amount of new elements
    while (k-- + 1) {
      // and if that's greater than zero
      array.push(undefined); // put a null value at that point in the array
    }
  }
  array.splice(new_index, 0, array.splice(old_index, 1)[0]); // remove the item at the old index and replace it at the new index
  return array; // for testing purposes
}

class Action {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Action";
    this.event = params.event || "";
    this.args = params.args || "{}";
    this.delay = params.delay || 0;
    this.noCancelOnReset = params.noCancelOnReset || false;
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
  duplicateAction(actionId) {
    const action = this.actions.find(a => a.id === actionId);
    if (!action) return;
    const newAction = new Action({...action, id: undefined});
    this.actions.push(newAction);
    return newAction.id;
  }
  // For reordering macro button actions
  reorderAction(oldIndex, newIndex) {
    this.actions = move(this.actions, oldIndex, newIndex);
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
    const button = new MacroButton({name});
    this.buttons.push(button);
    return button;
  }
  getButton(id) {
    return this.buttons.find(b => b.id === id);
  }
  // For reordering macro buttons
  reorderButton(oldIndex, newIndex) {
    this.buttons = move(this.buttons, oldIndex, newIndex);
  }
}
