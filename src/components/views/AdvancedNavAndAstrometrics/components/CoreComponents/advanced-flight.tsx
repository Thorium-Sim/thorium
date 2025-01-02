import React from "react"
import "./advanced-flight.css"
import { Modal, ModalBody } from "reactstrap"
import { EngineStatus } from "../../types"
import { BasicCoordinate, FlightSet, NavigationRoute } from "containers/FlightDirector/FlightSets/types"
import { PositionMap } from "containers/FlightDirector/FlightSets/Map"
import { CoreAdvancedNavigationAddPoi } from "containers/FlightDirector/FlightSets/create-flight-set/steps/forms/add-poi"
import { CoreAdvancedNavigationMovePosition } from "./move-position"
import { formatSecondsToTime } from "containers/FlightDirector/FlightSets/Time"

export type CoreAdvancedNavigationProps = {
    engineStatus: EngineStatus
    currentLocation: BasicCoordinate
    flightSets: FlightSet[];
    currentFlightSet?: FlightSet;
    currentFlightPath?: NavigationRoute
    currentETA?: number
    currentLocationName?: string
    currentLocationUrl?: string
    possibleFlightPaths: NavigationRoute[]
    coolantLevel: number
    heatLevel: number
    showEta: boolean
    showFlightSet: boolean
    colorScheme?: string;
    onUpdateFlightSet: (flightSet: FlightSet) => void;
    onShowFlightSet: (show: boolean) => void;
    onUpdateEta: (eta: number) => void;
    onShowEta: (show: boolean) => void;
    onEmergencyStop: () => void;
    onEngineFlux: () => void;
    onCoolantLevelChange: (coolantLevel: number) => void;
    onHeatLevelChange: (heatLevel: number) => void;
    onOverrideLocation: (location: BasicCoordinate, currentLocationUrl?: string, currentLocationName?: string) => void;
    onUpdateCurrentFlightPath: (flightPath: NavigationRoute) => void;
    onUpdateCurrentFlightSet: (flightSet: FlightSet) => void;
}

