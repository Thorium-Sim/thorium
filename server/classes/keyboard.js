import uuid from "uuid";

class KeyAction {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "KeyAction";
    this.event = params.event || "";
    this.args = params.args || "{}";
    this.delay = params.delay || 0;
  }
}
class Key {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Key";
    this.key = params.key || "";
    this.meta = params.meta || [];
    this.actions = [];
    params.actions &&
      params.actions.forEach(k => {
        this.actions.push(new KeyAction(k));
      });
  }
  update({ actions }) {
    // Update the actions
    this.actions = [];
    actions.forEach(k => {
      this.actions.push(new KeyAction(k));
    });
  }
}
export default class Keyboard {
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
        (y.key === key.key &&
          JSON.stringify(y.meta.sort()) === JSON.stringify(key.meta.sort()))
    );
    if (k) k.update(key);
    else this.keys.push(new Key(key));
  }
}
