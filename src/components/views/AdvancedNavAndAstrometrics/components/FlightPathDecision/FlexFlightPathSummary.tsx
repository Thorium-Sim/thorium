import { Button, Modal, ModalBody } from "reactstrap";
import { HexButton } from "../HexButton";
import styles from './styles.module.css';
import { HexFlightPathing } from "./hex-pathing";
import { RiskIndex } from "../RatingBar/risk-index";
import { SpeedIndex } from "../RatingBar/speed-index";
import { generateBorderCoords, generateFullRiskIndex, generateSpeedIndex, isMapBorder } from "../../helpers";
import React, { useMemo, useState } from "react";
import { MapBorder, NavigationRoute, PointOfInterest } from "containers/FlightDirector/FlightSets/types";
import { generateBorderIdMap, generateFlightPathCoordinates, generateLocationIdMap } from "../helpers";
import { MemoedPreviewMap } from "containers/FlightDirector/FlightSets/Map";

export type FlexFlightPathSummaryProps = {
    nextBtnText: string;
    allowNext: boolean;
    nextBtnAction: () => void;
    flightPath: NavigationRoute;
    possibleLocations: PointOfInterest[]
    currentLocation: { x: number, y: number }
    currentLocationName?: string
    currentLocationIconUrl: string;
    borders: MapBorder[];
    maxImageX: number;
    maxImageY: number;
    backgroundImg: string;
    handleEditTarget: () => void;
    handleUpdateFlightPath: (flightPath: NavigationRoute) => void;
    handleEditSecondaryTarget: (index: number) => void;
    handleAddLocation: (index: number) => void;
    handleStartOptionChange: () => void;
    handleSpeedOptionChange: () => void;
    handleStopOptionChange: () => void;
    handleClose: () => void;

}



