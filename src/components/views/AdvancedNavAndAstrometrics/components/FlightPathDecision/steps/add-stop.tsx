import React from "react";
import { BasicStepProps } from "./types";
import { Button } from "reactstrap";
import { RiskIndex } from "../../RatingBar/risk-index";
import { SpeedIndex } from "../../RatingBar/speed-index";
import { SelectableListView } from "../../SelectableListView";
import './shared-styles.css'
import { PointOfInterest } from "containers/FlightDirector/FlightSets/types";

export type AddStopTypeProps = {
    destinationOptions: PointOfInterest[];
    onCancel: () => void;
} & BasicStepProps

export const AddStop: React.FC<AddStopTypeProps> = (props) => {

    return (
        <div className="step-parent">
            <div className="step-sub-parent">
                <h1>Add Path</h1>
                <div className="button-parent">
                    <Button onClick={() => props.onCancel()}>
                        Cancel
                    </Button>
                    <Button disabled={!props.selectedOption} color="primary" onClick={() => {
                        props.selectedOption && props.continueToNextStep();

                    }}>Continue</Button>
                </div>
            </div>
            <SelectableListView
                selectedOption={props.selectedOption}
                options={props.destinationOptions.map((each) => {
                    return {
                        id: each.id,
                        title: each.name,
                        description: <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <SpeedIndex width="10rem" rating={each.speedIndex} />
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

