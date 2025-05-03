import { BasicCoordinate, FlightSet, PointOfInterest, Probe, ProbeAssignment } from "containers/FlightDirector/FlightSets/types";
import { countProbeFuelCells, getAvailablePointsOfInterest, getProbeCurrentLocation, PROBE_IMAGE_MAP } from "./helpers";
import CircuitBackground from './circut-background.png'

import React from "react";
import { ProbeAssignmentForm } from "./components/ProbeAssignment";
import { RangeShowingMap, SelectableLocationMultiIconMap } from "containers/FlightDirector/FlightSets/Map";
import { LocationSidebar } from "./components/Sidebars/Location";
import { ProbeOverviewSidebar } from "./components/Sidebars/ProbeOverview";
import "./styles.css"

export type AstrometricsProps = {
    currentFlightSet?: FlightSet;
    showFlightSet: boolean;
    selfIcon: string;
    currentLocation: BasicCoordinate;
    availableProbes: Probe[];
    probeAssignments: ProbeAssignment[];
    onAssignProbe: (probeId: string, poiId: string) => void;
}

export type AstrometricsState = {
    selectedPOI?: PointOfInterest | null
    pageState: PageState
    selectedProbe?: Probe | null
}

export enum PageState {
    OVERVIEW,
    ASSIGN_PROBE
}

const getTotalAvailablePointsOfInterest = (currentLocation: BasicCoordinate, probe: Probe, probeAssignments: ProbeAssignment[], flightSet: FlightSet) => {
    const currentProbeLocation = getProbeCurrentLocation(currentLocation, probe, probeAssignments);
    const remainingFuelCellCount = countProbeFuelCells(probe, probeAssignments.find((each) => each.probeId === probe.id));
    return getAvailablePointsOfInterest(currentProbeLocation, flightSet.pointsOfInterest, flightSet.probeLaunchRangeRadius * remainingFuelCellCount);
}

export const Astrometrics: React.FC<AstrometricsProps> = (props) => {
    const [pageState, setPageState] = React.useState<PageState>(PageState.OVERVIEW);
    const [selectedPOI, setSelectedPOI] = React.useState<PointOfInterest>();
    const [selectedProbe, setSelectedProbe] = React.useState<Probe>();
    const [showProbeRange, setShowProbeRange] = React.useState<boolean>(false);

    return <div className={'ripple-pulse'} style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <img alt="" draggable={false} className='flux-image' style={{ width: "100%", height: '100%', zIndex: 0, position: 'absolute', top: 0, left: 0 }} src={CircuitBackground} />
        <img alt="" draggable={false} className='flux-image' style={{ width: "100%", height: '100%', zIndex: 0, position: 'absolute', top: 0, left: 0 }} src={CircuitBackground} />
        {(!props.currentFlightSet || !props.showFlightSet) && <h1 style={{ position: 'absolute', top: '45%', textAlign: 'center' }}>Now loading astrometic data</h1>}
        {props.currentFlightSet && props.showFlightSet &&
            <React.Fragment>
                {pageState === PageState.ASSIGN_PROBE && selectedProbe &&
                    <ProbeAssignmentForm
                        availablePointsOfInterest={getTotalAvailablePointsOfInterest(props.currentLocation, selectedProbe, props.probeAssignments, props.currentFlightSet)}
                        currentFuelCellCount={countProbeFuelCells(selectedProbe, props.probeAssignments.find((each) => each.probeId === selectedProbe?.id))}
                        currentProbeLocation={props.currentLocation}
                        probe={selectedProbe}
                        onCancel={() => {
                            setPageState(PageState.OVERVIEW)
                        }}
                        onAssignment={(poi) => {
                            props.onAssignProbe(selectedProbe?.id || '', poi.id);
                            setPageState(PageState.OVERVIEW)
                        }}
                    />
                }

                {pageState === PageState.OVERVIEW &&

                    <React.Fragment>

                        <div style={{ flexGrow: 1, height: '100%', zIndex: 1, margin: "2rem" }}>
                            {showProbeRange && selectedProbe ?
                                <RangeShowingMap
                                    imageUrl={props.currentFlightSet.backgroundImg}
                                    coordinate={getProbeCurrentLocation(props.currentLocation, selectedProbe, props.probeAssignments)}
                                    radius={countProbeFuelCells(selectedProbe, props.probeAssignments.find((each) => each.probeId === selectedProbe?.id)) * props.currentFlightSet.probeLaunchRangeRadius}
                                /> :
                                <SelectableLocationMultiIconMap
                                    onClick={(id) => {
                                        if (id === selectedPOI?.id) {
                                            setSelectedPOI(undefined)
                                        }
                                        else if (id) {
                                            const pointOfInterest = props.currentFlightSet?.pointsOfInterest.find((each) => each.id === id);
                                            if (pointOfInterest) {
                                                setSelectedPOI(pointOfInterest)
                                            }

                                        }

                                    }}
                                    imageUrl={props.currentFlightSet.backgroundImg}
                                    selectedPOI={selectedPOI}
                                    locations={props.currentFlightSet.pointsOfInterest.filter((each) => each.isVisible).map((each) => {
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
                                        imgUrl: props.selfIcon,
                                        location: {
                                            x: props.currentLocation.x,
                                            y: props.currentLocation.y
                                        }
                                    }}
                                    icons={props.probeAssignments.map((each) => {
                                        const probe = props.availableProbes.find((probe) => probe.id === each.probeId);
                                        if (probe) {
                                            return {
                                                imgUrl: PROBE_IMAGE_MAP[probe.type],
                                                location: each.currentLocation
                                            }
                                        }
                                        return undefined;
                                    }).filter((each) => each !== undefined) as { imgUrl: string, location: BasicCoordinate }[]}

                                />
                            }

                        </div>
                        <div style={{ flexBasis: "300px", height: '100%', zIndex: 1, padding: "1.5rem", paddingLeft: '0px' }}>
                            {selectedPOI ?
                                <LocationSidebar
                                    location={selectedPOI} />
                                :
                                <ProbeOverviewSidebar
                                    onShowRange={(probeId) => {
                                        setSelectedProbe(props.availableProbes.find((each) => each.id === probeId))
                                        setShowProbeRange(true)
                                    }}
                                    onRemoveRange={() => {
                                        setSelectedProbe(undefined);
                                        setShowProbeRange(false)
                                    }}
                                    availableProbes={props.availableProbes}
                                    probeAssignments={props.probeAssignments}
                                    onAssignProbe={(probeId) => {
                                        setSelectedProbe(props.availableProbes.find((each) => each.id === probeId))
                                        setPageState(PageState.ASSIGN_PROBE)
                                    }}

                                />
                            }

                        </div>
                    </React.Fragment>
                }
            </React.Fragment>
        }

    </div>
}