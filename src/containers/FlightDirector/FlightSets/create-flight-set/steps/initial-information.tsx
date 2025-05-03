import React from "react";
import { CreateFlightSetStepProps } from "./types";
import './shared-styles.css'
import { Button, Input, Label } from "reactstrap";
import { PositionMap, RangeShowingMap } from "../../Map";
import { FlightSet } from "../../types";
import FilePickerHelper from "../file-picker-helper";

export const FlightSetCreationInitialInformation: React.FC<CreateFlightSetStepProps<FlightSet>> = ({ onBack, onNext, canNext, nextLabel, backLabel, state, setState }) => {
    return (
        <div className="step-parent" style={{ height: '75%' }}>
            <div className={"step-title"}>
                <span>Initial Information</span>
                <div className="step-actions">
                    <Button onClick={onBack}>{backLabel}</Button>
                    <Button onClick={onNext} disabled={!canNext}>{nextLabel}</Button>
                </div>
            </div>
            <div className="step-content" style={{ flexGrow: 1 }}>
                <div className="step-content-row" style={{ height: '100%', gap: "1rem" }}>
                    <div className="step-content-column" style={{ flexGrow: 1, width: '45%' }}>
                        <div className="step-input-label">
                            <Label htmlFor="flight-set-name">Flight Set Name</Label>
                            <Input type="text" id="flight-set-name" value={state.name} onChange={(event) => setState({ ...state, name: event.target.value })} />
                        </div>
                        <div className="step-input-label">
                            <Label htmlFor="flight-set-label">Flight Set Label</Label>
                            <Input type="text" id="flight-set-label" value={state.label} onChange={(event) => setState({ ...state, label: event.target.value })} />
                        </div>
                        <div className="step-input-label" style={{ marginLeft: '2.5rem' }}>
                            <Label htmlFor="add-on-training">Add on Training</Label>
                            <Input type="checkbox" id="add-on-training" checked={state.addOnTraining} onChange={(event) => setState({ ...state, addOnTraining: event.target.checked })} />
                        </div>
                        <div style={{ height: '400px' }} className="step-input-label">
                            <label htmlFor="background-image">Background Image</label>
                            <FilePickerHelper selectedImage={state.backgroundImg} updateImage={(url) => setState({ ...state, backgroundImg: url })} />
                        </div>
                    </div>
                    <div className="step-content-column" style={{ flexGrow: 1, width: '45%' }}>
                        <div className="step-input-label" style={{ flexGrow: 1, textAlign: 'center' }}>
                            <label htmlFor="defaultStartLocation">Default Start Location (click map to set)</label>
                            {state.backgroundImg ?
                                <PositionMap
                                    imageUrl={state.backgroundImg}
                                    primaryLocation={state.defaultStartingLocation}
                                    onMapClick={(coord) => setState({ ...state, defaultStartingLocation: coord })} />
                                : <span>Please select a background image first</span>}
                        </div>
                        <div className="step-input-label" style={{ flexGrow: 1, textAlign: 'center' }}>

                            <label htmlFor="default-probe-range">Default Probe Range</label>
                            <div>
                                <input type="number" id="default-probe-range" value={state.probeLaunchRangeRadius} onChange={(event) => {
                                    if (Number(event.target.value) < 0) {
                                        alert("Probe range cannot be negative");
                                    }
                                    else if (isNaN(Number(event.target.value))) {
                                        alert("Probe range must be a number");
                                    }
                                    else {
                                        setState({ ...state, probeLaunchRangeRadius: Number(event.target.value) });
                                    }
                                }} />
                            </div>
                            {state.backgroundImg &&
                                <RangeShowingMap
                                    imageUrl={state.backgroundImg}
                                    coordinate={state.defaultStartingLocation}
                                    radius={state.probeLaunchRangeRadius}
                                />
                            }

                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}