import React from "react";
import { CreateFlightSetStepProps } from "./types";
import './shared-styles.css'
import { Button } from "reactstrap";
import { PositionMap } from "../../Map";
import { calculatePixelDistanceModifier, calculatePixelsPerSecond, calculateTotalTime, getDistanceBetweenCoordinates } from "../../Map/helpers";
import { formatSecondsToTime } from "../../Time";
import { FlightSet, BasicCoordinate } from "../../types";

export const FlightSetCreationDefaultSpeed: React.FC<CreateFlightSetStepProps<FlightSet>> = ({ onBack, onNext, canNext, nextLabel, backLabel, state, setState }) => {
    const [primaryLocation, setPrimaryLocation] = React.useState<BasicCoordinate | undefined>(state.defaultStartingLocation);
    const [secondaryLocation, setSecondaryLocation] = React.useState<BasicCoordinate>();

    const handleChangeClick = () => {
        if (primaryLocation && secondaryLocation) {
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
            const newPixelsPerSecond = calculatePixelsPerSecond({ ...primaryLocation }, { ...secondaryLocation }, eta);
            setState({ ...state, pixelsPerSecond: newPixelsPerSecond });
        }

    }


    const handleDistanceChange = () => {
        if (primaryLocation && secondaryLocation) {
            let newDistance = prompt("Please enter the distance in light years");
            if (newDistance === null || newDistance === undefined || newDistance === "") {
                return;
            }
            if (isNaN(Number(newDistance)) || Number(newDistance) <= 0) {
                alert("Please enter a valid number");
                return;
            }
            let distanceModifier = calculatePixelDistanceModifier(primaryLocation, secondaryLocation, Number(newDistance));
            setState({ ...state, pixelDistanceModifier: distanceModifier });
        }
    }

    const calculateStarSpeeds = () => {
        if (primaryLocation && secondaryLocation) {
            const path = [{ ...primaryLocation, speed: 1, color: 'white' }, { ...secondaryLocation, speed: 1, color: 'white' }];
            let totalTime = calculateTotalTime(path, state.pixelsPerSecond);
            let distance = getDistanceBetweenCoordinates(primaryLocation, secondaryLocation) * (state.pixelDistanceModifier || 1);
            let speed = distance / totalTime;
            if (speed < 0.02) {
                return "very slow stars"
            }
            else if (speed > 0.02 && speed < 0.08) {
                return "slow stars"
            }
            else if (speed > 0.08 && speed < 0.15) {
                return "average stars"
            }
            else if (speed > 0.15 && speed < 0.4) {
                return "above average stars"
            }
            else if (speed > 0.5 && speed < 0.8) {
                return "fast stars"
            }
            else {
                return "too fast stars. We recommend that you decrease the distance to make the stars more manageable"
            }
        }
    }


    return (
        <div className="step-parent" style={{ height: '100%' }}>
            <div className={"step-title"}>
                <span>Default Speed Selection</span>
                <div className="step-actions">
                    <Button onClick={onBack}>{backLabel}</Button>
                    <Button onClick={onNext} disabled={!canNext}>{nextLabel}</Button>
                </div>
            </div>
            <div className="step-content" style={{ height: '100%', justifyContent: 'start' }}>
                <div style={{ display: 'flex', gap: '8px', height: '100%' }}>
                    <div style={{ width: '50%' }}>
                        <PositionMap
                            imageUrl={state.backgroundImg}
                            primaryLocation={primaryLocation}
                            secondaryLocation={secondaryLocation}
                            onMapClick={(coord) => {
                                if (primaryLocation) {
                                    setSecondaryLocation(coord);
                                } else {
                                    setPrimaryLocation(coord);
                                }
                            }} />
                    </div>

                    <div className="step-content-row" style={{ gap: '8px', alignItems: 'center' }}>
                        <div className="step-content-column" style={{}}>
                            <div className="step-content-row" style={{ gap: '10px', alignItems: 'center' }}>
                                <span>Primary Location:</span>
                                <span>{primaryLocation ? `(${primaryLocation.x.toFixed(0)}, ${primaryLocation.y.toFixed(0)})` : 'Select a location on the map'}</span>
                                {primaryLocation && <div> <Button onClick={() => setPrimaryLocation(undefined)}>Clear</Button></div>}
                            </div>
                            <div className="step-content-row" style={{ gap: '10px', alignItems: 'center' }}>

                                <span>Secondary Location:</span>
                                <span>{secondaryLocation ? `(${secondaryLocation.x.toFixed(0)}, ${secondaryLocation.y.toFixed(0)})` : 'Select a location on the map'}</span>
                                {secondaryLocation && <Button onClick={() => setSecondaryLocation(undefined)}>Clear</Button>}
                            </div>
                            <div className="step-content-row" style={{ gap: '10px', alignItems: 'center' }}>
                                <span>Time for completion: </span>
                                <span>{(primaryLocation && secondaryLocation) ? formatSecondsToTime(calculateTotalTime([{ ...primaryLocation, speed: 1, color: 'white' }, { ...secondaryLocation, speed: 1, color: 'white' },], state.pixelsPerSecond)) : "Please select a primary and secondary location"}</span>
                                {(primaryLocation && secondaryLocation) && <Button onClick={handleChangeClick}>Change</Button>}
                            </div>
                            <div className="step-content-row" style={{ gap: '10px', alignItems: 'center' }}>
                                <span>Distance: </span>
                                <span>{(primaryLocation && secondaryLocation) ? (getDistanceBetweenCoordinates(primaryLocation, secondaryLocation) * (state.pixelDistanceModifier || 1)).toFixed(2) + ' yl' : "Please select a primary and secondary location"}</span>
                                {(primaryLocation && secondaryLocation) && <Button onClick={handleDistanceChange}>Change</Button>}
                            </div>
                            {(primaryLocation && secondaryLocation) && <div className="step-content-row" style={{ gap: '10px', alignItems: 'center' }}>
                                <span>Star speed: </span>
                                <span>Based on the values you've entered, the base speed without speedups would create: {calculateStarSpeeds()}</span>
                            </div>}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}