export const FlexFlightPathSummary: React.FC<FlexFlightPathSummaryProps> = (props) => {
    const [modal, setModal] = useState<boolean>(false);
    const toggle = () => setModal(!modal);

    const locationIdMap = React.useMemo(() => {
        return generateLocationIdMap(props.possibleLocations)
    }, [props.possibleLocations])

    const borderIdMap = useMemo(() => {
        return generateBorderIdMap(props.borders);
    }, [props.borders])

    const locationCoords = React.useMemo(() => {
        if (!props.flightPath.isBorder) {
            return locationIdMap[props.flightPath.targetLocationId].location as { x: number, y: number }
        }
        else {
            return generateBorderCoords(props.currentLocation, borderIdMap[props.flightPath.targetLocationId], props.maxImageX, props.maxImageY)
        }
    }, [props.flightPath.targetLocationId, locationIdMap])

    const locationRiskIndex = React.useMemo(() => {
        if (props.flightPath.isBorder) {
            return borderIdMap[props.flightPath.targetLocationId].riskIndex
        }
        else {
            return locationIdMap[props.flightPath.targetLocationId].riskIndex
        }
    }, [props.flightPath.targetLocationId, locationIdMap, borderIdMap])

    const speedIndex = React.useMemo(() => {

        return generateSpeedIndex(props.currentLocation, locationCoords, props.flightPath.secondaryRouteOptions.map((each) => locationIdMap[each.targetLocationId]), props.flightPath.speedOption)
    }, [props.currentLocation, props.flightPath, locationIdMap]);

    const speedIndexColorData = React.useMemo(() => {
        if (speedIndex > 1.1) {
            return { color: 'success', txt: 'Improved', duration: 4000 }
        }
        else if (speedIndex < 0.5) {
            return { color: 'warning', txt: 'Reduced', duration: 8000 }
        }
        else {
            return { color: 'info', txt: 'Nominal', duration: 6000 }
        }
    }, [speedIndex])

    const riskIndex = React.useMemo(() => {
        return generateFullRiskIndex(props.flightPath.isBorder ? borderIdMap[props.flightPath.targetLocationId] : locationIdMap[props.flightPath.targetLocationId], props.flightPath.startOption, props.flightPath.speedOption, props.flightPath.exitOption, props.flightPath.secondaryRouteOptions.map((each) => locationIdMap[each.targetLocationId]))
    }, [locationIdMap, props.flightPath.targetLocationId, props.flightPath.startOption, props.flightPath.speedOption, props.flightPath.exitOption, props.flightPath.secondaryRouteOptions])

    const riskIndexColorData = React.useMemo(() => {
        if (riskIndex > 3.5) {
            return { color: 'danger', txt: 'High' }
        }
        else if (riskIndex > 2) {
            return { color: 'warning', txt: 'Moderate' }
        }
        else {
            return { color: 'success', txt: 'Low' }
        }
    }, [riskIndex]);





    const pathCoordinates = useMemo(() => {
        return generateFlightPathCoordinates(props.currentLocation, props.flightPath, locationIdMap, borderIdMap, props.maxImageX, props.maxImageY);
    }, [props.currentLocation, props.flightPath.targetLocationId, props.flightPath])

    return <div className={`${styles['summary2-base-flex']}`}>
        <div className={`${styles['summary2-title-area']}`}>
            <h1>Flight path summary</h1>
        </div>
        <div className={`${styles['summary2-content']}`}>
            <div className={`${styles['summary2-content-left']}`}>
                <div className={`${styles['summary2-execute-area']}`}>
                    <HexButton size="large" hover={props.allowNext} onClick={props.nextBtnAction}><h2>{props.nextBtnText}</h2></HexButton>

                </div>
                <div className={`${styles['summary2-actions-area']}`}>
                    <Button onClick={() => toggle()} style={{ width: '100%' }} color="secondary">Preview route</Button>
                    <Modal size="lg" isOpen={modal} toggle={toggle} className={`${styles['modal-overrides']}`}>
                        <ModalBody>
                            <MemoedPreviewMap
                                imageUrl={props.backgroundImg}
                                coordinates={pathCoordinates}
                                duration={speedIndexColorData.duration}
                            />

                        </ModalBody>
                    </Modal>
                    {props.flightPath.secondaryRouteOptions?.length < 3 && <Button onClick={() => props.handleAddLocation(props.flightPath.secondaryRouteOptions.length)} style={{ width: '100%' }} color="secondary">Add Stop</Button>}
                    <Button onClick={() => props.handleStopOptionChange()} style={{ width: '100%' }} color="secondary">Back</Button>
                    <Button onClick={() => props.handleClose()} style={{ width: '100%' }} color="secondary">Cancel</Button>

                </div>
            </div>

            <div className={`${styles['summary2-content-right']}`}>
                <div className={`${styles['summary2-path-area']}`}>
                    <HexFlightPathing
                        possibleLocations={props.possibleLocations.concat(props.borders as any[])}
                        flightPath={props.flightPath}
                        currentLocation={props.currentLocation}
                        currentLocationName={props.currentLocationName}
                        handleEditTarget={props.handleEditTarget}
                        handleUpdateFlightPath={props.handleUpdateFlightPath}
                        handleEditSecondaryTarget={props.handleEditSecondaryTarget}
                        handleAddLocation={props.handleAddLocation}
                        currentLocationImgUrl={props.currentLocationIconUrl}
                    />

                </div>
                <div style={{ color: 'white' }} className={`${styles['summary2-options-area']}`}>
                    <HexButton
                        id="StartOption"
                        onClick={props.handleStartOptionChange}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <img draggable={"false"} style={{ objectFit: 'scale-down', width: "75%", fontSize: 'smaller' }} src={props.flightPath.startOption.imgUrl} alt={"Target Location Icon"} />
                            <span style={{ textAlign: 'center' }}>{props.flightPath.startOption.name}</span>
                        </div>
                    </HexButton>
                    <HexButton
                        id="SpeedOption"
                        onClick={props.handleSpeedOptionChange}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <img draggable={"false"} style={{ objectFit: 'scale-down', width: "75%", fontSize: 'smaller' }} src={props.flightPath.speedOption.imgUrl} alt={"Target Location Icon"} />
                            <span style={{ textAlign: 'center' }}>{props.flightPath.speedOption.name}</span>
                        </div>
                    </HexButton>
                    <HexButton
                        id="ExitOption"
                        onClick={props.handleStopOptionChange}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <img draggable={"false"} style={{ objectFit: 'scale-down', width: "75%", fontSize: 'smaller' }} src={props.flightPath.exitOption.imgUrl} alt={"Target Location Icon"} />
                            <span style={{ textAlign: 'center' }}>{props.flightPath.exitOption.name}</span>
                        </div>
                    </HexButton>
                </div>
                <div className={`${styles['summary2-stats-area']}`}>
                    <SpeedIndex txtOverride={<h5>Speed summary - <span className={`text-${speedIndexColorData.color}`}>{speedIndexColorData.txt}</span></h5>} width="100%" rating={speedIndex} />
                    <RiskIndex txtOverride={<h5>Risk summary - <span className={`text-${riskIndexColorData.color}`}>{riskIndexColorData.txt}</span></h5>} width="100%" rating={riskIndex} />
                </div>
            </div>
        </div>
    </div>
}