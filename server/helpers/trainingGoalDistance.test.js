import {goalDistance, withinGoalRadius} from "./trainingGoalDistance";

describe("goalDistance", () => {
  it("is zero for identical points", () => {
    expect(goalDistance({x: 0.5, y: 0.5}, {x: 0.5, y: 0.5})).toBe(0);
  });

  it("corrects x deltas by the aspect ratio so a radius reads as a circle", () => {
    // A 16:9 canvas: an x delta of 0.1 spans a wider physical distance than
    // a y delta of 0.1. After aspect correction, a pure-x delta of 0.05 and
    // a pure-y delta of (0.05 * 16/9) should read as the same distance.
    const xOnly = goalDistance({x: 0.55, y: 0.5}, {x: 0.5, y: 0.5});
    const yOnly = goalDistance(
      {x: 0.5, y: 0.5 + 0.05 * (16 / 9)},
      {x: 0.5, y: 0.5},
    );
    expect(xOnly).toBeCloseTo(yOnly);
  });

  it("is symmetric", () => {
    const a = {x: 0.2, y: 0.7};
    const b = {x: 0.6, y: 0.3};
    expect(goalDistance(a, b)).toBeCloseTo(goalDistance(b, a));
  });

  it("respects a custom aspect ratio", () => {
    const d = goalDistance({x: 0, y: 0}, {x: 1, y: 0}, 2);
    expect(d).toBeCloseTo(2);
  });
});

describe("withinGoalRadius", () => {
  it("is true when the player is at the goal", () => {
    expect(withinGoalRadius({x: 0.5, y: 0.5}, {x: 0.5, y: 0.5}, 0.08)).toBe(
      true,
    );
  });

  it("is true just inside the radius and false just outside it", () => {
    const goal = {x: 0.5, y: 0.5};
    const inside = {x: 0.5, y: 0.57};
    const outside = {x: 0.5, y: 0.6};
    expect(withinGoalRadius(inside, goal, 0.08)).toBe(true);
    expect(withinGoalRadius(outside, goal, 0.08)).toBe(false);
  });

  it("treats an x-axis offset the same as an aspect-corrected y-axis offset", () => {
    const goal = {x: 0.5, y: 0.5};
    // 0.08 radius in y units; an x offset must be smaller by 9/16 to match.
    const radius = 0.08;
    const xOffset = radius * (9 / 16);
    expect(
      withinGoalRadius({x: 0.5 + xOffset - 0.001, y: 0.5}, goal, radius),
    ).toBe(true);
    expect(
      withinGoalRadius({x: 0.5 + xOffset + 0.01, y: 0.5}, goal, radius),
    ).toBe(false);
  });
});
