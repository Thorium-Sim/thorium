import {
  getNearestPoi,
  getRiskLabel,
  getRouteRisk,
  getRouteStops,
  getStopsPassed,
  partsToSeconds,
  getTravelProgress,
} from "./flightSummary";

const poi = (id: string, x: number, y: number, extra: any = {}): any => ({
  id,
  name: `POI ${id}`,
  location: {x, y},
  isVisible: true,
  isFogOfWar: false,
  speedIndex: 1,
  riskIndex: 1,
  ...extra,
});

describe("getNearestPoi", () => {
  test("returns null with no POIs", () => {
    expect(getNearestPoi({x: 0, y: 0}, [], 1)).toBeNull();
  });

  test("picks the closest POI and scales distance", () => {
    const result = getNearestPoi(
      {x: 0, y: 0},
      [poi("a", 30, 40), poi("b", 300, 400)],
      0.1,
    );
    expect(result?.poi.id).toBe("a");
    expect(result?.distance).toBeCloseTo(5);
    expect(result?.hidden).toBe(false);
  });

  test("considers hidden and fog of war POIs and flags them", () => {
    const hiddenPoi = poi("h", 1, 1, {isVisible: false});
    const fogPoi = poi("f", 1, 1, {isFogOfWar: true});
    expect(
      getNearestPoi({x: 0, y: 0}, [poi("a", 50, 50), hiddenPoi], 1)?.hidden,
    ).toBe(true);
    expect(
      getNearestPoi({x: 0, y: 0}, [poi("a", 50, 50), fogPoi], 1)?.hidden,
    ).toBe(true);
  });
});

describe("getRouteStops", () => {
  const pois = {a: poi("a", 0, 0), b: poi("b", 0, 0), t: poi("t", 0, 0)};
  const borders: any = {edge: {id: "edge", name: "Vega Border"}};

  test("orders stops before the target", () => {
    const stops = getRouteStops(
      {
        targetLocationId: "t",
        isBorder: false,
        secondaryRouteOptions: [
          {targetLocationId: "a"},
          {targetLocationId: "b"},
        ],
      } as any,
      pois,
      borders,
    );
    expect(stops.map(s => s.id)).toEqual(["a", "b", "t"]);
    expect(stops.map(s => s.kind)).toEqual(["stop", "stop", "target"]);
  });

  test("names a border target", () => {
    const stops = getRouteStops(
      {
        targetLocationId: "edge",
        isBorder: true,
        secondaryRouteOptions: [],
      } as any,
      pois,
      borders,
    );
    expect(stops).toEqual([
      {id: "edge", name: "Vega Border", kind: "target", isBorder: true},
    ]);
  });
});

describe("getStopsPassed", () => {
  const coords: any[] = [
    {x: 0, y: 0, speed: 1, color: "w"},
    {x: 100, y: 0, speed: 1, color: "w"},
    {x: 200, y: 0, speed: 1, color: "w"},
  ];

  test("is 0 at the start", () => {
    expect(getStopsPassed(coords, 10, 10)).toBe(0);
  });

  test("counts stops flown past", () => {
    expect(getStopsPassed(coords, 10, 2)).toBe(1);
  });

  test("is safe with no path", () => {
    expect(getStopsPassed([], 0, 0)).toBe(0);
  });
});

describe("getRouteRisk", () => {
  test("sums target, stops and option modifiers", () => {
    const flightSet: any = {
      pointsOfInterest: [
        poi("a", 0, 0, {riskIndex: 1}),
        poi("t", 0, 0, {riskIndex: 2}),
      ],
      borders: [],
    };
    const route: any = {
      targetLocationId: "t",
      isBorder: false,
      secondaryRouteOptions: [{targetLocationId: "a"}],
      startOption: {riskModifier: 0.5},
      speedOption: {riskModifier: 1},
      exitOption: {riskModifier: 0.25},
    };
    expect(getRouteRisk(route, flightSet)).toBeCloseTo(4.75);
  });
});

describe("labels and progress", () => {
  test("risk label thresholds match the RiskIndex bar", () => {
    expect(getRiskLabel(1)).toBe("Low");
    expect(getRiskLabel(3)).toBe("Moderate");
    expect(getRiskLabel(4)).toBe("High");
  });

  test("travel progress clamps to 0-1", () => {
    expect(getTravelProgress(0, 0)).toBe(0);
    expect(getTravelProgress(100, 100)).toBe(0);
    expect(getTravelProgress(100, 25)).toBeCloseTo(0.75);
    expect(getTravelProgress(100, -5)).toBe(1);
  });
});

describe("partsToSeconds", () => {
  test("combines hours, minutes and seconds", () => {
    expect(partsToSeconds("1", "2", "3")).toBe(3723);
    expect(partsToSeconds(0, 4, 12)).toBe(252);
  });

  test("rejects blanks, junk and negatives", () => {
    expect(partsToSeconds("", "0", "0")).toBeNull();
    expect(partsToSeconds("0", "abc", "0")).toBeNull();
    expect(partsToSeconds("0", "0", "-5")).toBeNull();
  });
});
