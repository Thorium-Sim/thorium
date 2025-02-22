import { BasicCoordinate, FullCoordinate, MapBorder, NavigationExitOptions, NavigationRoute, NavigationSpeedOptions, NavigationStartOptions, PointOfInterest, PointOfInterestObject, PointOfInterestType, Probe, ProbeAssignment } from ".";

const NOMINAL_COLOR = "#17a2b8"
const WARNING_COLOR = "#ffc107"
const SUCCESS_COLOR = "#28a745"

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
export function calculateTotalTime(path: FullCoordinate[], r: number): number {
    let totalTime = 0;

    // Iterate through each segment in the path
    for (let i = 0; i < path.length - 1; i++) {
        const start = path[i];
        const end = path[i + 1];

        // Calculate the Euclidean distance between two coordinates
        const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

        // Calculate the time required to traverse this segment
        // Time = Distance / (Rate * Speed)
        const segmentTime = distance / (r * start.speed);

        // Accumulate the time for each segment
        totalTime += segmentTime;
    }

    return totalTime;
}

export function getSecondsBetweenUnixTimestamps(startTimestamp: number, endTimestamp: number): number {
    // Calculate the difference in seconds
    const differenceInSeconds = endTimestamp - startTimestamp;

    return differenceInSeconds;
}

export function isEndUnixTimestampAfterCurrent(endTimestamp: number): boolean {
    // Get the current Unix timestamp in seconds
    const currentUnixTimestamp = Math.floor(Date.now() / 1000);

    // Compare the end timestamp with the current Unix timestamp
    return endTimestamp > currentUnixTimestamp;
}

export function isEndTimestampAfterCurrent(endTimestamp: string): boolean {
    // Get the current date and time
    const currentDate = new Date();

    // Convert the end timestamp to a Date object
    const endDate = new Date(endTimestamp);

    // Compare the end date with the current date
    return endDate > currentDate;
}

export function getTimePassedPercentage(startTimestamp: number, endTimestamp: number): number {
    // Get the current Unix timestamp in seconds
    const currentUnixTimestamp = Math.floor(Date.now() / 1000);

    // Check if the current time is before the start time
    if (currentUnixTimestamp <= startTimestamp) {
        return 0;
    }

    // Check if the current time is after the end time
    if (currentUnixTimestamp >= endTimestamp) {
        return 100;
    }

    // Calculate the total duration between start and end timestamps
    const totalDuration = endTimestamp - startTimestamp;

    // Calculate the duration that has passed since the start timestamp
    const passedDuration = currentUnixTimestamp - startTimestamp;

    // Calculate the percentage of time that has passed
    const passedPercentage = (passedDuration / totalDuration) * 100;

    return passedPercentage;
}

export function generateCurrentUnixTimestamp() {
    return Math.floor(Date.now() / 1000);
}

export function formatSecondsToTime(seconds: number): string {
    const hours: number = Math.floor(seconds / 3600);
    const minutes: number = Math.floor((seconds % 3600) / 60);
    const remainingSeconds: number = seconds % 60;

    const formattedHours: string = hours.toString().padStart(2, '0');
    const formattedMinutes: string = minutes.toString().padStart(2, '0');
    const formattedSeconds: string = remainingSeconds.toFixed(0).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}


export const generateFlightPathCoordinates = (currentLocation: { x: number, y: number }, flightPath: NavigationRoute, locationIdMap: Record<string, PointOfInterest>, borderIdMap: Record<string, MapBorder>, maxX: number, maxY: number) => {
    const pointArray = [{ ...currentLocation, color: generateSpeedColor(flightPath.speedOption.speedModifier), speed: 1 }];
    if (flightPath.secondaryRouteOptions.length) {
        for (let i = 0; i < flightPath.secondaryRouteOptions.length; i++) {
            const poi = locationIdMap[flightPath.secondaryRouteOptions[i].targetLocationId]
            pointArray.push({ ...poi.location, color: generateSpeedColor(poi.speedIndex), speed: poi.speedIndex });
        }
    }
    if (flightPath.isBorder) {
        const border = borderIdMap[flightPath.targetLocationId];
        border && pointArray.push({ ...generateBorderCoords(pointArray[pointArray.length - 1], border, maxX, maxY), color: NOMINAL_COLOR, speed: 1 });
    }
    else {
        const targetPoi = locationIdMap[flightPath.targetLocationId]
        targetPoi && pointArray.push({ ...targetPoi.location, color: WARNING_COLOR, speed: 1 });
    }

    return pointArray;
}

