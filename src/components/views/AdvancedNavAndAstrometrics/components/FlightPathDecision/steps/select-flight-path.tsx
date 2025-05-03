import React from "react";
import { BasicStepProps } from "./types";
import { Button } from "reactstrap";
import { RiskIndex } from "../../RatingBar/risk-index";
import { SpeedIndex } from "../../RatingBar/speed-index";
import { SelectableListView } from "../../SelectableListView";
import "./shared-styles.css"
import { useFlightContext } from "../../Contexts/OverallFlightContexts";
import { useMemo } from "react";
import PlusIcon from './plus.png'
import { generateBorderCoords, generateRiskIndex, generateSpeedIndex } from "../../../helpers";
import { ADD_NEW_ID } from "..";
import { NamedNavigationRoute, PointOfInterest } from "containers/FlightDirector/FlightSets/types";
import { generateBorderIdMap } from "../../helpers";

export type SelectPathProps = {
    navigationPathOptions: NamedNavigationRoute[];
    onBack: () => void;
} & BasicStepProps


export const SelectPath: React.FC<SelectPathProps> = (props) => {
    const { pointsOfInterest, currentLocation, borders, flightSet } = useFlightContext();
    const locationMap = useMemo(() => {
        return pointsOfInterest.reduce((acc, each) => {
            acc[each.id] = each;
            return acc;
        }, {} as { [key: string]: PointOfInterest });
    }, [pointsOfInterest]);

    const borderIdMap = useMemo(() => {
        return generateBorderIdMap(borders);
    }, [borders])

    const generateEndingCoords = (flightPath: NamedNavigationRoute) => {
        if (!flightPath.isBorder) {
            return locationMap[flightPath.targetLocationId].location as { x: number, y: number }
        }
        else {
            let previousLocation: { x: number, y: number };
            if (flightPath.secondaryRouteOptions.length === 0) {
                previousLocation = currentLocation;
            }
            else {
                previousLocation = locationMap[flightPath.secondaryRouteOptions[flightPath.secondaryRouteOptions.length - 1].targetLocationId].location;
            }
            return generateBorderCoords(previousLocation, borderIdMap[flightPath.targetLocationId], flightSet.imageMaxX, flightSet.imageMaxY)

        }
    }

    const selectableOptions = useMemo<NamedNavigationRoute[]>(() => {
        const newPathOption: any = { id: ADD_NEW_ID, name: "Create new flight path" };
        return [newPathOption, ...props.navigationPathOptions]
    }, [props.navigationPathOptions]);
    return (
        <div className="step-parent">
            <div className="step-sub-parent">
                <h1>Select flight path</h1>
                <div className="button-parent">
                    <Button onClick={() => {
                        props.onBack();
                    }}>Back</Button>
                    <Button disabled={!props.selectedOption} color="primary" onClick={() => {
                        props.selectedOption && props.continueToNextStep();
                    }}>{props.selectedOption !== ADD_NEW_ID ? "Next" : "Continue"}</Button>
                </div>
            </div>
            <SelectableListView
                selectedOption={props.selectedOption}
                options={selectableOptions.map((each: NamedNavigationRoute) => {
                    if (each.id === ADD_NEW_ID) {
                        return {
                            id: each.id,
                            title: each.name,
                            description: "",
                            imageUrl: PlusIcon
                        }
                    }
                    else {
                        return {
                            id: each.id,
                            title: each.name,
                            description: <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                                <SpeedIndex width="10rem" rating={generateSpeedIndex(currentLocation, generateEndingCoords(each), each.secondaryRouteOptions?.map((each) => locationMap[each.targetLocationId]) || [], each.speedOption)} />
                                <RiskIndex width="10rem" rating={generateRiskIndex(each.isBorder ? borderIdMap[each.targetLocationId] : locationMap[each.targetLocationId], each.secondaryRouteOptions?.map((each) => locationMap[each.targetLocationId]) || [])} />
                            </div>,
                            imageUrl: each.isBorder ? borderIdMap[each.targetLocationId].iconUrl : locationMap[each.targetLocationId].iconUrl
                        }
                    }
                })}
                onOptionSelected={(option) => {
                    props.updateSelectedOption(option);
                }}
            />
        </div>
    )
}