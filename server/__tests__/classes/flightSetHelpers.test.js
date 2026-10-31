import {
  calculateTotalTime,
  generateFlightPathCoordinates,
  generateSpeedIndex,
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

// The speed summary shown while building a flight path has to agree with the ETA the
// server calculates once the path is activated (issue #3580).
describe("generateSpeedIndex", () => {
  const start = {x: 0, y: 0};
  const target = {id: "target", location: {x: 100, y: 0}, speedIndex: 1};
  const poi = (id, x, y, speedIndex) => ({id, location: {x, y}, speedIndex});
  const speedOption = (speedModifier) => ({speedModifier});

  const eta = (stops, modifier) => {
    const locationIdMap = {target};
    stops.forEach(stop => (locationIdMap[stop.id] = stop));
    const path = {
      targetLocationId: "target",
      isBorder: false,
      speedOption: speedOption(modifier),
      secondaryRouteOptions: stops.map(stop => ({targetLocationId: stop.id})),
    };
    const coords = generateFlightPathCoordinates(start, path, locationIdMap, {}, 1000, 1000);
    return calculateTotalTime(coords, modifier);
  };
  const index = (stops, modifier) =>
    generateSpeedIndex(start, target.location, stops, speedOption(modifier));

  test("without stops it equals the speed option modifier", () => {
    expect(index([], 2)).toBe(2);
  });

  test("a faster slingshot stop scores higher than the direct route", () => {
    const fastStop = poi("b", 30, 0, 3);
    expect(index([fastStop], 2)).toBeGreaterThan(index([], 2));
    expect(eta([fastStop], 2)).toBeLessThan(eta([], 2));
  });

  test("matches the server ETA for routes with stops", () => {
    const stops = [poi("a", 30, 40, 3), poi("b", 80, 60, 0.5)];
    [1, 2, 0.5].forEach(modifier => {
      expect(index(stops, modifier)).toBeCloseTo(100 / eta(stops, modifier), 6);
    });
  });

  test("orders routes the same way as their ETAs", () => {
    const routes = [
      [],
      [poi("a", 30, 0, 3)],
      [poi("a", 30, 0, 0.5)],
      [poi("a", 30, 40, 3), poi("b", 80, 60, 2)],
    ];
    const byIndex = routes
      .map((_, i) => i)
      .sort((a, b) => index(routes[b], 2) - index(routes[a], 2));
    const byEta = routes
      .map((_, i) => i)
      .sort((a, b) => eta(routes[a], 2) - eta(routes[b], 2));
    expect(byIndex).toEqual(byEta);
  });
});