export const CoreAdvancedNavigation: React.FC<CoreAdvancedNavigationProps> = (props) => {
    const [shownFlightSet, setShownFlightSet] = React.useState<string>(props.currentFlightSet?.id || "");
    const [changeLocationDialogOpen, setChangeLocationDialogOpen] = React.useState(false);
    const [addPOIDialogOpen, setAddPOIDialogOpen] = React.useState(false);

    const handleFullReset = (flightSet: FlightSet) => {
        props.onUpdateCurrentFlightSet(flightSet);
        props.onOverrideLocation(flightSet.defaultStartingLocation);
        props.onShowFlightSet(false);
        props.onShowEta(false);
    }
    const handleChangeLocationClick = () => {
        setChangeLocationDialogOpen(true);
    }

    const handleEtaClick = () => {
        let hours = prompt("Please enter the hours");
        if (hours === null || hours === undefined || hours === "") {
            return;
        }
        let minutes = prompt("Please enter the minutes");
        if (minutes === null || minutes === undefined || minutes === "") {
            return;
        }
        let seconds = prompt("Please enter the seconds");
        if (seconds === null || seconds === undefined || seconds === "") {
            return;
        }
        if (isNaN(Number(hours)) || isNaN(Number(minutes)) || isNaN(Number(seconds))) {
            alert("Please enter a valid number");
            return;
        }
        const eta = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
        props.onUpdateEta(eta);
    }

    const currentlySelectedFlightSet = React.useMemo(() => {
        return props.flightSets.find(flightSet => flightSet.id === shownFlightSet);
    }, [shownFlightSet, props.flightSets, props.currentFlightSet]);


    return <div className={`no-bottom-label-margin ${props.colorScheme && 'color-scheme-white'}`} style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
            <label>Flight Sets</label>
            <select name="flight-sets" id="flight-sets" value={shownFlightSet} onChange={(event) => {
                setShownFlightSet(event.target.value);
            }}>
                <option value={""}>Select a flight set</option>
                {props.flightSets.map(flightSet => <option value={flightSet.id}>{flightSet.name}</option>)}

            </select>
            {shownFlightSet && <React.Fragment>
                <label htmlFor="current">Current</label>
                <input disabled={props.currentFlightSet?.id === shownFlightSet}
                    type="checkbox" id="current"
                    checked={props.currentFlightSet?.id === shownFlightSet}
                    onChange={(event) => {
                        if (event.target.checked) {
                            const flightSet = props.flightSets.find(flightSet => flightSet.id === shownFlightSet);
                            if (flightSet) {
                                handleFullReset(flightSet);
                            }
                        }
                    }} />
                <label htmlFor="show">Show</label>
                <input disabled={props.currentFlightSet?.id !== shownFlightSet} type="checkbox" id="show" checked={props.showFlightSet} onChange={(event) => {
                    props.onShowFlightSet(event.target.checked);
                }} />
            </React.Fragment>}
        </div>
        <div style={{ flexGrow: 1, display: 'flex', overflow: 'auto' }}>
            {shownFlightSet && <React.Fragment>
                <div style={{ flexGrow: 1 }}>
                    <PositionMap
                        imageUrl={currentlySelectedFlightSet?.backgroundImg || ""}
                        primaryLocation={props.currentLocation}
                    />

                </div>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto' }}>
                    <div>Points of Interest</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Show</th>
                                <th>Info Bas/Det/Sec</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentlySelectedFlightSet?.pointsOfInterest.map(poi => <tr>
                                <td><img src={poi.iconUrl} height={"30px"} draggable={false} alt={poi.name} /></td>
                                <td>{poi.name}</td>
                                <td><input type="checkbox" disabled={poi.isVisible} checked={poi.isVisible} onChange={(event) => {
                                    const indexOfPointOfInterest = currentlySelectedFlightSet.pointsOfInterest.findIndex(each => each.id === poi.id);
                                    let newFlightSet = JSON.parse(JSON.stringify({ ...currentlySelectedFlightSet })) as FlightSet;
                                    newFlightSet.pointsOfInterest[indexOfPointOfInterest].isVisible = event.target.checked;
                                    props.onUpdateFlightSet(newFlightSet);
                                }} /></td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <label title={poi.information.basicInformation} htmlFor="show-basic">B</label>
                                        <input title={poi.information.basicInformation} type="checkbox" id="show-basic" checked={poi.information.hasBasicInformation} onChange={(event) => {
                                            const indexOfPointOfInterest = currentlySelectedFlightSet.pointsOfInterest.findIndex(each => each.id === poi.id);
                                            let newFlightSet = JSON.parse(JSON.stringify({ ...currentlySelectedFlightSet })) as FlightSet;
                                            let newLocation = { ...newFlightSet.pointsOfInterest[indexOfPointOfInterest].information };
                                            newLocation.hasBasicInformation = event.target.checked;
                                            newFlightSet.pointsOfInterest[indexOfPointOfInterest].information = newLocation;
                                            props.onUpdateFlightSet(newFlightSet);
                                        }} />
                                        <label title={poi.information.detailedInformation} htmlFor="show-detailed">D</label>
                                        <input title={poi.information.detailedInformation} type="checkbox" id="show-detailed" checked={poi.information.hasDetailedInformation} onChange={(event) => {
                                            const indexOfPointOfInterest = currentlySelectedFlightSet.pointsOfInterest.findIndex(each => each.id === poi.id);
                                            let newFlightSet = JSON.parse(JSON.stringify({ ...currentlySelectedFlightSet })) as FlightSet;
                                            let newLocation = { ...newFlightSet.pointsOfInterest[indexOfPointOfInterest].information };
                                            newLocation.hasDetailedInformation = event.target.checked
                                            newFlightSet.pointsOfInterest[indexOfPointOfInterest].information = newLocation;
                                            props.onUpdateFlightSet(newFlightSet);
                                        }} />
                                        <label title={poi.information.secretInformation} htmlFor="show-secret">S</label>
                                        <input title={poi.information.secretInformation} type="checkbox" id="show-secret" checked={poi.information.hasSecretInformation} onChange={(event) => {
                                            const indexOfPointOfInterest = currentlySelectedFlightSet.pointsOfInterest.findIndex(each => each.id === poi.id);
                                            let newFlightSet = JSON.parse(JSON.stringify({ ...currentlySelectedFlightSet })) as FlightSet;
                                            let newLocation = { ...newFlightSet.pointsOfInterest[indexOfPointOfInterest].information };
                                            newLocation.hasSecretInformation = event.target.checked
                                            newFlightSet.pointsOfInterest[indexOfPointOfInterest].information = newLocation;
                                            props.onUpdateFlightSet(newFlightSet);
                                        }} />
                                    </div>
                                </td>
                            </tr>)}
                            <tr>
                                <td colSpan={4}>
                                    <button onClick={() => setAddPOIDialogOpen(true)}>Add Point of Interest</button>
                                    <Modal isOpen={addPOIDialogOpen} toggle={() => setAddPOIDialogOpen(!addPOIDialogOpen)}>
                                        <ModalBody>
                                            {currentlySelectedFlightSet &&
                                                <CoreAdvancedNavigationAddPoi
                                                    flightSet={currentlySelectedFlightSet}
                                                    onAddPOI={(poi) => {
                                                        const flightSet = { ...currentlySelectedFlightSet };
                                                        flightSet.pointsOfInterest.push(poi);
                                                        props.onUpdateFlightSet(flightSet);
                                                        setAddPOIDialogOpen(false);
                                                    }}
                                                />}
                                        </ModalBody>
                                    </Modal>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </React.Fragment>}
        </div>
        {shownFlightSet && props.currentFlightSet && props.currentFlightSet?.id === shownFlightSet && <div style={{ flexBasis: '30px', display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}>
            <button disabled={props.engineStatus === EngineStatus.STOPPED || props.engineStatus === EngineStatus.STARTUP} onClick={props.onEngineFlux}>{props.engineStatus === EngineStatus.FLUX ? "Cancel Flux" : "Flux"}</button>
            <button disabled={props.engineStatus === EngineStatus.STOPPED || props.engineStatus === EngineStatus.STARTUP} onClick={props.onEmergencyStop}>Stop</button>
            <button onClick={handleChangeLocationClick}>Change Location</button>
            <Modal size="lg" isOpen={changeLocationDialogOpen} toggle={() => setChangeLocationDialogOpen(!changeLocationDialogOpen)}>
                <ModalBody>
                    <CoreAdvancedNavigationMovePosition
                        currentLocation={props.currentLocation}
                        flightSet={props.currentFlightSet}
                        onChangeLocation={(location, currentLocationUrl, currentLocationName) => {
                            props.onOverrideLocation(location, currentLocationUrl, currentLocationName);
                            setChangeLocationDialogOpen(false);
                        }} />
                </ModalBody>
            </Modal>
            <label htmlFor="eta">ETA</label>
            <div onClick={handleEtaClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minWidth: '5rem', backgroundColor: 'yellow', textAlign: 'center', color: 'black' }}>{props.currentETA ? formatSecondsToTime(props.currentETA) : 'None'}</div>
            <label htmlFor="show-eta">Show ETA</label>
            <input disabled={props.engineStatus === EngineStatus.STOPPED} type="checkbox" id="show-eta" checked={props.showEta} onChange={(event) => {
                props.onShowEta(event.target.checked);
            }} />
        </div>}

    </div>



}