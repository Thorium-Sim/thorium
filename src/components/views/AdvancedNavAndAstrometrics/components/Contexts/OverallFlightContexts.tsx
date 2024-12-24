import React from "react";
import { FC, createContext, useContext } from "react";


import { generateLocationIdMap } from "../helpers";
import { BasicCoordinate, FlightSet, MapBorder, NavigationExitOptions, NavigationSpeedOptions, NavigationStartOptions, PointOfInterest } from "containers/FlightDirector/FlightSets/types";

interface FlightContextProps {
    backgroundImage: string;
    currentLocation: BasicCoordinate;
    pointsOfInterest: PointOfInterest[]
    navigationStartOptions: NavigationStartOptions[],
    navigationSpeedOptions: NavigationSpeedOptions[],
    navigationExitOptions: NavigationExitOptions[],
    borders: MapBorder[],
    flightSet: FlightSet
}

export const determinePOIFromId = (id: string, pointsOfInterest: PointOfInterest[]) => {
    const map = generateLocationIdMap(pointsOfInterest)
    return map[id]
}

// Create the user role context
const FlightContext = createContext<FlightContextProps>({
    backgroundImage: "",
    pointsOfInterest: [],
    navigationStartOptions: [],
    navigationSpeedOptions: [],
    navigationExitOptions: [],
    currentLocation: { x: 0, y: 0 },
    borders: [],
    flightSet: {
        backgroundImg: "",
        pointsOfInterest: [],
        startOptions: [],
        speedOptions: [],
        exitOptions: [],
        defaultStartingLocation: { x: 0, y: 0 },
        id: 'mock',
        name: "Legacy V1",
        borders: [],
        imageMaxX: 960,
        imageMaxY: 540
    } as any
});

const FlightContextProvider: FC<{ children: React.ReactNode } & FlightContextProps> = ({ children, backgroundImage, navigationExitOptions, navigationSpeedOptions, navigationStartOptions, pointsOfInterest, currentLocation, borders, flightSet }) => {
    return <FlightContext.Provider value={{ backgroundImage, pointsOfInterest, navigationStartOptions, navigationSpeedOptions, navigationExitOptions, currentLocation, borders, flightSet }}> {children} </FlightContext.Provider>;
};

const useFlightContext = () => useContext(FlightContext);

export { FlightContextProvider, useFlightContext };