import React from 'react';
import { FlightContextProvider } from './components/Contexts/OverallFlightContexts';
import CircuitBackground from './circut-background.png'
import { OverviewSidebar } from './components/Sidebars/Overview';
import { LocationSidebar } from './components/Sidebars/Location';
import { EngineStatus } from './types';
import { BasicCoordinate, FlightSet, NamedNavigationRoute, NavigationRoute, PointOfInterest } from 'containers/FlightDirector/FlightSets/types';
import { FlightPathDecision } from './components/FlightPathDecision';
import { SelectablePositionMap } from 'containers/FlightDirector/FlightSets/Map';
import "./styles.css"
export type AdvancedNavigationProps = {
    hasEmergencyPower: boolean
    engineStatus: EngineStatus
    currentLocation: BasicCoordinate
    currentFlightSet?: FlightSet;
    currentFlightPath?: NavigationRoute
    currentETA?: number
    currentLocationName?: string
    currentLocationUrl?: string
    remainingStartupTime?: number
    possibleFlightPaths: NamedNavigationRoute[]
    selfIcon: string
    coolantLevel: number
    heatLevel: number
    showEta: boolean
    showFlightSet: boolean
    onEmergencyStop: () => void;
    onCoolantFlush: () => void;
    onEngageFlightPath: (flightPath: NavigationRoute) => void;
    onResumeFlightPath: () => void;
    onSaveFlightPath: (flightPath: NamedNavigationRoute) => void;
}

export type AdvancedNavigationState = {
    selectedPOI?: PointOfInterest | null
    pageState: PageState
    saving: boolean
}

export enum PageState {
    OVERVIEW,
    CREATE_PATH
}


export class AdvancedNavigation extends React.Component<AdvancedNavigationProps, AdvancedNavigationState> {
    state: AdvancedNavigationState = {
        pageState: PageState.OVERVIEW,
        saving: false,
    };

    render() {
        return <div className={this.props.engineStatus !== EngineStatus.STOPPED && 'ripple-pulse' || ''} style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {(!this.props.currentFlightSet || !this.props.showFlightSet) && <h1 style={{ position: 'absolute', top: '45%', textAlign: 'center' }}>Now loading flight data</h1>}
            {this.props.currentFlightSet && this.props.showFlightSet ? <FlightContextProvider
                backgroundImage={this.props.currentFlightSet.backgroundImg}
                currentLocation={this.props.currentLocation}
                navigationExitOptions={this.props.currentFlightSet.exitOptions}
                navigationSpeedOptions={this.props.currentFlightSet.speedOptions}
                navigationStartOptions={this.props.currentFlightSet.startOptions}
                borders={this.props.currentFlightSet.borders}
                flightSet={this.props.currentFlightSet}
                pointsOfInterest={this.props.currentFlightSet.pointsOfInterest}>
                {this.state.pageState === PageState.CREATE_PATH &&
                    <FlightPathDecision
                        flightSet={this.props.currentFlightSet}
                        currentLocation={this.props.currentLocation}
                        saving={this.state.saving}
                        possibleFlightPatterns={this.props.possibleFlightPaths}
                        onSaveRoute={(route) => { this.props.onSaveFlightPath(route); this.setState({ pageState: PageState.OVERVIEW }) }}
                        onBack={() => { this.setState({ pageState: PageState.OVERVIEW }) }}
                        selfUrl={this.props.selfIcon}
                        currentLocationName={this.props.currentLocationName}
                        currentLocationUrl={this.props.currentLocationUrl}
                        onExecuteRoute={(route) => { this.props.onEngageFlightPath(route); this.setState({ pageState: PageState.OVERVIEW }) }} />
                }

                {this.state.pageState === PageState.OVERVIEW &&
                    <React.Fragment>
                        <div style={{ flexGrow: 1, height: '100%', zIndex: 1, margin: "2rem" }}>
                            <SelectablePositionMap
                                onClick={(id) => {
                                    if (id === this.state.selectedPOI?.id) {
                                        this.setState({ selectedPOI: null })
                                    }
                                    else if (id) {
                                        const pointOfInterest = this.props.currentFlightSet?.pointsOfInterest.find((each) => each.id === id);
                                        if (pointOfInterest) {
                                            this.setState({ selectedPOI: pointOfInterest })
                                        }
                                    }
                                }}
                                imageUrl={this.props.currentFlightSet.backgroundImg}
                                selectedPOI={this.state.selectedPOI || undefined}
                                locations={this.props.currentFlightSet.pointsOfInterest.filter((each) => each.isVisible).map((each) => {
                                    return {
                                        x: each.location.x,
                                        y: each.location.y,
                                        color: 'white',
                                        id: each.id,
                                        name: each.name,
                                        showName: each.showName || undefined
                                    }
                                })}
                                shipIcon={{
                                    imgUrl: this.props.selfIcon,
                                    location: {
                                        x: this.props.currentLocation.x,
                                        y: this.props.currentLocation.y
                                    }
                                }}

                            />




                        </div>
                        <div style={{ flexBasis: "300px", height: '100%', zIndex: 1, margin: "1.5rem", marginLeft: '0px' }}>
                            {this.state.selectedPOI ?
                                <LocationSidebar
                                    location={this.state.selectedPOI} />
                                :
                                <OverviewSidebar
                                    onEmergencyStop={this.props.onEmergencyStop}
                                    onAddFlightPath={() => { this.setState({ pageState: PageState.CREATE_PATH, saving: true }) }}
                                    onCoolantFlush={this.props.onCoolantFlush}
                                    onEngageFlightPath={() => { this.setState({ pageState: PageState.CREATE_PATH, saving: false }) }}
                                    onResumeFlightPath={this.props.onResumeFlightPath}
                                    coolantLevel={this.props.coolantLevel}
                                    heatLevel={this.props.heatLevel}
                                    currentFlightPath={this.props.currentFlightPath}
                                    engineStatus={this.props.engineStatus}
                                    startupRemaining={this.props.remainingStartupTime}
                                    totalStartupTime={this.props.currentFlightPath?.startOption.secondsForStartup}
                                    flightData={undefined}
                                    eta={this.props.showEta ? this.props.currentETA : undefined}

                                />
                            }

                        </div>
                    </React.Fragment>
                }
            </FlightContextProvider>
                :
                <React.Fragment />
            }
            <img alt='' className='flux-image' style={{ width: "100%", height: '100%', zIndex: 0, position: 'absolute', top: 0, left: 0 }} src={CircuitBackground} />
            <img className='flux-image' style={{ width: "100%", height: '100%', zIndex: 0, position: 'absolute', top: 0, left: 0 }} src={CircuitBackground} alt='' />



        </div>
    }
}