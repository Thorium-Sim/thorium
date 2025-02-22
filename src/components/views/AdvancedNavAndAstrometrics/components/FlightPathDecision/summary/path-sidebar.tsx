import React from 'react';
import { RiskIndex } from '../../RatingBar/risk-index';
import { SpeedIndex } from '../../RatingBar/speed-index';
import { generateBorderCoords, generateFullRiskIndex, generateSpeedIndex, isMapBorder } from '../../../helpers';
import "./path-sidebar.css"
import { HexButton } from '../../HexButton';
import { FlightSet, MapBorder, NavigationRoute, PointOfInterest } from 'containers/FlightDirector/FlightSets/types';
export type PathSummarySidebarProps = {
    flightSet: FlightSet
    flightPath: NavigationRoute
    possibleLocations: (PointOfInterest | MapBorder)[]
    currentLocation: { x: number, y: number }
}

export const PathSummarySidebar: React.FC<PathSummarySidebarProps> = (props) => {
    const locationIdMap = React.useMemo(() => {
        const locationMap: Record<string, PointOfInterest | MapBorder> = {};
        props.possibleLocations.forEach((each) => {
            locationMap[each.id] = each
        });
        return locationMap;
    }, [props.possibleLocations])

    const locationCoords = React.useMemo(() => {
        if (!isMapBorder(locationIdMap[props.flightPath.targetLocationId])) {
            return locationIdMap[props.flightPath.targetLocationId].location as { x: number, y: number }
        }
        else {
            return generateBorderCoords(props.currentLocation, locationIdMap[props.flightPath.targetLocationId] as MapBorder, props.flightSet.imageMaxX, props.flightSet.imageMaxY)
        }
    }, [props.flightPath.targetLocationId, locationIdMap])

    return (
        <div className='path-sidebar open'>
            <div className='path-sidebar-title'>
                <span>Flight Path Summary to {locationIdMap[props.flightPath.targetLocationId].name}</span>
            </div>
            <div className='path-sidebar-divider' />
            {props.flightPath.secondaryRouteOptions.length > 0 && <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', margin: '1rem' }}>
                <span style={{ alignSelf: 'start' }}>Through</span>
                {props.flightPath.secondaryRouteOptions.map((each) => {
                    return <span key={each.targetLocationId} style={{ alignSelf: 'end' }}>{locationIdMap[each.targetLocationId].name}</span>
                })}

            </div>}
            {props.flightPath.secondaryRouteOptions.length > 0 && <div className='path-sidebar-divider' />}
            <div className='path-sidebar-all-options'>
                <div className='path-sidebar-option-parent'>
                    <span className='path-sidebar-data'>Launch option</span>
                    <div className='path-sidebar-option'>
                        <HexButton size='small'>{props.flightPath.startOption?.name && <img style={{ height: '30px' }} draggable={false} src={props.flightPath.startOption.imgUrl} />} </HexButton>
                        <span>{props.flightPath.startOption?.name ? props.flightPath.startOption.name : "Not selected"}</span>
                    </div>
                </div>
                <div className='path-sidebar-option-parent'>
                    <span className='path-sidebar-data'>Speed option</span>
                    <div className='path-sidebar-option'>
                        <HexButton size='small'>{props.flightPath.speedOption?.name && <img style={{ height: '30px', }} draggable={false} src={props.flightPath.speedOption.imgUrl} />} </HexButton>
                        <span>{props.flightPath.speedOption?.name ? props.flightPath.speedOption.name : "Not selected"}</span>
                    </div>
                </div>
                <div className='path-sidebar-option-parent' style={{ marginBottom: '1rem' }}>
                    <span className='path-sidebar-data'>Exit option</span>
                    <div className='path-sidebar-option'>
                        <HexButton size='small'>{props.flightPath.exitOption?.name && <img style={{ height: '30px', }} draggable={false} src={props.flightPath.exitOption.imgUrl} />} </HexButton>
                        <span>{props.flightPath.exitOption?.name ? props.flightPath.exitOption.name : "Not selected"}</span>
                    </div>
                </div>
            </div>

            <div className='path-sidebar-divider' />
            <div className='path-sidebar-ratings-parent'>
                <SpeedIndex
                    disabled={props.flightPath.speedOption?.name === undefined}
                    width='100%'
                    rating={
                        generateSpeedIndex(
                            props.currentLocation,
                            locationCoords,
                            props.flightPath.secondaryRouteOptions.map((each) => locationIdMap[each.targetLocationId]) as PointOfInterest[], props.flightPath.speedOption
                        )
                    }
                />
                <RiskIndex
                    width='100%'
                    disabled={props.flightPath.startOption?.name === undefined}
                    rating={
                        generateFullRiskIndex(
                            locationIdMap[props.flightPath.targetLocationId],
                            props.flightPath.startOption,
                            props.flightPath.speedOption,
                            props.flightPath.exitOption,
                            props.flightPath.secondaryRouteOptions.map((each) => locationIdMap[each.targetLocationId]) as PointOfInterest[]
                        )
                    }
                />
            </div>

        </div>
    )
}