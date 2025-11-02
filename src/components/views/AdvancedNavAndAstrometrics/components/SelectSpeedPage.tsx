import React from "react";
import { Button } from "reactstrap";
import { NavigationSpeedOptions } from "containers/FlightDirector/FlightSets/types";
import { SelectableListView } from "./SelectableListView";
import { RiskIndex } from "./RatingBar/risk-index";
import { SpeedIndex } from "./RatingBar/speed-index";

type SelectSpeedPageProps = {
    navigationSpeedOptions: NavigationSpeedOptions[];
    selectedOption?: string;
    onSelect: (name: string) => void;
    onSubmit: () => void;
    onBack: () => void;
};

export const SelectSpeedPage: React.FC<SelectSpeedPageProps> = ({ navigationSpeedOptions, selectedOption, onSelect, onSubmit, onBack }) => {
    return (
        <div className="step-parent">
            <div className="step-sub-parent">
                <h1>Select Speed</h1>
                <div className="button-parent">
                    <Button onClick={onBack}>Back</Button>
                    <Button color="primary" disabled={!selectedOption} onClick={onSubmit}>Submit</Button>
                </div>
            </div>
            <SelectableListView
                selectedOption={selectedOption}
                options={navigationSpeedOptions.map(each => ({
                    id: each.name,
                    title: each.name,
                    description: (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <SpeedIndex width="10rem" rating={each.speedModifier} />
                            <RiskIndex width="10rem" rating={each.riskModifier} />
                        </div>
                    ),
                    imageUrl: each.imgUrl,
                }))}
                onOptionSelected={onSelect}
            />
        </div>
    );
};


