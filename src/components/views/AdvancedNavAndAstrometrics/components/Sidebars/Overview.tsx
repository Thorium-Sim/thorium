import React, { useEffect, useMemo, useState } from 'react'
import { Button } from 'reactstrap';
import { determinePOIFromId, useFlightContext } from '../Contexts/OverallFlightContexts';
import { NavigationRoute } from 'containers/FlightDirector/FlightSets/types';
import { EngineStatus } from '../../types';
import { formatSecondsToTime } from 'containers/FlightDirector/FlightSets/Time';
import { StatusBar } from '../StatusBar';

export type OverviewSidebarProps = {
    onEngageFlightPath: () => void;
    onAddFlightPath: () => void;
    onEmergencyStop: () => void;
    onResumeFlightPath: () => void;
    onCoolantFlush: () => void;
    coolantLevel: number;
    heatLevel: number;
    currentFlightPath?: NavigationRoute
    engineStatus?: EngineStatus;
    startupRemaining?: number;
    totalStartupTime?: number
    flightData?: string
    eta?: number
}

export const OverviewSidebar: React.FC<OverviewSidebarProps> = (props) => {
    const { pointsOfInterest, borders } = useFlightContext();
    const [engine1Level, setEngine1Level] = useState(0);
    const [engine2Level, setEngine2Level] = useState(0);
    const pointOfInterestTarget = useMemo(() => {
        if (props.currentFlightPath?.targetLocationId) {
            if (props.currentFlightPath?.isBorder) {
                return borders.find(border => border.id === props.currentFlightPath?.targetLocationId)
            }
            else {
                const poi = determinePOIFromId(props.currentFlightPath.targetLocationId, pointsOfInterest);
                return poi
            }

        }
    }, [pointsOfInterest, props])

    const statusText = useMemo(() => {

        if (props.engineStatus === EngineStatus.ENGAGED) {
            return <div>
                <span>{`Estimated Time of Arrival: ${props.eta ? formatSecondsToTime(props.eta) : "Calculating"}`}</span>
            </div>
        }
        else if (props.engineStatus === EngineStatus.FLUX) {
            return <div>
                <span>{`Warning: Engine flux detected`}</span>
            </div>
        }
        else if (props.engineStatus === EngineStatus.FULL_POWER) {
            return <div>
                <span>{`Estimated Time of Arrival: ${props.eta ? formatSecondsToTime(props.eta) : "Calculating"}`}</span>
            </div>

        }
        else if (props.engineStatus === EngineStatus.STARTUP) {
            return <span>{`Activation time: ${props.startupRemaining ? formatSecondsToTime(props.startupRemaining) : "Calculating"}`}</span>

        }
        else {
            return undefined
        }
    }, [props]);

    // flux the engine level based on engine status
    useEffect(() => {
        if (props.engineStatus === EngineStatus.FLUX) {
            const interval = setInterval(() => {
                setEngine1Level(Math.floor(Math.random() * 100));
                setEngine2Level(Math.floor(Math.random() * 100));
            }, 500)
            return () => clearInterval(interval);
        }
        else if (props.engineStatus === EngineStatus.ENGAGED) {
            const interval = setInterval(() => {
                setEngine1Level(80 + Math.floor(Math.random() * 20));
                setEngine2Level(80 + Math.floor(Math.random() * 20));
            }, 500)
            return () => clearInterval(interval);
        }
        else if (props.engineStatus === EngineStatus.FULL_POWER) {
            const interval = setInterval(() => {
                setEngine1Level(95 + Math.floor(Math.random() * 5));
                setEngine2Level(95 + Math.floor(Math.random() * 5));
            }, 500)
            return () => clearInterval(interval);
        }
        else if (props.engineStatus === EngineStatus.STARTUP) {
            if (!props.startupRemaining || !props.totalStartupTime) {
                return;
            }
            setEngine1Level(100 - Math.floor((props.startupRemaining / props.totalStartupTime) * 100));
            setEngine2Level(100 - Math.floor((props.startupRemaining / props.totalStartupTime) * 100));
        }
        else {
            setEngine1Level(0);
            setEngine2Level(0);
        }
    }, [props.engineStatus, props.startupRemaining, props.totalStartupTime])


    return <div className='sidebar-parent'>
        <div className='group-parent'>
            {/* <label className='label'>Available actions</label> */}
            <div style={{ padding: '10px', width: '100%' }}>
                <Button style={{ width: '100%' }} onClick={props.onEngageFlightPath}>{props.currentFlightPath ? "Change flight path" : 'Engage flight path'}</Button>
                <Button style={{ width: '100%' }} onClick={props.onAddFlightPath}>{"Add flight path"}</Button>
                {props.engineStatus !== EngineStatus.STOPPED && props.currentFlightPath && <Button style={{ width: '100%' }} onClick={props.onEmergencyStop}>Emergency Stop</Button>}
                {props.engineStatus === EngineStatus.STOPPED && props.currentFlightPath !== undefined && <Button style={{ width: '100%' }} onClick={props.onResumeFlightPath}>Resume flight path</Button>}

            </div>

        </div>
        <div className='group-parent'>
            <label className='label'>Current destination</label>
            <div className='grouping'>
                <div>
                    <span>{`${props.currentFlightPath ? pointOfInterestTarget?.name : "None"}`}</span>
                </div>
            </div>
        </div>

        <div className='group-parent'>
            <label className='label'>Additional Information</label>

            <div className='grouping'>
                <div>
                    <span>{statusText ? statusText : "None"}</span>
                </div>
            </div>
        </div>
        <div className='group-parent' style={{ flexGrow: 1 }}>
            <label className='label'>Engineering</label>

            <div style={{ gap: "1rem", flexGrow: 1, padding: '15px' }} className='grouping'>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flexGrow: 1, }}>
                    <span style={{ textAlign: 'left' }}>Engine Cores</span>
                    <div style={{ display: 'flex', gap: "1rem", width: '100%', flexDirection: 'column' }}>
                        <StatusBar percent={engine1Level} horizontal color={props.engineStatus === EngineStatus.FULL_POWER ? 'orange' : 'yellow'} size={25} />
                        <StatusBar percent={engine2Level} horizontal color={props.engineStatus === EngineStatus.FULL_POWER ? 'orange' : 'yellow'} size={25} />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: "0.5rem", flexGrow: 1 }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ textAlign: 'left' }}>Engine Heat</span>
                        <StatusBar size={25} horizontal percent={props.heatLevel} color='red' />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ textAlign: 'left' }}>Coolant Level</span>
                        <StatusBar size={25} horizontal percent={props.coolantLevel} color='blue' />
                    </div>
                    <Button style={{ marginTop: '0.25rem' }} size='sm' onClick={props.onCoolantFlush}>Flush coolant</Button>

                </div>
            </div>
        </div>

    </div >
}
