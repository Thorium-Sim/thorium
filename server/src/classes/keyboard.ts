import uuid from "uuid";

export class KeyAction {
  id: string;
  class: string;
  event: string;
  args: string;
  delay: number;
  noCancelOnReset: boolean;
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "KeyAction";
    this.event = params.event || "";
    this.args = params.args || "{}";
    this.delay = params.delay || 0;
    this.noCancelOnReset = params.noCancelOnReset || false;
  }
}
class Key {
  id: string;
  class: string;
  key: string;
  keyCode: string;
  meta: unknown[];
  actions: KeyAction[];
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Key";

    // This is kept around for legacy support
    this.key = params.key || "";

    // Keycode is the better value
    this.keyCode = params.keyCode || "";
    this.meta = params.meta || [];
    this.actions = [];
    params.actions &&
      params.actions.forEach(k => {
        this.actions.push(new KeyAction(k));
      });
  }
  update({actions}) {
    // Update the actions
    this.actions = [];
    actions.forEach(k => {
      this.actions.push(new KeyAction(k));
    });
  }
}
export default class Keyboard {
  id: string;
  class: string;
  name: string;
  keys: Key[];
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Keyboard";
    this.name = params.name || "Keyboard";
    this.keys = [];
    params.keys &&
      params.keys.forEach(k => {
        this.keys.push(new Key(k));
      });
  }
  rename(name) {
    this.name = name;
  }
  updateKey(key) {
    // Check for existing key
    const k = this.keys.find(
      y =>
        y.id === key.id ||
        ((y.keyCode === key.keyCode || y.key === key.key) &&
          JSON.stringify(y.meta.sort()) === JSON.stringify(key.meta.sort())),
    );
    if (k) k.update(key);
    else this.keys.push(new Key(key));
  }
}
