import React from "react";
import { BasicStepProps } from "./types";
import { Button } from "reactstrap";
import { RiskIndex } from "../../RatingBar/risk-index";
import { SelectableListView } from "../../SelectableListView";
import "./shared-styles.css"
import { NavigationStartOptions } from "containers/FlightDirector/FlightSets/types";
export type SelectStartTypeProps = {
    navigationStartOptions: NavigationStartOptions[];
    onBack: () => void;
} & BasicStepProps

export const SelectStartType: React.FC<SelectStartTypeProps> = (props) => {
    const uniqueByName = React.useMemo(() => {
        const map: Record<string, NavigationStartOptions> = {};
        props.navigationStartOptions.forEach(o => { if (!map[o.name]) map[o.name] = o; });
        return Object.values(map);
    }, [props.navigationStartOptions]);
    return (
        <div className="step-parent" >
            <div className="step-sub-parent">
                <h1>Select Start</h1>
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
                options={uniqueByName.map((each) => {
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