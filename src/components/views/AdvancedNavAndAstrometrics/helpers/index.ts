import { BasicCoordinate, MapBorder, NavigationExitOptions, NavigationSpeedOptions, NavigationStartOptions, PointOfInterest, PointOfInterestObject, PointOfInterestType, Probe, ProbeAssignment } from "containers/FlightDirector/FlightSets/types";
import { AdvancedNavigationAndAstrometrics, AdvancedNavigationAndAstrometrics as GraphqlAstro } from "generated/graphql";


export function parseGraphqlToUIAstroObject(obj: GraphqlAstro): AdvancedNavigationAndAstrometrics {
    return {
        ...obj,
        flightSetPathMap: JSON.parse(obj.flightSetPathMap),
        probeAssignments: JSON.parse(obj.probeAssignments),
    }
}

export function generateSpeedIndex(currentLocation: { x: number, y: number }, targetLocation: { x: number, y: number }, secondaryRoutes: PointOfInterest[], speedOption: NavigationSpeedOptions) {
    let basicTime = distanceFormula(currentLocation, targetLocation) * (1 / speedOption.speedModifier);
    if (secondaryRoutes && secondaryRoutes.length) {
        let currLocation = currentLocation;
        let speedIndex = 1;
        let totalTime = 0;
        secondaryRoutes.forEach((each) => {
            let time = distanceFormula(currLocation, each.location) * (1 / speedIndex) * (1 / speedOption.speedModifier);
            totalTime += time;
            speedIndex = each.speedIndex;
        });
        let finalTime = distanceFormula(secondaryRoutes[secondaryRoutes.length - 1].location, targetLocation) * (1 / speedIndex) * (1 / speedOption.speedModifier);
        totalTime += finalTime;
        return basicTime / totalTime;
    }
    return speedOption.speedModifier;
}

export function distanceFormula(start: { x: number, y: number }, end: { x: number, y: number }) {
    let xDiff = Math.abs(start.x - end.x);
    let yDiff = Math.abs(start.y - end.y);
    return Math.hypot(xDiff, yDiff);
}

export function generateRiskIndex(targetLocation: PointOfInterest | MapBorder, secondaryRoutes?: PointOfInterest[]) {
    let riskIndex = targetLocation.riskIndex;
    if (secondaryRoutes) {
        secondaryRoutes.forEach((each) => {
            riskIndex += each.riskIndex;
        });
    }
    return riskIndex;
}

export function generateFullRiskIndex(targetLocation: PointOfInterest | MapBorder, startingOption: NavigationStartOptions, speedOption: NavigationSpeedOptions, exitOption: NavigationExitOptions, secondaryRoutes: PointOfInterest[]) {
    let riskIndex = generateRiskIndex(targetLocation, secondaryRoutes);
    riskIndex += startingOption.riskModifier;
    riskIndex += speedOption.riskModifier;
    riskIndex += exitOption.riskModifier;
    return riskIndex;
}

export function isPointOfInterestObject(poiType: PointOfInterestType): poiType is PointOfInterestObject {
    return (poiType as PointOfInterestObject).category !== undefined;
}

export function generateBorderCoords(previousCoord: BasicCoordinate, border: MapBorder, totalX: number, totalY: number) {
    let x = previousCoord.x;
    let y = previousCoord.y;
    if (border.location.side === 'top') {
        y = 20;
    }
    else if (border.location.side === 'bottom') {
        y = totalY - 20;
    }
    else if (border.location.side === 'left') {
        x = 20;
    }
    else if (border.location.side === 'right') {
        x = totalX - 20;
    }
    else if (border.location.side === 'top-right') {
        x = totalX - 20;
        y = 0;
    }
    else if (border.location.side === 'top-left') {
        x = 20;
        y = 20;
    }
    else if (border.location.side === 'bottom-right') {
        x = totalX - 20;
        y = totalY - 20;
    }
    else if (border.location.side === 'bottom-left') {
        x = 20;
        y = totalY - 20;
    }
    return { x, y };
}

export function isMapBorder(location: PointOfInterest | MapBorder): location is MapBorder {
    return (location as MapBorder).location.side !== undefined;
}


export function countProbeFuelCells(probe: Probe, probeAssignment?: ProbeAssignment) {
    if (probeAssignment) {
        return probeAssignment.remainingFuelCellCount;
    }
    else {
        return probe.equipment.filter(equipment => equipment.id === "extra-fuel-cell")[0]?.count + 1 || 1
    }
}

export function getAvailablePointsOfInterest(currentLocation: { x: number, y: number }, pointsOfInterest: PointOfInterest[], maxDistance: number) {
    return pointsOfInterest.filter((each) => {
        return distanceFormula(currentLocation, each.location) <= maxDistance;
    }).filter((each) => each.isVisible).filter((each) => each.location.x !== currentLocation.x && each.location.y !== currentLocation.y);
}

export function getProbeCurrentLocation(currentLocation: BasicCoordinate, probe: Probe, probeAssignments: ProbeAssignment[]) {
    let probeAssignment = probeAssignments.find((each) => each.probeId === probe.id);
    if (probeAssignment?.completed) {
        return probeAssignment.currentLocation;
    }
    return currentLocation;
}

export const PROBE_IMAGE_MAP: Record<string, string> = {
    'class-i': require('../../ProbeConstruction/probes/class-i.svg'),
    'class-ii': require('../../ProbeConstruction/probes/class-ii.svg'),
    'class-iii': require('../../ProbeConstruction/probes/class-iii.svg'),
    'defense': require('../../ProbeConstruction/probes/defense.svg'),
    'science': require('../../ProbeConstruction/probes/science.svg')
}

export const PROBE_TYPE_MAP: Record<string, string> = {
    'class-i': 'Class I',
    'class-ii': 'Class II',
    'class-iii': 'Class III',
    'defense': 'Defense',
    'science': 'Science'
}
