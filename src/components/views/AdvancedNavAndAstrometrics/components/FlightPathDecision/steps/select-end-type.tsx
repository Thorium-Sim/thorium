import React from "react";
import { BasicStepProps } from "./types";
import { Button } from "reactstrap";
import { RiskIndex } from "../../RatingBar/risk-index";
import { SelectableListView } from "../../SelectableListView";
import "./shared-styles.css"
import { NavigationExitOptions } from "containers/FlightDirector/FlightSets/types";

export type SelectEndTypeProps = {
    navigationExitOptions: NavigationExitOptions[];
    onBack: () => void;
} & BasicStepProps


export const SelectEndType: React.FC<SelectEndTypeProps> = (props) => {
    return (
        <div className="step-parent">
            <div className="step-sub-parent">
                <h1>Select Exit</h1>
                <div className="button-parent">
                    <Button onClick={() => {
                        props.onBack();
                    }}>Back</Button>
                    <Button disabled={!props.selectedOption} color="primary" onClick={() => {
                        props.selectedOption && props.continueToNextStep();
                    }}>{props.canJumpToSummary ? "Go to Summary" : "Continue"}</Button>
                </div>

            </div>
            <SelectableListView
                selectedOption={props.selectedOption}
                options={props.navigationExitOptions.map((each) => {
                    return {
                        id: each.name,
                        title: each.name,
                        description: <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <RiskIndex width="10rem" rating={each.riskModifier} />
                        </div>,
                        imageUrl: each.imgUrl
                    }
                })}
                onOptionSelected={(option) => {
                    props.updateSelectedOption(option);
                }}
            />
        </div>
    )
}