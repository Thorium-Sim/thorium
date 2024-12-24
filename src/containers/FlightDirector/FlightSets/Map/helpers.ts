import { BasicCoordinate } from "../types";
import { FullCoordinate } from "./ImageCanvas";

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
    console.log(scaledSegmentTimes, t);
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

export function calculatePixelsPerSecond(p1: BasicCoordinate, p2: BasicCoordinate, t: number): number {
    const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    return distance / t;
}