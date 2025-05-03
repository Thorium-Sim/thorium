import React from "react";
import { HexButton } from "../../HexButton";
import { Button } from "reactstrap";
import styles from './styles.module.css'
import { TooltipHexButton } from "../../TooltipHexButton";
import { RiskIndex } from "../../RatingBar/risk-index";
import { SpeedIndex } from "../../RatingBar/speed-index";
import { MapBorder, NavigationRoute, PointOfInterest } from "containers/FlightDirector/FlightSets/types";
import Chev1 from './chev-1.svg'

export type HexFlightPathingProps = {
    flightPath: NavigationRoute
    possibleLocations: (PointOfInterest | MapBorder)[];
    currentLocation: { x: number, y: number }
    currentLocationName?: string;
    currentLocationImgUrl: string;
    handleEditTarget: () => void;
    handleUpdateFlightPath: (flightPath: NavigationRoute) => void;
    handleEditSecondaryTarget: (index: number) => void;
    handleAddLocation: (index: number) => void;
}


export const HexFlightPathing: React.FC<HexFlightPathingProps> = (props) => {
    const locationIdMap = React.useMemo(() => {
        let locationMap: Record<string, PointOfInterest | MapBorder> = {};
        props.possibleLocations.forEach((each) => {
            locationMap[each.id] = each
        });
        return locationMap;
    }, [props.possibleLocations])

    const deleteSecondaryLocation = (index: number) => {
        let flightPath = { ...props.flightPath };
        let secondaryLocations = flightPath.secondaryRouteOptions;
        secondaryLocations.splice(index, 1);
        props.handleUpdateFlightPath(flightPath);
    }

    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    const targetLocation = React.useMemo(() => {
        return locationIdMap[props.flightPath.targetLocationId]
    }, [props.flightPath.targetLocationId]);



    return <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%', margin: '0px 30px' }}>
        <div style={{ height: '75%', position: 'absolute' }} className={`${styles['speed-chev']}`}>
            <img draggable={"false"} style={{ height: '100%' }} src={Chev1} />
        </div>

        <div style={{ zIndex: 2 }}>
            <HexButton>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img draggable={"false"} style={{ objectFit: 'scale-down', width: "75%", fontSize: 'smaller' }} src={props.currentLocationImgUrl} alt={props.currentLocationName || "Empty Space"} />
                    <div>{props.currentLocationName || "Empty Space"}</div>
                </div>
            </HexButton>
        </div>

        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'space-around' }}>
            {props.flightPath.secondaryRouteOptions.map((each, index) => {
                return <TooltipHexButton
                    size="small"
                    tooltipHeader={"Path Stop"}
                    tooltipBody={<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div>{locationIdMap[each.targetLocationId].name}</div>
                        <RiskIndex width="10rem" rating={locationIdMap[each.targetLocationId].riskIndex} />
                        <SpeedIndex width="10rem" rating={(locationIdMap[each.targetLocationId] as PointOfInterest).speedIndex} />
                        <div><Button onClick={() => deleteSecondaryLocation(index)} style={{ width: '100%' }}>Delete</Button></div>
                    </div>}
                    id={"CoolTarget" + index}
                    key={locationIdMap[each.targetLocationId].name}>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <img draggable={"false"} style={{ objectFit: 'scale-down', width: "75%", fontSize: 'smaller' }} src={locationIdMap[each.targetLocationId].iconUrl} alt={"Target Location Icon"} />
                    </div>

                </TooltipHexButton>

            })}

        </div>
        <div style={{ zIndex: 2 }}>
            <HexButton
                id="TargetLocationId"
                onClick={props.handleEditTarget}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img draggable={"false"} style={{ objectFit: 'scale-down', width: "75%", fontSize: 'smaller' }} src={targetLocation.iconUrl} alt={"Target Location Icon"} />
                    <div style={{ textAlign: 'center' }}>{targetLocation.name}</div>
                </div>
            </HexButton>
        </div>
    </div>
}