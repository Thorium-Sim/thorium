
import React from "react";
import { BasicStepProps } from "./types";
import { Button } from "reactstrap";
import { RiskIndex } from "../../RatingBar/risk-index";
import { SelectableListView } from "../../SelectableListView";
import "./shared-styles.css";
import { MapBorder, PointOfInterest } from "containers/FlightDirector/FlightSets/types";

export type SelectDestinationTypeProps = {
    destinationOptions: (PointOfInterest | MapBorder)[];
    onCancel: () => void;
} & BasicStepProps


export const SelectDestination: React.FC<SelectDestinationTypeProps> = (props) => {
    return (
        <div className="step-parent">
            <div className="step-sub-parent">
                <h1>Select Destination</h1>
                <div className="button-parent">
                    <Button onClick={() => {
                        props.onCancel();
                    }}>Back</Button>
                    <Button disabled={!props.selectedOption} color="primary" onClick={() => {
                        props.selectedOption && props.continueToNextStep();
                    }}>{props.canJumpToSummary ? "Go to Summary" : "Continue"}</Button>
                </div>
            </div>
            <SelectableListView
                selectedOption={props.selectedOption}
                options={props.destinationOptions.map((each) => {
                    return {
                        id: each.id,
                        title: each.name,
                        description: <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <RiskIndex width="10rem" rating={each.riskIndex} />
                        </div>,
                        imageUrl: each.iconUrl
                    }
                })}
                onOptionSelected={(option) => {
                    props.updateSelectedOption(option);
                }}
            />
        </div>
    )
}
