import Keyboard from "../../classes/keyboard";

/*
 * Caps Lock is treated as a layer: the Keyboard client pushes "caps" into the
 * meta array when the lock is engaged, exactly like shift/control/option.
 * These tests pin the two properties that matter -- that a caps binding is
 * stored separately from the bare binding, and that triggering resolves to
 * the right one.
 */

// Mirrors the match in server/events/keyboard.js
function matchKey(keyboard, {key, keyCode, meta}) {
  let keyObj = keyboard.keys.find(
    k =>
      k.keyCode === keyCode &&
      JSON.stringify(meta.sort()) === JSON.stringify(k.meta.sort()),
  );
  if (!keyObj) {
    keyObj = keyboard.keys.find(
      k =>
        k.key.toLowerCase() === key.toLowerCase() &&
        JSON.stringify(meta.sort()) === JSON.stringify(k.meta.sort()),
    );
  }
  return keyObj;
}

describe("Keyboard caps lock layer", () => {
  let keyboard;
  beforeEach(() => {
    keyboard = new Keyboard({name: "Test"});
    keyboard.updateKey({
      key: "a",
      keyCode: "KeyA",
      meta: [],
      actions: [{event: "bareA"}],
    });
    keyboard.updateKey({
      key: "a",
      keyCode: "KeyA",
      meta: ["caps"],
      actions: [{event: "capsA"}],
    });
    keyboard.updateKey({
      key: "a",
      keyCode: "KeyA",
      meta: ["shift"],
      actions: [{event: "shiftA"}],
    });
  });

  test("stores the caps binding separately from the bare binding", () => {
    expect(keyboard.keys).toHaveLength(3);
  });

  test("resolves the bare binding when caps is off", () => {
    const k = matchKey(keyboard, {key: "a", keyCode: "KeyA", meta: []});
    expect(k.actions[0].event).toBe("bareA");
  });

  test("resolves the caps binding when the layer is engaged", () => {
    const k = matchKey(keyboard, {key: "a", keyCode: "KeyA", meta: ["caps"]});
    expect(k.actions[0].event).toBe("capsA");
  });

  test("does not confuse the caps layer with shift", () => {
    const caps = matchKey(keyboard, {
      key: "a",
      keyCode: "KeyA",
      meta: ["caps"],
    });
    const shift = matchKey(keyboard, {
      key: "a",
      keyCode: "KeyA",
      meta: ["shift"],
    });
    expect(caps.actions[0].event).toBe("capsA");
    expect(shift.actions[0].event).toBe("shiftA");
  });

  test("supports caps combined with another modifier", () => {
    keyboard.updateKey({
      key: "a",
      keyCode: "KeyA",
      meta: ["caps", "control"],
      actions: [{event: "capsControlA"}],
    });
    const k = matchKey(keyboard, {
      key: "a",
      keyCode: "KeyA",
      meta: ["control", "caps"],
    });
    expect(k.actions[0].event).toBe("capsControlA");
    expect(keyboard.keys).toHaveLength(4);
  });

  test("an unbound caps layer falls through to no match, not the bare key", () => {
    const k = matchKey(keyboard, {key: "b", keyCode: "KeyB", meta: ["caps"]});
    expect(k).toBeUndefined();
  });
});
