import React from "react";

import { Button } from "reactstrap";
import { SelectableListView } from "../SelectableListView";
import { RiskIndex } from "../RatingBar/risk-index";
import { PointOfInterest, Probe } from "containers/FlightDirector/FlightSets/types";

export type ProbeAssignmentFormProps = {
    currentProbeLocation: { x: number, y: number };
    probe: Probe;
    availablePointsOfInterest: PointOfInterest[];
    onAssignment: (selectedPOI: PointOfInterest) => void;
    onCancel: () => void;
    currentFuelCellCount: number;
}

export const ProbeAssignmentForm: React.FC<ProbeAssignmentFormProps> = (props: ProbeAssignmentFormProps) => {

    const [selectedPOI, setSelectedPOI] = React.useState<PointOfInterest | undefined>(undefined);

    const handleAssignClick = () => {
        if (!selectedPOI) {
            return;
        }
        props.onAssignment(selectedPOI);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <div style={{ display: 'flex', marginBottom: "0.5rem", justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Assign {props.probe.name}</h1>
                <div className="button-parent">
                    <Button onClick={() => {
                        props.onCancel();
                    }}>Back</Button>
                    <Button disabled={!selectedPOI} color="primary" onClick={() => {
                        handleAssignClick();
                    }}>Assign</Button>
                </div>
            </div>
            {props.currentFuelCellCount === 0 && <div style={{ color: 'red' }}>No fuel cells remaining, please select a different probe</div>}
            {props.availablePointsOfInterest.length === 0 && <div>No points of interest in range, launch a new probe with extra fuel cells, or select a different probe</div>}
            {props.currentFuelCellCount > 0 && props.availablePointsOfInterest.length &&
                <SelectableListView
                    selectedOption={selectedPOI?.id}
                    options={props.availablePointsOfInterest.map((each) => {
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
                        setSelectedPOI(props.availablePointsOfInterest.find(each => each.id === option));
                    }}
                />
            }
        </div>
    )
}