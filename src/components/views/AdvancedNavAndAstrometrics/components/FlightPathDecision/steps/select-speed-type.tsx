import React from "react";
import { BasicStepProps } from "./types";
import { Button } from "reactstrap";
import { RiskIndex } from "../../RatingBar/risk-index";
import { SpeedIndex } from "../../RatingBar/speed-index";
import { SelectableListView } from "../../SelectableListView";
import "./shared-styles.css"
import { NavigationSpeedOptions } from "containers/FlightDirector/FlightSets/types";
export type SelectSpeedTypeProps = {
    navigationSpeedOptions: NavigationSpeedOptions[];
    onBack: () => void;
} & BasicStepProps


export const SelectSpeedType: React.FC<SelectSpeedTypeProps> = (props) => {
    return (
        <div className="step-parent">
            <div className="step-sub-parent">
                <h1>Select Speed</h1>
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
                options={props.navigationSpeedOptions.map((each) => {
                    return {
                        id: each.name,
                        title: each.name,
                        description: <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <SpeedIndex width="10rem" rating={each.speedModifier} />
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