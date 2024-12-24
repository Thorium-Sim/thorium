import { CreateNewFlightSetMutationVariables, GetAllFlightSetsQuery } from "generated/graphql";
import { MapBorderSide as MapBorderSideType, SecondaryStopTransitOption, FlightSet } from "./types";

export function formatGraphqlQueryToTypescript(query: GetAllFlightSetsQuery): FlightSet[] {
    const flightSets = query.getAllFlightSets.filter(f => f !== null);
    if (flightSets.find(f => f === null)) {
        return []
    }
    if (flightSets.find(f => f === undefined)) {
        return [];
    }
    const newFlightSets: FlightSet[] = flightSets.map((flightSet) => {
        // fix the border type
        const borderArray = flightSet?.borders.map(border => {
            return {
                ...border,
                location: {
                    side: mapBorderSideToString(border.location.side)
                }
            }
        });
        const pointsOfInterest = flightSet?.pointsOfInterest.map(point => {
            let secondaryStopTransitOptions = point.transitOptions;
            if (secondaryStopTransitOptions === null) {
                secondaryStopTransitOptions = undefined
            }
            return {
                ...point,
                transitOptions: secondaryStopTransitOptions as SecondaryStopTransitOption[]
            }
        })
        return {
            ...flightSet,
            startOptions: flightSet?.startOptions || [],
            exitOptions: flightSet?.exitOptions || [],
            speedOptions: flightSet?.speedOptions || [],
            defaultStartingLocation: flightSet?.defaultStartingLocation || { x: 0, y: 0 },
            imageMaxX: flightSet?.imageMaxX || 0,
            imageMaxY: flightSet?.imageMaxY || 0,
            pixelsPerSecond: flightSet?.pixelsPerSecond || 4,
            probeLaunchRangeRadius: flightSet?.probeLaunchRangeRadius || 100,
            id: flightSet?.id || '',
            name: flightSet?.name || '',

            backgroundImg: flightSet?.backgroundImg || '',
            label: flightSet?.label || '',
            borders: borderArray || [],
            pointsOfInterest: pointsOfInterest || [],
            addOnTraining: flightSet?.addOnTraining || false,
        }
    })
    return newFlightSets;
}




const mapBorderSideToString = (side: string): MapBorderSideType => {
    const mapping: Record<string, MapBorderSideType> = {
        ['Top']: 'top',
        ['Right']: 'right',
        ['Bottom']: 'bottom',
        ['Left']: 'left',
        ['TopRight']: 'top-right',
        ['TopLeft']: 'top-left',
        ['BottomRight']: 'bottom-right',
        ['BottomLeft']: 'bottom-left',
    };
    return mapping[side] as MapBorderSideType || side as MapBorderSideType;
}

