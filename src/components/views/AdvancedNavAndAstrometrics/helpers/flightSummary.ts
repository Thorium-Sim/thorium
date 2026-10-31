import {
  BasicCoordinate,
  FlightSet,
  MapBorder,
  NavigationRoute,
  PointOfInterest,
} from "containers/FlightDirector/FlightSets/types";
import {FullCoordinate} from "containers/FlightDirector/FlightSets/Map/ImageCanvas";
import {getLastVisitedCoordinate} from "containers/FlightDirector/FlightSets/Map/helpers";
import {distanceFormula, generateFullRiskIndex, generateSpeedIndex} from ".";

export type NearestPoi = {
  poi: PointOfInterest;
  distance: number;
  // The crew can't see this one on their map.
  hidden: boolean;
};

/**
 * Closest POI to a location. Unlike the crew map this considers every POI, so
 * the FD still knows when the ship is sitting on top of something undiscovered.
 */
export function getNearestPoi(
  location: BasicCoordinate,
  pois: PointOfInterest[],
  pixelDistanceModifier: number,
): NearestPoi | null {
  let nearest: NearestPoi | null = null;
  let nearestPixels = Infinity;
  pois.forEach(poi => {
    const pixels = distanceFormula(location, poi.location);
    if (pixels < nearestPixels) {
      nearestPixels = pixels;
      nearest = {
        poi,
        distance: pixels * pixelDistanceModifier,
        hidden: !poi.isVisible || poi.isFogOfWar,
      };
    }
  });
  return nearest;
}

export type RouteStop = {
  id: string;
  name: string;
  kind: "stop" | "target";
  isBorder: boolean;
};

/** Stops in travel order, ending with the target (a POI or a map border). */
export function getRouteStops(
  route: Pick<
    NavigationRoute,
    "targetLocationId" | "secondaryRouteOptions" | "isBorder"
  >,
  locationIdMap: Record<string, PointOfInterest>,
  borderIdMap: Record<string, MapBorder>,
): RouteStop[] {
  const stops: RouteStop[] = (route.secondaryRouteOptions || []).map(s => ({
    id: s.targetLocationId,
    name: locationIdMap[s.targetLocationId]?.name || "Unknown",
    kind: "stop",
    isBorder: false,
  }));
  const target = route.isBorder
    ? borderIdMap[route.targetLocationId]
    : locationIdMap[route.targetLocationId];
  stops.push({
    id: route.targetLocationId,
    name: target?.name || "Unknown",
    kind: "target",
    isBorder: route.isBorder,
  });
  return stops;
}

/**
 * How many of the route's stops the ship has already passed. The path is
 * [origin, ...stops, target], so the last visited index is also the number
 * of stops passed.
 */
export function getStopsPassed(
  coords: FullCoordinate[],
  totalEta: number,
  remainingEta: number,
): number {
  if (coords.length < 2 || totalEta <= 0) return 0;
  const last = getLastVisitedCoordinate(
    totalEta - remainingEta,
    coords,
    totalEta,
  );
  const index = coords.findIndex(c => c.x === last.x && c.y === last.y);
  return Math.max(0, index);
}

export function getRouteRisk(
  route: NavigationRoute,
  flightSet: Pick<FlightSet, "pointsOfInterest" | "borders">,
) {
  const target = route.isBorder
    ? flightSet.borders.find(b => b.id === route.targetLocationId)
    : flightSet.pointsOfInterest.find(p => p.id === route.targetLocationId);
  if (!target) return 0;
  const stops = route.secondaryRouteOptions
    .map(s => flightSet.pointsOfInterest.find(p => p.id === s.targetLocationId))
    .filter((p): p is PointOfInterest => !!p);
  return generateFullRiskIndex(
    target,
    route.startOption,
    route.speedOption,
    route.exitOption,
    stops,
  );
}

export function getRouteSpeed(
  route: NavigationRoute,
  origin: BasicCoordinate,
  flightSet: Pick<FlightSet, "pointsOfInterest" | "borders">,
) {
  // Borders have no fixed point; the speed rating is the option's own modifier.
  if (route.isBorder) return route.speedOption.speedModifier;
  const target = flightSet.pointsOfInterest.find(
    p => p.id === route.targetLocationId,
  );
  if (!target) return route.speedOption.speedModifier;
  const stops = route.secondaryRouteOptions
    .map(s => flightSet.pointsOfInterest.find(p => p.id === s.targetLocationId))
    .filter((p): p is PointOfInterest => !!p);
  return generateSpeedIndex(origin, target.location, stops, route.speedOption);
}

export function getRiskLabel(risk: number) {
  if (risk > 3.5) return "High";
  if (risk > 2) return "Moderate";
  return "Low";
}

/** Fraction (0-1) of the route flown. */
export function getTravelProgress(totalEta: number, remainingEta: number) {
  if (!totalEta || totalEta <= 0) return 0;
  return Math.min(1, Math.max(0, (totalEta - remainingEta) / totalEta));
}

/** Hours, minutes and seconds (as typed into prompts) to seconds. Null if any part is invalid. */
export function partsToSeconds(
  hours: string | number,
  minutes: string | number,
  seconds: string | number,
): number | null {
  const parts = [hours, minutes, seconds];
  if (parts.some(p => String(p).trim() === "")) return null;
  const [h, m, sec] = parts.map(Number);
  if ([h, m, sec].some(n => !Number.isFinite(n) || n < 0)) return null;
  return h * 3600 + m * 60 + sec;
}
