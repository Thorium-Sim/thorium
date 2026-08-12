import {
  getLastVisitedCoordinate,
  getPositionAtTime,
} from "../../classes/flightSets/helpers";

// A flight path that has been engaged but has not finished starting up has no
// generated coordinates yet. These used to walk off the end of the array and hand
// back `undefined`, which was then assigned to the non-null `currentLocation`
// field and took every advanced navigation card down with it.
describe("flight set path helpers with an empty path", () => {
  test("getPositionAtTime returns a usable coordinate", () => {
    const position = getPositionAtTime(1, [], 0);
    expect(position).toBeDefined();
    expect(Number.isFinite(position.x)).toBe(true);
    expect(Number.isFinite(position.y)).toBe(true);
  });

  test("getLastVisitedCoordinate returns a usable coordinate", () => {
    const coordinate = getLastVisitedCoordinate(1, [], 0);
    expect(coordinate).toBeDefined();
    expect(Number.isFinite(coordinate.x)).toBe(true);
    expect(Number.isFinite(coordinate.y)).toBe(true);
  });
});

describe("flight set path helpers with a real path", () => {
  const path = [
    {x: 0, y: 0, speed: 1, color: "white"},
    {x: 100, y: 0, speed: 1, color: "white"},
  ];

  test("getPositionAtTime interpolates along the path", () => {
    expect(getPositionAtTime(5, path, 10)).toEqual({x: 50, y: 0});
  });

  test("getPositionAtTime clamps to the end of the path", () => {
    expect(getPositionAtTime(500, path, 10)).toEqual(path[path.length - 1]);
  });

  test("getLastVisitedCoordinate returns the start before departure", () => {
    expect(getLastVisitedCoordinate(0, path, 10)).toEqual(path[0]);
  });
});
