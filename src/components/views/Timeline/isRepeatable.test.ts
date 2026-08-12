import {describe, expect, it} from "vitest";
import isRepeatableAction, {getArmedActions} from "./isRepeatable";

describe("isRepeatableAction", () => {
  it("treats the viewscreen macros as repeatable", () => {
    expect(isRepeatableAction({event: "updateViewscreenComponent"})).toBe(true);
    expect(isRepeatableAction({event: "setViewscreenToAuto"})).toBe(true);
  });
  it("does not treat an ordinary macro as repeatable", () => {
    expect(isRepeatableAction({event: "processedData"})).toBe(false);
  });
  it("treats an item flagged in Mission Config as repeatable", () => {
    expect(isRepeatableAction({event: "processedData", repeatable: true})).toBe(
      true,
    );
  });
  it("copes with a missing event", () => {
    expect(isRepeatableAction({})).toBe(false);
    expect(isRepeatableAction({event: null, repeatable: null})).toBe(false);
  });
});

describe("getArmedActions", () => {
  const items = [
    {id: "data", event: "processedData"},
    {id: "repeat-data", event: "processedData", repeatable: true},
    {id: "viewscreen", event: "updateViewscreenComponent"},
  ];

  it("arms everything before the step has been run", () => {
    expect(getArmedActions(items, [])).toEqual({
      data: true,
      "repeat-data": true,
      viewscreen: true,
    });
  });

  it("keeps repeatable actions armed after the step has been run", () => {
    // This is the reported bug: coming back to a step left processedData
    // unchecked, so running the step again sent nothing.
    expect(
      getArmedActions(items, ["data", "repeat-data", "viewscreen"]),
    ).toEqual({
      "repeat-data": true,
      viewscreen: true,
    });
  });

  it("still disarms an ordinary action that already fired", () => {
    expect(getArmedActions(items, ["data"])).toEqual({
      "repeat-data": true,
      viewscreen: true,
    });
  });

  it("handles a step with no items", () => {
    expect(getArmedActions(undefined, ["data"])).toEqual({});
    expect(getArmedActions([], ["data"])).toEqual({});
  });
});
