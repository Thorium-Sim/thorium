import { MapBorder, NavigationRoute, PointOfInterest } from "containers/FlightDirector/FlightSets/types";
import { generateBorderCoords } from "../helpers";



const NOMINAL_COLOR = "#17a2b8"
const WARNING_COLOR = "#ffc107"
const SUCCESS_COLOR = "#28a745"

export const generateLocationIdMap = (pointsOfInterest: PointOfInterest[]) => {
    const locationMap: Record<string, PointOfInterest> = {};
    pointsOfInterest.forEach((each) => {
        locationMap[each.id] = each
    });
    return locationMap;
}

export const generateBorderIdMap = (borders: MapBorder[]) => {
    const borderMap: Record<string, MapBorder> = {};
    borders.forEach((each) => {
        borderMap[each.id] = each
    });
    return borderMap;
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