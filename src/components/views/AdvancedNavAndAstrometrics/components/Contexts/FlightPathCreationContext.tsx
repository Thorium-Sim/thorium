import React from "react";
import { NavigationRoute } from "containers/FlightDirector/FlightSets/types";
import { FC, createContext, useContext } from "react";
import { generate_DEFAULT_FLIGHT_PATH } from "../FlightPathDecision/defaults";


interface FlightPathCreationContextProps {
    flightRoute: NavigationRoute
}


// Create the user role context
const FlightPathCreationContext = createContext<FlightPathCreationContextProps>({
    flightRoute: generate_DEFAULT_FLIGHT_PATH()
});

const FlightPathCreationContextProvider: FC<{ children: React.ReactNode } & FlightPathCreationContextProps> = ({ children, flightRoute }) => {
    return <FlightPathCreationContext.Provider value={{ flightRoute }}> {children} </FlightPathCreationContext.Provider>;
};

const useFlightPathCreationContext = () => useContext(FlightPathCreationContext);

export { FlightPathCreationContextProvider, useFlightPathCreationContext };