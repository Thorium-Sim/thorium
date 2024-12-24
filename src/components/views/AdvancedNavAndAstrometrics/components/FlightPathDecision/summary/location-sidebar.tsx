import React from 'react';
import "./location-sidebar.css"
import { distanceFormula, generateBorderCoords, isMapBorder } from '../../../helpers';
import { useFlightContext } from '../../Contexts/OverallFlightContexts';
import { useFlightPathCreationContext } from '../../Contexts/FlightPathCreationContext';
import { MapBorder, PointOfInterest, PointOfInterestInformation } from 'containers/FlightDirector/FlightSets/types';
import { PositionMap, StaticLineMap } from 'containers/FlightDirector/FlightSets/Map';
import { generateBorderIdMap, generateFlightPathCoordinates, generateLocationIdMap, generateSpeedColor } from '../../helpers';
export type LocationSidebarProps = {
    location?: PointOfInterest | MapBorder;
    currentLocation: { x: number, y: number }
    addVersion?: boolean
}

export function generateInformationParagraph(information: PointOfInterestInformation) {
    return (
        <>
            {information.hasBasicInformation && <p>{information.basicInformation}</p>}
            {information.hasDetailedInformation && <p>{information.detailedInformation}</p>}
            {information.hasSecretInformation && <p>{information.secretInformation}</p>}
            {!information.hasBasicInformation || !information.hasDetailedInformation || !information.hasSecretInformation ?
                <p style={{ alignSelf: 'flex-start' }}>Additional information can be gained by visiting this location or by sending a probe to investigate</p> : <></>}
        </>
    )
}

export const LocationSidebar: React.FC<LocationSidebarProps> = (props) => {
    const { backgroundImage, pointsOfInterest, borders, flightSet } = useFlightContext();
    const { flightRoute } = useFlightPathCreationContext();
    const locationIdMap = React.useMemo(() => {
        return generateLocationIdMap(pointsOfInterest)
    }, [pointsOfInterest]);
    const borderIdMap = React.useMemo(() => {
        return generateBorderIdMap(borders);
    }, [borders])

    const pathCoordinates = React.useMemo(() => {
        const path = generateFlightPathCoordinates(props.currentLocation, flightRoute, locationIdMap, borderIdMap, flightSet.imageMaxX, flightSet.imageMaxY);
        if (props.location && !isMapBorder(props.location)) {
            const location: PointOfInterest = props.location as PointOfInterest;
            flightRoute.targetLocationId && path.splice(-1, 0, { ...location.location, color: generateSpeedColor(location.speedIndex), speed: location.speedIndex });
        }
        return path
    }, [props.location, flightRoute, locationIdMap]);

    const distanceToTarget = React.useMemo(() => {
        if (props.location && !isMapBorder(props.location)) {
            const location: PointOfInterest = props.location as PointOfInterest;
            return distanceFormula(props.currentLocation, location.location);
        }
        else if (props.location && isMapBorder(props.location)) {
            // it's a border
            const border: MapBorder = props.location as MapBorder;
            console.log(generateBorderCoords(props.currentLocation, border, flightSet.imageMaxX, flightSet.imageMaxY))
            return distanceFormula(props.currentLocation, generateBorderCoords(props.currentLocation, border, flightSet.imageMaxX, flightSet.imageMaxY))
        }
        else {
            return 0;
        }
    }, [props.location])

    const locationImageUrl = React.useMemo(() => {
        if (props.location && !isMapBorder(props.location)) {
            const location: PointOfInterest = props.location as PointOfInterest;
            return location.fullImageUrl;
        }
        else if (props.location && isMapBorder(props.location)) {
            return (props.location as MapBorder).iconUrl;
        }
        else {
            return '';
        }
    }, [props.location])

    const locationCoords = React.useMemo(() => {
        if (props.location && !isMapBorder(props.location)) {
            return (props.location as PointOfInterest).location;
        }
        else if (props.location && isMapBorder(props.location)) {
            return generateBorderCoords(props.currentLocation, props.location as MapBorder, flightSet.imageMaxX, flightSet.imageMaxY)
        }
        else {
            return props.currentLocation
        }
    }, [props.location])

    return (
        <div className={`location-sidebar open`}>
            <div className="location-sidebar-title">
                <span>Location information</span>
            </div>
            <div className="location-sidebar-divider"></div>
            <div className="location-sidebar-data">
                {props.location ? `Name: ${props.location.name}` : "Please select a location for more information"}
            </div>
            {props.location && <React.Fragment>
                <div className="location-sidebar-data">
                    Distance: {(distanceToTarget / 3).toFixed(2)} light years
                </div>
                <div className="location-sidebar-divider"></div>
                <div style={{ display: 'flex', flexDirection: "column", flexGrow: 1, overflow: "auto" }}>
                    <img style={{ width: "100%" }} src={locationImageUrl} />
                    {props.location && !isMapBorder(props.location) && <div className="location-sidebar-information">
                        <p style={{ marginLeft: "0px" }} className='location-sidebar-data'>Location information:</p>
                        {generateInformationParagraph((props.location as PointOfInterest).information)}
                    </div>}

                </div>

            </React.Fragment>}
            {props.location && <div style={{ flexBasis: '100px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1rem' }} className="location-sidebar-divider"></div>
                <div style={{ flexGrow: 1 }}>
                    {props.addVersion ?
                        <StaticLineMap
                            imageUrl={backgroundImage}
                            coordinates={pathCoordinates}
                        />
                        :
                        <PositionMap
                            imageUrl={backgroundImage}
                            primaryLocation={flightRoute.targetLocationId ? locationIdMap[flightRoute.targetLocationId].location : locationCoords}
                        />
                    }

                </div>


            </div>}

        </div>
    )

}
