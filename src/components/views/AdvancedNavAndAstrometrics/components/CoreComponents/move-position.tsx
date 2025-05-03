import { PositionMap } from "containers/FlightDirector/FlightSets/Map";
import { BasicCoordinate, FlightSet } from "containers/FlightDirector/FlightSets/types";
import React from "react";


export type CoreAdvancedNavigationMovePositionProps = {
    currentLocation: BasicCoordinate
    flightSet: FlightSet;
    onChangeLocation: (location: BasicCoordinate, currentLocationUrl?: string, currentLocationName?: string) => void;
}

export const CoreAdvancedNavigationMovePosition: React.FC<CoreAdvancedNavigationMovePositionProps> = (props) => {
    const [currentLocation, setCurrentLocation] = React.useState<BasicCoordinate>(props.currentLocation);
    const [selectedLocationId, setSelectedLocationId] = React.useState<string | null>(null);

    const selectedLocation = React.useMemo(() => {
        return props.flightSet.pointsOfInterest.find((each) => each.id === selectedLocationId);
    }, [selectedLocationId, props.flightSet.pointsOfInterest]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
            <span>Select a place on the map, or select a point of interest from the list.</span>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <PositionMap
                    imageUrl={props.flightSet.backgroundImg}
                    primaryLocation={selectedLocation ? selectedLocation.location : currentLocation}
                    onMapClick={(coord) => {
                        setCurrentLocation(coord);
                        setSelectedLocationId(null);
                    }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <label>Points of Interest</label>
                    <select name="points-of-interest" id="points-of-interest" value={selectedLocationId || ""} onChange={(event) => {
                        setSelectedLocationId(event.target.value);
                    }}>
                        <option value={""}>Select a point of interest</option>
                        {props.flightSet.pointsOfInterest.map((poi) => <option value={poi.id}>{poi.name}</option>)}
                    </select>

                </div>
            </div>
            <span>The vessel will be moved to</span>
            <span>{selectedLocation ? selectedLocation.name : `(${currentLocation.x}, ${currentLocation.y})`}</span>
            <span>This will cancel any current flight path or eta</span>
            <button onClick={() => {
                if (selectedLocation) {
                    props.onChangeLocation(selectedLocation.location, selectedLocation.iconUrl, selectedLocation.name);
                }
                else {
                    props.onChangeLocation(currentLocation);
                }
            }}>Move</button>
        </div>
    )
}