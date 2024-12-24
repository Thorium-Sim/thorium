import { Button, Label, Input } from 'reactstrap'
import { useEffect, useMemo, useState } from "react";
import { SelectDestination } from "./steps/select-destination";
import { SelectSpeedType } from "./steps/select-speed-type";
import { SelectStartType } from "./steps/select-start-type";
import { SelectEndType } from "./steps/select-end-type";
import { AddStop } from "./steps/add-stop";
import { DEFAULT_FLIGHT_PATH } from "./defaults";
import { LocationSidebar } from "./summary/location-sidebar";
import { PathSummarySidebar } from "./summary/path-sidebar";
import { useFlightContext } from "../Contexts/OverallFlightContexts";
import { FlightPathCreationContextProvider } from "../Contexts/FlightPathCreationContext";
import { SelectPath } from "./steps/select-flight-path";
import { BlankSidebar } from "./summary/blank-sidebar";
import { FlightSet, MapBorder, NamedNavigationRoute, NavigationExitOptions, NavigationRoute, NavigationSpeedOptions, NavigationStartOptions, PointOfInterest } from 'containers/FlightDirector/FlightSets/types';
import React from 'react';
import { FlexFlightPathSummary } from './FlexFlightPathSummary';

export type FlightPathDecisionProps = {
    flightSet: FlightSet
    currentLocation: {
        x: number;
        y: number;
    }
    saving: boolean;
    possibleFlightPatterns: NamedNavigationRoute[];
    selfUrl: string;
    currentLocationUrl?: string;
    currentLocationName?: string
    onSaveRoute: (route: NamedNavigationRoute) => void;
    onExecuteRoute: (route: NavigationRoute) => void;
    onBack: () => void;
}

enum FlightPathDecisionState {
    SELECT_FLIGHT_PATTERN,
    SELECT_START,
    SELECT_SPEED,
    SELECT_EXIT,
    SELECT_DESTINATION,
    SELECT_HAZARD_NAVIGATION,
    SUMMARY,
    SELECT_SECONDARY_ROUTE,
    NAME_SAVED_ROUTE
}

export const ADD_NEW_ID = 'add-new';