export const generateSpeedColor = (index: number) => {
    if (index > 1) {
        return SUCCESS_COLOR;
    }
    else if (index < .75) {
        return WARNING_COLOR
    }
    else {
        return NOMINAL_COLOR
    }
}

export function getPositionAtTime(t: number, path: FullCoordinate[], totalTime: number): { x: number, y: number } {
    // Calculate the total distance of the path
    const segmentDistances: number[] = [];
    let totalDistance = 0;

    for (let i = 0; i < path.length - 1; i++) {
        const start = path[i];
        const end = path[i + 1];
        const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        segmentDistances.push(distance);
        totalDistance += distance;
    }

    // Calculate the time required to traverse each segment based on the relative speeds
    const segmentTimes: number[] = [];
    const totalRelativeTime = segmentDistances.reduce((sum, distance, index) => {
        const segmentTime = distance / path[index].speed;
        segmentTimes.push(segmentTime);
        return sum + segmentTime;
    }, 0);

    // Scale the individual segment times to match the total time T
    const scaledSegmentTimes = segmentTimes.map(segmentTime => segmentTime * (totalTime / totalRelativeTime));

    // Determine the segment and the position within that segment for the given time t
    let accumulatedTime = 0;

    for (let i = 0; i < path.length - 1; i++) {
        const segmentTime = scaledSegmentTimes[i];

        if (t <= accumulatedTime + segmentTime) {
            // Calculate the position within this segment
            const segmentT = (t - accumulatedTime) / segmentTime;
            const start = path[i];
            const end = path[i + 1];
            const x = start.x + segmentT * (end.x - start.x);
            const y = start.y + segmentT * (end.y - start.y);
            return { x, y };
        }

        accumulatedTime += segmentTime;
    }

    // If the time t exceeds T, return the last coordinate
    return path[path.length - 1];
}


export function getLastVisitedCoordinate(t: number, path: FullCoordinate[], T: number): BasicCoordinate {
    if (t <= 0) {
        return path[0];  // If time is zero or negative, return the starting point
    }

    // Calculate the total distance of the path
    const segmentDistances: number[] = [];
    let totalDistance = 0;

    for (let i = 0; i < path.length - 1; i++) {
        const start = path[i];
        const end = path[i + 1];
        const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        segmentDistances.push(distance);
        totalDistance += distance;
    }

    // Calculate the time required to traverse each segment based on the relative speeds
    const segmentTimes: number[] = [];
    const totalRelativeTime = segmentDistances.reduce((sum, distance, index) => {
        const segmentTime = distance / path[index].speed;
        segmentTimes.push(segmentTime);
        return sum + segmentTime;
    }, 0);

    // Scale the individual segment times to match the total time T
    const scaledSegmentTimes = segmentTimes.map(segmentTime => segmentTime * (T / totalRelativeTime));

    // Determine which segment the position is in at time t
    let accumulatedTime = 0;
    for (let i = 0; i < path.length - 1; i++) {
        const segmentTime = scaledSegmentTimes[i];

        if (t <= accumulatedTime + segmentTime) {
            return path[i];  // Return the last visited coordinate
        }

        accumulatedTime += segmentTime;
    }

    // If time t exceeds total time T, return the last coordinate in the path
    return path[path.length - 1];
}


export function calculatePixelsPerSecond(p1: BasicCoordinate, p2: BasicCoordinate, t: number): number {
    const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    return distance / t;
}
