import AdvancedNavigationAndAstrometrics from "../../classes/advancedNavigationAndAstrometrics";
import { EngineStatus } from "../../classes/flightSets";

const coords = [
  { x: 0, y: 0, speed: 1, color: "white" },
  { x: 100, y: 0, speed: 1, color: "white" },
];

function makeUnderWaySystem(requiresMaxEngines = false) {
  const nav = new AdvancedNavigationAndAstrometrics({});
  nav.currentFlightSet = { id: "fs", imageMaxX: 1000, imageMaxY: 1000, pixelsPerSecond: 1, pointsOfInterest: [], borders: [] } as any;
  nav.currentFlightPath = {
    startOption: { secondsForStartup: 10 },
    speedOption: { requiresMaxEngines, speedModifier: 1 },
    secondaryRouteOptions: [],
  } as any;
  nav.flightPathCoords = coords as any;
  nav.totalEta = 100;
  nav.remainingEta = 60;
  nav.currentLocation = { x: 40, y: 0 };
  nav.engineStatus = EngineStatus.ENGAGED;
  return nav;
}

describe("AdvancedNavigationAndAstrometrics resume", () => {
  const realNow = Date.now;
  let now = 0;
  const advance = (ms: number) => {
    now += ms;
  };
  beforeEach(() => {
    now = new Date("2026-01-01T00:00:00Z").getTime();
    Date.now = () => now;
  });
  afterEach(() => {
    Date.now = realNow;
  });

  test("resume goes through STARTUP and does not move the ship", () => {
    const nav = makeUnderWaySystem();
    nav.handleEmergencyStop();
    nav.handleResumePath();
    expect(nav.engineStatus).toBe(EngineStatus.STARTUP);
    expect(nav.remainingStartupTime).toBe(10);

    advance(3000);
    nav.executeLoopInterval();
    expect(nav.engineStatus).toBe(EngineStatus.STARTUP);
    expect(nav.currentLocation).toEqual({ x: 40, y: 0 });
    expect(nav.remainingEta).toBe(60);
  });

  test("after startup the flight continues without regenerating the path", () => {
    const nav = makeUnderWaySystem();
    nav.handleEmergencyStop();
    nav.handleResumePath();
    advance(10000);
    nav.executeLoopInterval();
    expect(nav.engineStatus).toBe(EngineStatus.ENGAGED);
    expect(nav.flightPathCoords).toBe(coords);
    expect(nav.totalEta).toBe(100);
    expect(nav.remainingEta).toBe(60);
    expect(nav.resumingFlight).toBe(false);
  });

  test("resume uses FULL_POWER when the speed option requires max engines", () => {
    const nav = makeUnderWaySystem(true);
    nav.handleEmergencyStop();
    nav.handleResumePath();
    advance(10000);
    nav.executeLoopInterval();
    expect(nav.engineStatus).toBe(EngineStatus.FULL_POWER);
  });

  test("stopping during a resume startup keeps the flight resumable", () => {
    const nav = makeUnderWaySystem();
    nav.handleEmergencyStop();
    nav.handleResumePath();
    nav.handleEmergencyStop();
    expect(nav.engineStatus).toBe(EngineStatus.STOPPED);
    expect(nav.currentFlightPath).toBeDefined();
    expect(nav.flightPathCoords).toBe(coords);
    nav.handleResumePath();
    expect(nav.engineStatus).toBe(EngineStatus.STARTUP);
  });

  test("stopping during the initial engage startup still aborts the path", () => {
    const nav = makeUnderWaySystem();
    nav.engineStatus = EngineStatus.STARTUP;
    nav.resumingFlight = false;
    nav.handleEmergencyStop();
    expect(nav.engineStatus).toBe(EngineStatus.STOPPED);
    expect(nav.currentFlightPath).toBeUndefined();
  });
});