export const FlightPathDecision: React.FC<FlightPathDecisionProps> = (props) => {
    const { navigationExitOptions, navigationSpeedOptions, navigationStartOptions, pointsOfInterest, flightSet } = useFlightContext()
    const [selectedFlightPath, setSelectedFlightPath] = useState<NamedNavigationRoute | null | 'new'>(null);
    const [selectedStartOption, setSelectedStartOption] = useState<NavigationStartOptions | null>(null);
    const [selectedSpeedOption, setSelectedSpeedOption] = useState<NavigationSpeedOptions | null>(null);
    const [selectedExitOption, setSelectedExitOption] = useState<NavigationExitOptions | null>(null);
    const [targetLocation, setTargetLocation] = useState<PointOfInterest | MapBorder | null>(null);
    const [secondaryRouteEditIndex, setSecondaryRouteEditIndex] = useState<number>(0);
    const [secondaryRouteSelected, setSecondaryRouteSelected] = useState<PointOfInterest | null>(null);
    const [flightPathName, setFlightPathName] = useState<string>("");
    const [flightRoute, setFlightRoute] = useState<NavigationRoute>(DEFAULT_FLIGHT_PATH);
    const [state, setState] = useState<FlightPathDecisionState>(props.saving ? FlightPathDecisionState.SELECT_DESTINATION : FlightPathDecisionState.SELECT_FLIGHT_PATTERN);
    const [canJumpToSummary, setCanJumpToSummary] = useState<boolean>(false);
    const [currentLocation, setCurrentLocation] = useState<{ x: number, y: number }>(props.currentLocation);
    const pointsOfInterestMap = useMemo(() => {
        const map = {} as Record<string, PointOfInterest>;
        pointsOfInterest.forEach((poi) => {
            map[poi.id] = poi;
        });
        return map;
    }, [pointsOfInterest])

    const borderIdMap = useMemo(() => {
        const map = {} as Record<string, MapBorder>;
        flightSet.borders.forEach((border) => {
            map[border.id] = border;
        });
        return map;
    }, [flightSet])

    const startOptionMap = useMemo(() => {
        const map = {} as Record<string, NavigationStartOptions>;
        navigationStartOptions.forEach((option) => {
            map[option.name] = option;
        });
        return map
    }, [navigationStartOptions]);

    const speedOptionMap = useMemo(() => {
        const map = {} as Record<string, NavigationSpeedOptions>;
        navigationSpeedOptions.forEach((option) => {
            map[option.name] = option;
        });
        return map
    }, [navigationSpeedOptions]);

    const exitOptionMap = useMemo(() => {
        const map = {} as Record<string, NavigationExitOptions>;
        navigationExitOptions.forEach((option) => {
            map[option.name] = option;
        })
        return map;
    }, [navigationExitOptions])

    const hasSecondaryLocationMap = useMemo(() => {
        const map = {} as Record<string, boolean>;
        flightRoute.secondaryRouteOptions && flightRoute.secondaryRouteOptions.forEach((each) => {
            map[each.targetLocationId] = true;
        });
        return map;
    }, [flightRoute])


    const prepStart = () => {
        if (flightRoute.startOption.name) {
            setSelectedStartOption(flightRoute.startOption)
        }
    }

    const prepSpeed = () => {
        if (flightRoute.speedOption.name) {
            setSelectedSpeedOption(flightRoute.speedOption)
        }
    }

    const prepExit = () => {
        if (flightRoute.exitOption.name) {
            setSelectedExitOption(flightRoute.exitOption)
        }
    }

    const prepDestination = () => {
        if (flightRoute.targetLocationId) {
            setTargetLocation(pointsOfInterestMap[flightRoute.targetLocationId]);
        }
    }

    const resetAddStop = () => {
        setSecondaryRouteEditIndex(0);
        setSecondaryRouteSelected(null);

    }

    const resetStart = () => {
        setSelectedStartOption(null);

    }

    const resetSpeed = () => {
        setSelectedSpeedOption(null);
    }

    const resetExit = () => {
        setSelectedExitOption(null);
    }

    const resetDestination = () => {
        setTargetLocation(null);
    }

    const showFlightSummarySidebar = () => {
        if (state === FlightPathDecisionState.SELECT_EXIT || state === FlightPathDecisionState.SELECT_START || state === FlightPathDecisionState.SELECT_SPEED) {
            return true;
        }
        else {
            return false;
        }
    }

    const resetValues = () => {
        resetAddStop();
        resetDestination();
        resetExit();
        resetSpeed();
        resetStart();
        setCanJumpToSummary(false);
        setFlightPathName("");
        setFlightRoute(DEFAULT_FLIGHT_PATH);
        setSelectedFlightPath(null);
        setState(FlightPathDecisionState.SELECT_FLIGHT_PATTERN);
    }


    return (
        <FlightPathCreationContextProvider flightRoute={flightRoute}>
            <div style={{ display: 'flex', width: '100%', height: '100%', zIndex: 1 }} >
                {state === FlightPathDecisionState.SELECT_FLIGHT_PATTERN &&
                    <SelectPath
                        navigationPathOptions={props.possibleFlightPatterns}
                        onBack={() => {
                            resetValues();
                            props.onBack();
                        }}
                        updateSelectedOption={(option) => {
                            if (option === ADD_NEW_ID) {
                                setSelectedFlightPath('new');
                            }
                            else {
                                setSelectedFlightPath(props.possibleFlightPatterns.find((each) => each.id === option) || 'new');
                            }
                        }}
                        allowContinue={selectedFlightPath !== null}
                        selectedOption={selectedFlightPath === 'new' ? ADD_NEW_ID : selectedFlightPath?.id}
                        continueToNextStep={() => {
                            if (selectedFlightPath === 'new') {
                                setFlightPathName("");
                                setFlightRoute(DEFAULT_FLIGHT_PATH);
                                setSelectedFlightPath(null);
                                prepDestination();
                                setState(FlightPathDecisionState.SELECT_DESTINATION);
                            }
                            else {
                                selectedFlightPath && setFlightRoute({ ...selectedFlightPath });
                                selectedFlightPath && setState(FlightPathDecisionState.SUMMARY);
                            }
                        }}
                        canJumpToSummary={selectedFlightPath && selectedFlightPath !== 'new' || false}
                    />
                }
                {state === FlightPathDecisionState.SELECT_SECONDARY_ROUTE &&
                    <AddStop
                        destinationOptions={pointsOfInterest.filter((each) => {
                            return each.isVisible &&
                                each.id !== flightRoute.targetLocationId &&
                                !hasSecondaryLocationMap[each.id]
                        })}
                        allowContinue={secondaryRouteSelected?.id !== undefined}
                        selectedOption={secondaryRouteSelected?.id}
                        onCancel={() => {
                            resetAddStop()
                            setState(FlightPathDecisionState.SUMMARY)
                        }}
                        updateSelectedOption={(option) => {
                            const location = pointsOfInterestMap[option];
                            setSecondaryRouteSelected(location);
                        }}
                        continueToNextStep={() => {
                            const flightPath = { ...flightRoute };
                            flightPath.secondaryRouteOptions.splice(secondaryRouteEditIndex, 0, { targetLocationId: secondaryRouteSelected?.id || "" })
                            setFlightRoute(flightPath);
                            resetAddStop();
                            setState(FlightPathDecisionState.SUMMARY)
                        }}
                        canJumpToSummary={true}
                    />
                }
                {state === FlightPathDecisionState.SELECT_START &&
                    <SelectStartType navigationStartOptions={navigationStartOptions}
                        updateSelectedOption={(option) => {
                            setSelectedStartOption(startOptionMap[option]);
                        }}
                        allowContinue={selectedStartOption?.name !== undefined}
                        selectedOption={selectedStartOption?.name}
                        onBack={() => {

                            resetStart();
                            prepDestination();
                            setState(FlightPathDecisionState.SELECT_DESTINATION)
                        }}
                        canJumpToSummary={canJumpToSummary}
                        continueToNextStep={() => {
                            const flightPath = { ...flightRoute };
                            flightPath.startOption = selectedStartOption || DEFAULT_FLIGHT_PATH.startOption;
                            setFlightRoute(flightPath);
                            resetStart();
                            prepSpeed();
                            if (canJumpToSummary) {
                                setState(FlightPathDecisionState.SUMMARY);
                            }
                            else {
                                setState(FlightPathDecisionState.SELECT_SPEED);
                            }

                        }} />}

                {state === FlightPathDecisionState.SELECT_SPEED &&
                    <SelectSpeedType navigationSpeedOptions={navigationSpeedOptions}
                        updateSelectedOption={(option) => {

                            setSelectedSpeedOption(speedOptionMap[option]);

                        }} allowContinue={selectedSpeedOption?.name !== undefined}
                        onBack={() => {
                            resetSpeed();
                            prepStart();
                            setState(FlightPathDecisionState.SELECT_START)
                        }}
                        selectedOption={selectedSpeedOption?.name}
                        continueToNextStep={() => {
                            const flightPath = { ...flightRoute };
                            flightPath.speedOption = selectedSpeedOption || DEFAULT_FLIGHT_PATH.speedOption;
                            setFlightRoute(flightPath);
                            resetSpeed();
                            prepExit();
                            if (canJumpToSummary) {
                                setState(FlightPathDecisionState.SUMMARY);
                            }
                            else {
                                setState(FlightPathDecisionState.SELECT_EXIT);
                            }
                        }}
                        canJumpToSummary={canJumpToSummary}
                    />}
                {state === FlightPathDecisionState.SELECT_EXIT &&
                    <SelectEndType navigationExitOptions={navigationExitOptions}
                        updateSelectedOption={(option) => {
                            setSelectedExitOption(exitOptionMap[option]);
                        }}
                        allowContinue={selectedExitOption?.name !== undefined}
                        onBack={() => {
                            resetExit();
                            prepSpeed();
                            setState(FlightPathDecisionState.SELECT_SPEED)
                        }}
                        selectedOption={selectedExitOption?.name}
                        continueToNextStep={() => {
                            const flightPath = { ...flightRoute };
                            flightPath.exitOption = selectedExitOption || DEFAULT_FLIGHT_PATH.exitOption;
                            setFlightRoute(flightPath);
                            resetExit();
                            setCanJumpToSummary(true);
                            setState(FlightPathDecisionState.SUMMARY)
                        }}
                        canJumpToSummary={true}
                    />
                }
                {state === FlightPathDecisionState.SELECT_DESTINATION &&
                    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <SelectDestination
                                destinationOptions={pointsOfInterest.filter((each) => each.isVisible && JSON.stringify(each.location) !== JSON.stringify(currentLocation)).concat(props.flightSet.borders as any[])}
                                updateSelectedOption={(option) => {
                                    if (pointsOfInterestMap[option]) {
                                        setTargetLocation(pointsOfInterestMap[option]);
                                    }
                                    else if (borderIdMap[option]) {
                                        setTargetLocation(borderIdMap[option]);
                                    }
                                    else {
                                        setTargetLocation(null);
                                    }

                                }}
                                selectedOption={targetLocation?.id}
                                allowContinue={targetLocation?.id !== undefined}
                                onCancel={() => {
                                    resetDestination();
                                    setState(FlightPathDecisionState.SELECT_FLIGHT_PATTERN);
                                }}
                                continueToNextStep={() => {
                                    const flightPath = { ...flightRoute };
                                    flightPath.targetLocationId = targetLocation?.id || DEFAULT_FLIGHT_PATH.targetLocationId;
                                    if (pointsOfInterestMap[flightPath.targetLocationId]) {
                                        flightPath.isBorder = false;
                                    }
                                    else {
                                        flightPath.isBorder = true;
                                    }
                                    setFlightRoute(flightPath);
                                    prepStart();
                                    resetDestination();

                                    if (canJumpToSummary) {
                                        setState(FlightPathDecisionState.SUMMARY)
                                    }
                                    else {
                                        setState(FlightPathDecisionState.SELECT_START)
                                    }
                                }}
                                canJumpToSummary={canJumpToSummary}

                            />
                        </div>
                        <div>
                            <LocationSidebar
                                location={targetLocation ? targetLocation : undefined}
                                currentLocation={currentLocation}
                            />
                        </div>
                    </div>
                }

                {state === FlightPathDecisionState.NAME_SAVED_ROUTE &&
                    <div style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Label>What is the name of your flight path?</Label>
                        <div style={{ display: 'flex', gap: "1rem" }}>
                            <Input type="text" value={flightPathName} onChange={(e) => setFlightPathName(e.target.value)} />
                            <Button
                                onClick={() => setState(FlightPathDecisionState.SUMMARY)}
                            >
                                Back
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => { props.onSaveRoute({ ...flightRoute, name: flightPathName, id: Math.floor(Math.random() * 1000000) + "flightpath" }) }}
                                disabled={!flightPathName.length || props.possibleFlightPatterns.find((each) => each.name === flightPathName) !== undefined}>
                                Save
                            </Button>
                        </div>

                    </div>
                }

                {state === FlightPathDecisionState.SUMMARY &&
                    <FlexFlightPathSummary
                        maxImageX={flightSet.imageMaxX}
                        maxImageY={flightSet.imageMaxY}
                        borders={flightSet.borders}
                        nextBtnText={props.saving ? "Save" : "Engage"}
                        nextBtnAction={() => props.saving ? setState(FlightPathDecisionState.NAME_SAVED_ROUTE) : props.onExecuteRoute(flightRoute)}
                        allowNext={true}
                        flightPath={flightRoute}
                        possibleLocations={pointsOfInterest}
                        currentLocation={currentLocation}
                        currentLocationName={props.currentLocationName}
                        currentLocationIconUrl={props.currentLocationUrl || props.selfUrl}
                        backgroundImg={flightSet.backgroundImg}
                        handleClose={() => setState(FlightPathDecisionState.SELECT_FLIGHT_PATTERN)}
                        handleEditTarget={() => {
                            prepDestination();
                            setState(FlightPathDecisionState.SELECT_DESTINATION)
                        }}
                        handleAddLocation={(index) => {
                            setSecondaryRouteEditIndex(index);
                            setState(FlightPathDecisionState.SELECT_SECONDARY_ROUTE)
                        }}
                        handleEditSecondaryTarget={() => console.log("Not supported")}
                        handleSpeedOptionChange={() => {
                            prepSpeed();
                            setState(FlightPathDecisionState.SELECT_SPEED);
                        }}
                        handleStartOptionChange={() => {
                            prepStart();
                            setState(FlightPathDecisionState.SELECT_START)
                        }}
                        handleStopOptionChange={() => {
                            prepExit();
                            setState(FlightPathDecisionState.SELECT_EXIT)
                        }}
                        handleUpdateFlightPath={(route) => {
                            setFlightRoute(route);
                        }}
                    />

                }
                {showFlightSummarySidebar() && <div style={{ flexGrow: 0 }}>
                    <PathSummarySidebar
                        flightSet={flightSet}
                        flightPath={flightRoute}
                        possibleLocations={pointsOfInterest.concat(flightSet.borders as any[])}
                        currentLocation={currentLocation} />
                </div>}
                {state === FlightPathDecisionState.SELECT_SECONDARY_ROUTE && <div style={{ flexGrow: 0 }}>
                    <LocationSidebar
                        addVersion
                        location={secondaryRouteSelected ? pointsOfInterestMap[secondaryRouteSelected?.id] : undefined}
                        currentLocation={currentLocation}
                    />
                </div>}
                {state === FlightPathDecisionState.SELECT_FLIGHT_PATTERN && <div style={{ flexGrow: 0 }}>
                    {(selectedFlightPath === 'new' || !selectedFlightPath) ? <BlankSidebar /> :
                        <PathSummarySidebar
                            flightSet={flightSet}
                            flightPath={selectedFlightPath}
                            possibleLocations={pointsOfInterest.concat(flightSet.borders as any[])}
                            currentLocation={currentLocation} />}

                </div>}

            </div>
        </FlightPathCreationContextProvider>

    )
}