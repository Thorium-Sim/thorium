import {describe, it, expect} from "vitest";
import {getFootprint, clampToBounds, clampItemPosition} from "./clampToBounds";

describe("getFootprint", () => {
  it("normalizes the scaled icon against the canonical viewscreen", () => {
    const fp = getFootprint({size: 1, iconWidth: 192, iconHeight: 108});
    expect(fp.w).toBeCloseTo(0.1);
    expect(fp.h).toBeCloseTo(0.1);
  });

  it("scales with the icon size", () => {
    const fp = getFootprint({size: 2, iconWidth: 192, iconHeight: 108});
    expect(fp.w).toBeCloseTo(0.2);
    expect(fp.h).toBeCloseTo(0.2);
  });

  it("treats missing dimensions as zero footprint", () => {
    const fp = getFootprint({size: 1});
    expect(fp).toEqual({w: 0, h: 0});
  });
});

describe("clampToBounds", () => {
  const footprint = {w: 0.1, h: 0.1};

  it("leaves an in-bounds position untouched", () => {
    expect(clampToBounds({x: 0.5, y: 0.5, z: 0}, footprint)).toEqual({
      x: 0.5,
      y: 0.5,
      z: 0,
    });
  });

  it("clamps past the right/bottom edge to keep the full icon visible", () => {
    expect(clampToBounds({x: 1.5, y: 2, z: 0}, footprint)).toEqual({
      x: 0.9,
      y: 0.9,
      z: 0,
    });
  });

  it("clamps past the left/top edge to zero", () => {
    expect(clampToBounds({x: -1, y: -0.3, z: 0}, footprint)).toEqual({
      x: 0,
      y: 0,
      z: 0,
    });
  });

  it("pins an oversized icon (footprint > 1) to the top-left", () => {
    expect(clampToBounds({x: 0.5, y: 0.5, z: 0}, {w: 1.5, h: 2})).toEqual({
      x: 0,
      y: 0,
      z: 0,
    });
  });

  it("preserves the z coordinate", () => {
    expect(clampToBounds({x: 0.5, y: 0.5, z: 0.42}, footprint).z).toBe(0.42);
  });
});

describe("clampItemPosition", () => {
  it("clamps using the item's stored footprint", () => {
    const item = {size: 1, iconWidth: 192, iconHeight: 108};
    expect(clampItemPosition(item, {x: 1, y: 1, z: 0})).toEqual({
      x: 0.9,
      y: 0.9,
      z: 0,
    });
  });
});
